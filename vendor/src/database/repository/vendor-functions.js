const { Vendor, Logs, VendorApproval } = require('../models');
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

class VendorController {
  

  // Utility method to handle try-catch blocks with logging
  
  async getAllVendorsWithBlackListed(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      let vendors = await Vendor.find({ 'isApproved.isApproved': true });
      // console.log(vendors)
      let message = decode.name + " " + "retrieved all Vendors" + " on " +   getCurrentDate();
  
      await Logs.create({ logs: message, userId: req.body.userId });

      return res.status(200).json({ msg: true, data: vendors });
    }, req, res, decode.id);
  }

  async getAllVendorsOnlyBlackListed(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
       let vendors = await Vendor.find({ 'isBlackListed.isBlackListed': true, 'isApproved.isApproved': true });
    // console.log(vendors)
    let message = decode.name + " " + "retrieved all Vendors" + " on " +   getCurrentDate();

    await Logs.create({
      logs: message,
      userId: req.body.userId,
    });
    return res.status(200).json({ msg: true, data: vendors });
    }, req, res, decode.id);
  }


  async getAllVendorsNotApproved(req, res) {
    console.log("here");
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      let vendors = await Vendor.find({ 'isApproved.isApproved': false });
      // console.log(vendors)
      let message = decode.name + " " + "retrieved all Vendors" + " on " +   getCurrentDate();
  
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res.status(200).json({ msg: true, data: vendors });
    }, req, res, decode.id);
  }

  
  async getAllVendors(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      let vendors = await Vendor.find({ 'isBlackListed.isBlackListed': { $in: [false, null] }, 'isApproved.isApproved': true });
      // console.log(vendors)
      let message = decode.name + " " + "retrieved all Vendors" + " on " +   getCurrentDate();
  
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res.status(200).json({ msg: true, data: vendors });
    }, req, res, decode.id);
  }
  
  async getVendorById(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      let vendors = await Vendor.findById(req.body.vendorId);
      console.log(vendors)
      let message = decode.name + " " + "retrieved Vendor " + vendors.vendorName + " on " +   getCurrentDate();
  
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res.status(200).json({ message: true, data: vendors });
    }, req, res, decode.id);
  }

  // Implement other controller methods similarly
}

module.exports = VendorController;
