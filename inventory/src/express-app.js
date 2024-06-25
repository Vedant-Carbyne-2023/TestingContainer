const express = require('express');
const cors = require('cors');
const path = require('path');
const amqp = require('amqplib/callback_api');
const http = require('http');
const WebSocket = require('ws');
const InventoryController = require('./database/repository/workorder-functions');
const { MESSENGER_URL } = require('./config');

module.exports = async (app) => {
    const RABBITMQ_URL = MESSENGER_URL;
    
    const WS_PORT = 3004;

    app.use(express.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname, '/public')));

    // Create an HTTP server using the Express app
    const server = http.createServer(app);

    // Create WebSocket server and attach it to the HTTP server
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async (ws) => {
        console.log('WebSocket client connected');
        
        // Fetch and broadcast the initial inventory data upon client connection
        try {
            let service = new InventoryController();
            let result = await service.getInventory();
            ws.send(JSON.stringify(result));
        } catch (error) {
            console.error("Failed to fetch and send initial inventory data", error);
        }

        ws.on('close', () => console.log('WebSocket client disconnected'));
    });

    const broadcast = (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    amqp.connect(RABBITMQ_URL, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            const exchange = 'inventoryExchange';
            const inwardQueue = 'inwardQueue';
            const outwardQueue = 'outwardQueue';
            const inwardRoutingKey = 'inward';
            const outwardRoutingKey = 'outward';
            const requestQueue = 'inventoryRequestQueue';
            const responseQueue = 'inventoryResponseQueue';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.assertQueue(inwardQueue, {
                durable: false
            });

            channel.assertQueue(outwardQueue, {
                durable: false
            });

            channel.assertQueue(requestQueue, {
                durable: false
            });
            channel.assertQueue(responseQueue, {
                durable: false
            });

            channel.bindQueue(inwardQueue, exchange, inwardRoutingKey);
            channel.bindQueue(outwardQueue, exchange, outwardRoutingKey);

            console.log("Inventory Service: Waiting for messages in queues");
            let service = new InventoryController()
            channel.consume(inwardQueue, async function (msg) {
                let result = await service.addInventory(msg.content.toString())
                console.log("Inventory Service: Received inward %s", msg.content.toString());
                broadcast(JSON.stringify(result));
                // Add logic to update inventory for inward
            }, {
                noAck: true
            });

            channel.consume(outwardQueue,  async function(msg) {
                let result = await service.reduceInventoryQuantity(msg.content.toString())
                broadcast(JSON.stringify(result));
                console.log("Inventory Service: Received outward %s", msg.content.toString());
                // Add logic to update inventory for outward
            }, {
                noAck: true
            });


            channel.consume(requestQueue, async function (msg) {
                const request = JSON.parse(msg.content.toString());
                const { itemId, quantity, correlationId } = request;
                // console.log(itemId, quantity, correlationId )
                let response;
                try {
                    // Check inventory
                    const checkResult = await service.checkInventory(JSON.stringify({ itemId: itemId, quantity }));
                    const checkData = JSON.parse(checkResult);
    
                    if (checkData.code === 200) {
                        // If inventory is sufficient, reduce the quantity
                        const reduceResult = await service.reduceInventoryQuantity(JSON.stringify({ itemId: itemId, quantity }));
                        broadcast(JSON.stringify(reduceResult));
                        response = { success: true, data: reduceResult };
                    } else {
                        response = { success: false, message: checkData.message };
                    }
                } catch (error) {
                    console.log(error)
                    response = { success: false, message: "Error processing request" };
                }
    
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
                    correlationId: msg.properties.correlationId
                });
            }, {
                noAck: true
            });
        });
    });

    // Start the HTTP server
    server.listen(WS_PORT, () => {
        console.log(`Server started on port ${WS_PORT}`);
    });
};
