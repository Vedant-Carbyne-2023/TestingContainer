const express = require('express');
const cors  = require('cors');
const path = require('path');
const { workOrder } = require('./api');
// const { CreateChannel } = require('./utils')
const amqp = require('amqplib/callback_api');
const { MESSENGER_URL } = require('./config');

module.exports = async (app) => {
    const RABBITMQ_URL = MESSENGER_URL;
    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))
 
    //api
    // appEvents(app);

    // const channel = await CreateChannel()

    // workOrder(app);

    amqp.connect(RABBITMQ_URL, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            const exchange = 'inventoryExchange';
        const routingKey = 'inward';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        app.post('/inward', (req, res) => {
            const message = JSON.stringify(req.body);
            channel.publish(exchange, routingKey, Buffer.from(message));
            res.json({code:200, message:'Inward recorded'});
        });
    
            console.log("Inward service listening on port");
            // app.listen(PORT);
        });
    });
    // error handling
    
}
