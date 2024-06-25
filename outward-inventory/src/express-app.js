const express = require('express');
const cors = require('cors');
const path = require('path');
const amqp = require('amqplib/callback_api');
const { v4: uuidv4 } = require('uuid');

const { MESSENGER_URL } = require('./config');

module.exports = async (app) => {
    const RABBITMQ_URL = MESSENGER_URL;
    const pendingRequests = new Map();

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    amqp.connect(RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            const requestQueue = 'inventoryRequestQueue';
            const responseQueue = 'inventoryResponseQueue';

            channel.assertQueue(requestQueue, {
                durable: false
            });

            channel.assertQueue(responseQueue, {
                durable: false
            });

            // Set up a single consumer for the response queue
            channel.consume(responseQueue, (msg) => {
                const correlationId = msg.properties.correlationId;
                const pendingRequest = pendingRequests.get(correlationId);

                if (pendingRequest) {
                    const response = JSON.parse(msg.content.toString());
                    console.log("Received response:", response);

                    if (response.success) {
                        pendingRequest.res.json({ message: 'Outward recorded' });
                    } else {
                        pendingRequest.res.status(400).json({ message: response.message });
                    }

                    pendingRequests.delete(correlationId);
                }
            }, {
                noAck: true
            });

            app.post('/outward', (req, res) => {
                const correlationId = uuidv4();
                const message = req.body;

                const requestMessage = {
                    ...message,
                    responseQueue,
                    correlationId
                };

                // Store the request so that we can respond when the reply arrives
                pendingRequests.set(correlationId, { req, res });

                channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(requestMessage)), {
                    correlationId,
                    replyTo: responseQueue
                });

                console.log("Sent message:", requestMessage);
            });

            console.log("Outward service listening on port");
            // app.listen(PORT);
        });
    });
};
