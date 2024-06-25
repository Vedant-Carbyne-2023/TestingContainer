const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  name: String,
  quantity:Number,

},
{timestamps:true});
// Create indexes on specific fields

workOrderSchema.index({ itemId: 1 });

const Inventory = mongoose.model('Inventory', workOrderSchema);

module.exports = Inventory;