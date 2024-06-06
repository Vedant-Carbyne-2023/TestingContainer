const { WorkOrder, Logs, WorkOrderSaveSchema } = require('../models');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

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

class WorkOrderController {
  

  // Utility method to handle try-catch blocks with logging
  
  async getUserSavedWorkOrder(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const savedWorkOrders = await WorkOrderSaveSchema.find({ userId: decode.id });

      let message = `${decode.name} retrieved his saved WorkOrders on ${ getCurrentDate()}`;
      await Logs.create({ logs: message, userId: req.body.userId });

      return res.status(200).json({
        code: 200,
        message: "Saved WorkOrders retrieved",
        data: savedWorkOrders,
      });
    }, req, res, decode.id);
  }

  async getSavedWorkOrderById(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const workOrderId = req.body.workOrderId;
      const userId = req.body.userId;

      const workOrders = await WorkOrderSaveSchema.findOne({ workOrderId });

      let message = `${decode.name} wants a Saved WorkOrder with id: ${req.body.workOrderId} on ${ getCurrentDate()}`;
      await Logs.create({ logs: message, userId });

      return res.status(200).json({
        code: 200,
        message: "Saved WorkOrder Fetched",
        data: workOrders,
      });
    }, req, res, decode.id);
  }


  async getAllWorkOrder(req, res) {
    console.log("here");
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const userId = req.body.userId;
      const lowercaseFilter = req.body.filter ? req.body.filter.toLowerCase() : "";

      const filter = {};
      if (req.body.projectName) {
        filter.$and = [
          { projectId: req.body.projectName },
          {
            $or: [
              { workOrderId: { $regex: new RegExp(lowercaseFilter, 'i') } },
              { vendorName: { $regex: new RegExp(lowercaseFilter, 'i') } },
              // Add more fields as needed
            ]
          }
        ];
      } else {
        filter.$or = [
          { workOrderId: { $regex: new RegExp(lowercaseFilter, 'i') } },
          { vendorName: { $regex: new RegExp(lowercaseFilter, 'i') } },
          // Add more fields as needed
        ];
      }

      const totalWorkOrders = await WorkOrder.countDocuments(filter);
      const page = req.body.pageOccupied;
      const limit = req.body.pageLimit;
      const skip = (page - 1) * limit;

      const workOrders = await WorkOrder.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ workOrderDate: -1 });

      let message = `${decode.name} wants all WorkOrders on ${ getCurrentDate()}`;
      await Logs.create({ logs: message, userId: req.body.userId });

      return res.status(200).json({
        code: 200,
        message: "WorkOrder Fetched",
        data: workOrders,
        totalWorkOrders: Math.ceil(totalWorkOrders / limit)
      });
    }, req, res, decode.id);
  }

  
  async getWorkOrderById(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const workOrderId = req.body.workOrderId;
      const amend = req.body.amend;
      const userId = req.body.userId;
      console.log(workOrderId,amend)
      const workOrders = await WorkOrder.findOne({
        workOrderId: workOrderId,
        amend:amend
      });

      let message = `${decode.name} wants a WorkOrder with id: ${req.body.workOrderId} on ${ getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res
        .status(200)
        .json({ code: 200, message: "WorkOrder Fetched", data: workOrders });

    }, req, res, decode.id);
  }

  // Implement other controller methods similarly
}

module.exports = WorkOrderController;
