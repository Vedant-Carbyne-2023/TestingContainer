const mongoose = require('mongoose');

const workOrderSaveSchema = new mongoose.Schema({
  workOrderId: { type: String, required: true },
  userId: { type: String, required: true },
  vendorId: String,
  projectId: String,
  vendorName: String,
  projectName: String,
  name: String,
  address: String,
  workOrderDate:Date,
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
},{
    timestamps:true
});

const WorkOrderSaveSchema = mongoose.model('WorkOrderSaveSchema', workOrderSaveSchema);

module.exports = WorkOrderSaveSchema;