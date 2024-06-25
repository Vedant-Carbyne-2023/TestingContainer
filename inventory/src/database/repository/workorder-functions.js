const {  Logs, Inventory } = require('../models');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

async function handleAsync(fn, req, res, userId) {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.log(error);
    let message = `${req.name || ''} ${error} ${ getCurrentDate()}`;
    await Logs.create({ logs: message, userId });
    throw error;
  }
}

function getCurrentDate() {
  return new Date().toISOString();
}

class InventoryController {
  

  // Utility method to handle try-catch blocks with logging
  
  async addInventory(data) {
    // const token = req.headers.authorization;
    // const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    // return  handleAsync(async () => {
      let parsedData=JSON.parse(data)
      let totalItems = await Inventory.countDocuments()
      
      
      const workOrder = await Inventory.findOneAndUpdate(
        { itemId: parsedData.itemId }, // Query to find the document
        {
          $set: { name: parsedData.name }, // Update operation: Set the new name
          $inc: { quantity: parsedData.quantity } // Increment the quantity
        },
        { upsert: true, new: true } // Options: Upsert and return the new document
      );
      
      totalItems = await Inventory.find()

    //   console.log(workOrder)
  
    //   //   IMP: remember to replace req.body.value as no value field in this schema
      let message = `${"Vedant"} created/added to Inventory ${
        workOrder.itemId
      } on ${getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: 121,
      });
return totalItems;
    // }, req, res, decode.id);
  }

  async getInventory() {
    // const token = req.headers.authorization;
    // const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    // return  handleAsync(async () => {
  
     let totalItems = await Inventory.find()

    //   console.log(workOrder)
  
    //   //   IMP: remember to replace req.body.value as no value field in this schema
      let message = `${"Vedant"} fetched Inventory on ${getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: 121,
      });
return totalItems;
    // }, req, res, decode.id);
  }

  async reduceInventoryQuantity(data) {
    // const token = req.headers.authorization;
    // const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    let parsedData=JSON.parse(data)
    
    console.log(parsedData)
        const workOrder = await Inventory.findOne({ itemId:parsedData.itemId });

        if (!workOrder) {
          console.log("Item Not Found")
            return JSON.stringify({ code: 404, message: "Item not found" });
        }

        if (workOrder.quantity < parsedData.quantity) {
          console.log("Insufficient Quantity")
            return JSON.stringify({ code: 400, message: "Insufficient quantity" })
        }

        workOrder.quantity -= parsedData.quantity;
        await workOrder.save();

        let message = `${"Vedant"} reduced Inventory item ${parsedData.itemId } quantity by ${parsedData.quantity} on ${getCurrentDate()}`;
        await Logs.create({
            logs: message,
            userId: "vedat",
        });
        let totalItems = await Inventory.find()

        return totalItems
    // }, req, res, decode.id);
// }

  // Implement other controller methods similarly
}

async checkInventory(data) {
  let parsedData = JSON.parse(data);
console.log(parsedData)
  const workOrder = await Inventory.findOne({ itemId: parsedData.itemId });

  if (!workOrder) {
      console.log("Item Not Found");
      return JSON.stringify({ code: 404, message: "Item not found" });
  }

  if (workOrder.quantity < parsedData.quantity) {
      console.log("Insufficient Quantity");
      return JSON.stringify({ code: 400, message: "Insufficient quantity" });
  }

  return JSON.stringify({ code: 200, message: "Sufficient quantity available" });
}

}

module.exports = InventoryController;
