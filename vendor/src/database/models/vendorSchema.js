const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true
  },
  vendorEmail: {
    type: String,
  },
  tradeName: {
    type: String
  },
  vendorPhone: {
    type: String
  },
  panNumber: {
    type: String,
  },

  aadhaarVerify:{
    type:Boolean
  },
  aadhaarMaskedNumber:{
    type:String
  },

  gstNumber: {
    type: String,
  },
  aadhaarNumber: {
    type: String,
  },

  pdf: {
    type: String
  },
  pan_front:{
    type: String
  },
  aadhaar_front:{
    type: String
  },
  aadhaar_back:{
    type: String
  },

  pf_number:{
    type: String
  },
  esic_number:{
    type: String
  },


  vendorCategory: [{
    type: String
  }],
  natureOfBusiness: {
    type: String
  },
  vendorWebsite: {
    type: String
  },
  registeredOfficeAddress: {
    type: String
  },
  officeAddress: {
    type: String
  },
  bankInfo: {
    bankAccName: {
      type: String
    },
    bankAccNo: {
      type: String
    },
    bankIfscNo: {
      type: String
    }
  },
  authorizedContactPerson: [{
    name: {
      type: String
    },
    contactNumber: {
      type: String
    },
    email: {
      type: String
    }
  }],
  pfRegistrationNumber: {
    type: String
  },
  esicRegistrationNumber: {
    type: String
  },
  qualityCertification:[{
    type: String
  }],
  annualTurnover: {
    type: String
  },
  projectExperience: {
    type: String
  },
  projectDetails: [{
  
    customerName: {
      type: String
    },
    projectValue: {
      type: String
    },
    contactPerson: {
      type: String
    },
    contactNumber: {
      type: String
    },
    email: {
      type: String
    }
  }],
  copyOfCheque: {
    type: String
  },
  attachmentSheet: {
    type: String
  },
  attachmentWOCopies: {
    type: String
  },
  attachmentCompletionCertificates: {
    type: String
  },
  gstScreenShotPdf: {
    type: String
  },
  pdf: {
    type: String
  },
  projectName: {
    type: String
  },
  category: [{
    type: String
  }],
  vendor_code: {
    type: String
  },
  projectsAssigned: [{ type: String }],
  isBlackListed: {
    reason: String,
    userName: String,
    userId: String,
    isBlackListed: {
      type: Boolean,
      default: false,
    },
  },
  paymentTerms:String,
  productCategory:[{type:String}],
  isApproved:{
    reason: String,
    userName: String,
    userId: String,
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  isUpdated:[{
    userName:String,
    userId:String,
    date:Date
  }],
  createdBy:String
},
{timestamps:true}
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports=Vendor;
