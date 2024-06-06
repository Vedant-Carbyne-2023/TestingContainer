const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  BASE_URL,
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
  QUEUE_NAME
} = require("../config");


//Message Broker

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};

module.exports.PublishMessage = (channel, bindingKey, msg) => {
  channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(msg));
  console.log("Sent: ", msg);
};
module.exports.SubscribeMessage = async(channel, service, bindingKey) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME)
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, bindingKey)
  channel.consume(appQueue,data =>{
    console.log("recieved Data")
      console.log(data.content.toString())
      channel.ack(data)
  })
  console.log("Sent: ", msg);
};
