const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  workOrderId: { type: String, required: true },
  vendorId: String,
  projectId: String,
  vendorName: String,
  projectName: String,
  name: String,
  address: String,
  workOrderDate: { type: Date, default: Date.now },
  gstInNo: String,
  amend: { type: Number, default: 0 },
  amendDate: String,
  panNo: String,
  kindAttn: String,
  mobileNo: String,
  emailId: String,
  subject: String,
  quotationDate: Date,
  tableData: mongoose.Schema.Types.Mixed,
  scopeOfWork: String,
  transportation: String,
  priceBasis: String,
  taxesAndDuties: String,
  paymentTerms: String,
  workCompletionSchedule: String,
  keyMaterialsProcurement: String,
  performanceAndTermination: String,
  inspections: String,
  defectLiabilityPeriod: String,
  safetyRequirements: String,
  statutoryRequirements: String,
  otherTermAndCondition: String,
  general: String,
  other: String,
  note: String,
  pdfOfWorkOrder: String,
  companyAddress: String,
  billingAddress: String,
  deliveryAddress: String,
  preparedBy:String,
  isApproved: { type: Boolean, default: false },
  approvedBy:String,
  approvedOnDate:String,
  nameOfCompanyInAddress: String,
  createdAt:{type:String, default:new Date(Date.now())}
},
{timestamps:true});
// Create indexes on specific fields
workOrderSchema.index({ workOrderId: 1 });
workOrderSchema.index({ vendorName: 1 });
workOrderSchema.index({ projectName: 1 });

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

module.exports = WorkOrder;