const { WorkOrder, Logs, WorkOrderSaveSchema, workOrderTermsAndConditions } = require('../models');
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
  
  async createWorkOrder(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      
      let project = {
        "_id": {
          "$oid": "64d12b19479abd47eaa8b30b"
        },
        "id": "808904c6-1d34-4624-97f9-8e915efcb3de",
        "name": "Siddharth Nagar",
        "assignedTo": [
          "ed5e2138-6a15-415d-9a3b-54e146dcb9dd",
          "b07e53ce-8c8c-4a49-a57e-d1c62d4d6026",
          "af7547c7-ba58-44c7-8448-4c6deb87be46",
          "e81ab324-f38e-40d2-8fa4-e35b5497e310",
          "b324496e-e226-4020-bf6f-51eb6e195aae",
          "c46b0dd5-35f3-4f50-980b-785fef389b06",
          "36793e6d-403b-4e4a-a9f7-bd95f39d00c1",
          "97a4ad1e-9d97-4a0c-96c2-72448fc7eed2",
          "89de7eeb-2824-4d81-98b7-a7cc226644b7",
          "125e9109-994f-4935-94de-59f0aa80f1e8",
          "cbeafb7b-83dc-4cf7-af6c-9e369411b9e8",
          "2188c66a-3dd1-4783-bd20-785ca5515f53",
          "ab4bbd9a-1f73-438e-bc0e-8e1f7ab71ff7",
          "952e1f9f-2ea4-4492-8ce4-4811664f986d",
          "15048e28-ba8f-418d-ae4d-7944e1bcf6a1",
          "4b95ff04-ac44-4061-a28c-7ab4c50dc27e",
          "a3ae9535-4a6d-41c5-bf56-292ec84682d7",
          "18998094-b660-4a1e-94b0-a924b0d9582c",
          "d154fe67-9f21-4a6f-ab5e-b0c4e8ba6609",
          "cbb30dc2-6d45-4908-806f-cf4927d1e920",
          "e72fa7c6-99f7-45f6-83e7-092b2f09839d",
          "27c99385-0946-44e3-95ce-ccdccd9c520c",
          "4eece243-ab00-4f72-92ed-fb6960692803",
          "d7953ac4-1163-4bf2-80f8-896853765e1c",
          "66bde1fb-d6ca-479f-953d-060db5b003e8",
          "d8a01338-05da-4acf-bbfb-0bbb13e2f39c",
          "d288c4a3-6a34-46e5-9320-3a00aaf49633",
          "a851dd09-f74b-4e08-afc0-27d2fec16990",
          "a18e74d9-7cbb-42f6-811c-e17ba0552d58",
          "c82ed9e8-2da8-4da0-be9d-d169725c283a",
          "0f010e04-aaac-4d0d-b113-b72093ead85c",
          "275849c1-311c-4761-921b-3e4060e1528c",
          "26e4ead8-f8ce-45e6-8aac-2ad69bbc22d2",
          "93026fee-4f50-4576-b2d4-35dc26ecd731",
          "9fc6f970-2dbb-48e7-aca0-2d5e36854ed5",
          "aed450af-6d8b-442f-b265-8ac222c19749",
          "e53f9727-a7f6-4829-9f7b-095761d8dca4",
          "df489c24-f570-411c-9388-a9a1bab4cbd0",
          "2de68968-02d7-4f63-bfb0-7923806d03db",
          "e087a972-fe4a-4a25-8171-39edde2a28db",
          "9183afc8-26b7-4ee5-b4e7-3ed97539ee59",
          "e39c521a-ad03-42a2-9431-8cc4f1c9a179",
          "f8ccfdf0-bd27-4f17-9597-b87078d0f787",
          "974d014a-8108-46ab-b5c8-11f17999957e",
          "e5c4e8d7-b2a9-4a38-9fdb-64e0c934f970",
          "777e7a7a-f05c-417e-89ed-1de0a2814fd9",
          "6c79b52e-f8d8-412d-b70d-a7b90c5f8f04",
          "137857f1-4f8d-4394-aa84-e56f4ddca389",
          "78a85af8-c68d-45dc-921c-a12bd4dbbfc6",
          "1818efe8-3902-4e92-aea5-876a10a551e4",
          "45d9dfb3-3e66-4cab-8128-62c0e632daf1",
          "562afd99-da36-4a0d-b36a-9e61e0ef7d33",
          "c2bce76c-dc21-4b99-8955-7811ea727df2",
          "77606f8a-335c-4c91-b680-3f275dfd85c6",
          "7eed50c2-21f1-4b23-a0b4-b9df2e924648",
          "193d1105-c76b-45a9-be39-c71f9875caa9",
          "7bb12865-7857-4c2c-a92b-02101ea86450",
          "980d3359-d033-477c-9d8b-0aec6cbdfd69",
          "b81f20c2-7157-44aa-9edd-f52d981fd9ba",
          "d89bc7d3-a9fb-40ec-8451-4c6c1551e91e",
          "5ae6f661-7853-4a19-abf8-6c60f63b937f",
          "08c39b81-bad9-4a1a-b9b1-1dfa049d89ce",
          "753e956a-2288-4012-949e-abecfbdeec35"
        ],
        "blockName": "Shohratgarh",
        "locationName": "Siddharth Nagar",
        "stores": [],
        "bomAwsExcel": [],
        "boqAwsExcel": "https://awsbucket-12.s3.amazonaws.com/AGYA.xlsx.1692874023326.excelFile.xlsx",
        "createdAt": {
          "$date": "2023-08-07T17:34:17.031Z"
        },
        "updatedAt": {
          "$date": "2024-05-16T10:03:54.069Z"
        },
        "__v": 5,
        "contractorAssignedTo": [
          "64d2184010f15abac0896cbe",
          "64d4dd6f48bbad92031e78f6",
          "64d23769d9cffb5cd5f6e46e"
        ],
        "vendorAssignedTo": [
          "64d35300be76545526d2fe6a",
          "64cc8daf80732f85544158b5",
          "64d0920b7e1db3c3f61eb2d7",
          "64ca07f6bf2015fa3ff4ed48",
          "64ce36d87e1db3c3f61eaa0c",
          "64ce58897e1db3c3f61eaaae",
          "64ce610d7e1db3c3f61eab02",
          "64ce65ae7e1db3c3f61eabf5",
          "64ce68867e1db3c3f61eac4f"
        ],
        "boqExcels": [
          {
            "gpName": "Ledawa",
            "gpId": "64d0d3cf479abd47eaa8a274",
            "boqAws": "https://awsbucket-12.s3.amazonaws.com/LEDAWA.xlsx.1692877249486.excelFile.xlsx",
            "_id": {
              "$oid": "64e741c38fc2723fd3cd67ef"
            }
          },
          {
            "gpName": "Alidapur",
            "gpId": "64d0cfdd479abd47eaa8a1cf",
            "boqAws": "https://awsbucket-12.s3.amazonaws.com/ALIDAPUR (1).xlsx.1692877431241.excelFile.xlsx",
            "_id": {
              "$oid": "64e74278a4813f7a91e5838e"
            }
          },
          {
            "gpName": "Agya",
            "gpId": "64d0c3ac7bcc5738f780da94",
            "boqAws": "https://awsbucket-12.s3.amazonaws.com/ALIDAPUR (1).xlsx.1692877961238.excelFile.xlsx",
            "_id": {
              "$oid": "64e7448ac3d44c00c5913dc5"
            }
          }
        ],
        "projectCode": "WP-004",
        "gpName": [
          {
            "_id": "64f81d61205143099c61240a",
            "name": "Agya",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d66205143099c612424",
            "name": "Madawa",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d86205143099c612458",
            "name": "Parigawa",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d8a205143099c612469",
            "name": "Chonar",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d8e205143099c612477",
            "name": "Ramwapur Tiwari",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d99205143099c612498",
            "name": "Tadiya",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81d9f205143099c6124b0",
            "name": "Mehanauli",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dae205143099c6124cc",
            "name": "Parsohiya Nankar",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81db4205143099c6124e0",
            "name": "Kotiya Digar",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dbe205143099c6124f4",
            "name": "Ledawa",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dc2205143099c612502",
            "name": "Mudila Khurd",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dc6205143099c612513",
            "name": "Khunuwa & Yad Mustkaham",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dca205143099c612521",
            "name": "Kapiya Grant",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dd4205143099c612540",
            "name": "Niyaw & Babhani",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81dd9205143099c612554",
            "name": "Parasiya & Dahiyana",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81de3205143099c612576",
            "name": "Khar Ganwar",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81df0205143099c612592",
            "name": "Mahatha",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81df3205143099c6125a0",
            "name": "Mudila Buzurg",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "64f81e0b205143099c6125d9",
            "name": "Siyaw Nankar",
            "stores": [],
            "__v": 0
          },
          {
            "_id": "6526a4e800dd2b01c0a4fa28",
            "name": "Sehuda",
            "schemeNo": 20093066,
            "__v": 0,
            "description": "",
            "latitude": 27.241629954212907,
            "longitude": 82.76641952182514
          },
          {
            "_id": "6527a2a700dd2b01c0a555c2",
            "name": "Dhebarua",
            "schemeNo": 20094400,
            "__v": 0,
            "description": "",
            "latitude": 27.492595,
            "longitude": 82.785871
          },
          {
            "_id": "6527a37a00dd2b01c0a555d3",
            "name": "Suraj Kundiya",
            "schemeNo": 20101920,
            "__v": 0,
            "description": "",
            "latitude": 27.420509,
            "longitude": 83.053351
          },
          {
            "_id": "6527a45400dd2b01c0a555e7",
            "name": "Dohariya Khurd",
            "schemeNo": 20094337,
            "__v": 0
          },
          {
            "_id": "6527a4a000dd2b01c0a555f8",
            "name": "Dudhawaniya Buzurg",
            "schemeNo": 20093875,
            "__v": 0,
            "description": "",
            "latitude": 27.476434,
            "longitude": 82.795936
          },
          {
            "_id": "6527a50900dd2b01c0a55609",
            "name": "Golhaura Mustahakam",
            "schemeNo": 20076707,
            "__v": 0,
            "description": "",
            "latitude": 27.438364,
            "longitude": 82.918977
          },
          {
            "_id": "6527a56a00dd2b01c0a5561a",
            "name": "Malagahiya",
            "schemeNo": 20102996,
            "__v": 0
          },
          {
            "_id": "6527a67900dd2b01c0a5563c",
            "name": "Siswa Buzurg",
            "schemeNo": 20093870,
            "__v": 0
          },
          {
            "_id": "6527a77500dd2b01c0a5564d",
            "name": "Belawa",
            "schemeNo": 20093050,
            "__v": 0,
            "description": "",
            "latitude": 27.348994678561795,
            "longitude": 82.99648331984706
          },
          {
            "_id": "6527a85900dd2b01c0a5565e",
            "name": "Gharuwar ",
            "schemeNo": 20094965,
            "__v": 0,
            "description": "",
            "latitude": 27.486673,
            "longitude": 82.779984
          },
          {
            "_id": "6527a8f400dd2b01c0a5566f",
            "name": "Jharuya",
            "schemeNo": 20101448,
            "__v": 0,
            "description": "",
            "latitude": 27.444898419270007,
            "longitude": 82.94775529491409
          },
          {
            "_id": "6527a9da00dd2b01c0a55691",
            "name": "Niyaw And Babhani",
            "schemeNo": 0,
            "__v": 0,
            "description": "",
            "latitude": 27.395486,
            "longitude": 83.000188
          },
          {
            "_id": "6527aab800dd2b01c0a556a2",
            "name": "Pakadi Pathan ",
            "schemeNo": 20093957,
            "__v": 0,
            "description": "",
            "latitude": 27.309850554995517,
            "longitude": 82.63766410418548
          },
          {
            "_id": "6527ab5500dd2b01c0a556b3",
            "name": "Parsohiya Nankar And Nibibi ",
            "schemeNo": 20076681,
            "__v": 0,
            "description": "",
            "latitude": 27.430965,
            "longitude": 82.944243
          },
          {
            "_id": "6527afe000dd2b01c0a556c4",
            "name": "Parsohiya And Parsa Divan ",
            "schemeNo": 20096755,
            "__v": 0,
            "latitude": 27.457701,
            "longitude": 82.773094
          },
          {
            "_id": "6527b38400dd2b01c0a556d5",
            "name": "Ramapur",
            "schemeNo": 20096625,
            "__v": 0
          },
          {
            "_id": "6527b41d00dd2b01c0a556e6",
            "name": "Sirawat And Paliya Tek",
            "schemeNo": 20096742,
            "__v": 0,
            "description": "",
            "latitude": 27.30363962021663,
            "longitude": 82.99861771126858
          },
          {
            "_id": "6527b4a100dd2b01c0a556f7",
            "name": "Taulihwa ",
            "schemeNo": 20076409,
            "__v": 0,
            "description": "",
            "latitude": 27.379926,
            "longitude": 82.873951
          },
          {
            "_id": "653fa5b773c4d9effb802a4a",
            "name": "Dhanuara Buzurg",
            "schemeNo": 20094400,
            "__v": 0,
            "description": "",
            "latitude": 27.449409,
            "longitude": 82.817568
          },
          {
            "_id": "653fab3573c4d9effb803902",
            "name": "Jugdihwa",
            "schemeNo": 20094386,
            "__v": 0,
            "description": "",
            "latitude": 27.45484009920056,
            "longitude": 82.94012365911267
          },
          {
            "_id": "653fac5d73c4d9effb803a6e",
            "name": "Pakadihawa & Pathar",
            "schemeNo": 20093899,
            "__v": 0
          },
          {
            "_id": "6540d63473c4d9effb80a548",
            "name": "Budapar",
            "schemeNo": 20096614,
            "__v": 0,
            "description": "",
            "latitude": 27.372465,
            "longitude": 82.985912
          },
          {
            "_id": "6540d67273c4d9effb80a563",
            "name": "Mahali",
            "schemeNo": 20094320,
            "__v": 0
          },
          {
            "_id": "6560566a3a11622099a0b699",
            "name": "Pakdi ",
            "schemeNo": 0,
            "__v": 0
          }
        ],
        "companyBillingAddress": "Skymettle Buildcon Pvt. Ltd.\nKhasra No 206 Near Vaishano Dharamkata, Link Road Main Road NH 370 Marg Post Office Shohratgarh Village Chahtra Naugarh Siddharthnagar Uttar Pradesh Pin 272203. GSTIN: 09ABBCS7752A1ZE",
        "companyDeliveryAddress": "Skymettle Buildcon Pvt. Ltd.\nKhasra No 206 Near Vaishano Dharamkata, Link Road Main Road NH 370 Marg Post Office Shohratgarh Village Chahtra Naugarh Siddharthnagar Uttar Pradesh Pin 272203. GSTIN: 09ABBCS7752A1ZE",
        "companyName": "SKYMETTLE BUILDCON PRIVATE LIMITED",
        "companyAddress": "Khasra No 206 Near Vaishano Dharamkata, Link Road Main Road NH 370 Marg Post Office Shohratgarh Village Chahtra Naugarh Siddharthnagar Uttar Pradesh Pin 272203. GSTIN: 09ABBCS7752A1ZE",
        "companyCode": "SBPL"
      }

      // const sequenceVal = await WorkOrder.find({projectId:req.body.projectData.id}).count();
      const sequenceVal = await WorkOrder.aggregate([
        {$match: { projectId: "808904c6-1d34-4624-97f9-8e915efcb3de" }},
        {$group: { _id: "$workOrderId", // Group by workOrderId
            count: { $sum: 1 } // Count the occurrences
          }},
        {
          $group: {
            _id: null, // Group all results together
            totalCount: { $sum: 1 } // Count the number of unique workOrderId values
          }
        }
      ]);
  
      // console.log(sequenceVal)
      // console.log(req.body)
  
      // return;
  
      let uniqueId = "" 
  let paddedSequenceVal =""
  console.log(project)
  if (sequenceVal && sequenceVal[0] && sequenceVal[0].totalCount !== undefined) {
  paddedSequenceVal = String(sequenceVal[0].totalCount + 1).padStart(5, "0");
  uniqueId = `${project.companyCode}/${project.projectCode}/WO/${paddedSequenceVal}`;
  // Use uniqueId as needed
  } else {
  //console.error("sequenceVal is undefined or does not have the expected structure.");
  paddedSequenceVal = String(1).padStart(5, "0");
   uniqueId = `${project.companyCode}/${project.projectCode}/WO/${paddedSequenceVal}`;
  }
  
  
  
      const workOrder = await WorkOrder.create({
        workOrderId: uniqueId,
        vendorId: req.body.vendorId,
        vendorName: req.body.vendorName,
        name: req.body.name,
        address: req.body.address,
        workOrderDate: new Date(req.body.workOrderDate),
        quotationDate: new Date(req.body.quotationDate),
        gstInNo: req.body.gstInNo,
        panNo: req.body.panNo,
        kindAttn: req.body.kindAttn,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId,
        subject: req.body.subject,
        tableData: req.body.tableData,
        scopeOfWork: req.body.scopeOfWork,
        priceBasis: req.body.priceBasis,
        taxesAndDuties: req.body.taxesAndDuties,
        paymentTerms: req.body.paymentTerms,
        workCompletionSchedule: req.body.workCompletionSchedule,
        keyMaterialsProcurement: req.body.keyMaterialsProcurement,
        inspections: req.body.inspections,
        defectLiabilityPeriod: req.body.defectLiabilityPeriod,
        safetyRequirements: req.body.safetyRequirements,
        statutoryRequirements: req.body.statutoryRequirements,
        otherTermAndCondition: req.body.otherTermAndCondition,
        general: req.body.general,
        other: req.body.other,
        note: req.body.note,
        transportation: req.body.transportation,
        companyAddress: project.companyAddress,
        billingAddress: req.body.billingAddress,
        deliveryAddress: req.body.deliveryAddress,
        performanceAndTermination: req.body.performanceAndTermination,
        nameOfCompanyInAddress: req.body.nameOfCompanyInAddress,
        preparedBy:decode.name,
  
        projectId:req.body.projectData.id,
        projectName:req.body.projectData.name
        // pdfOfWorkOrder: decodeURIComponent(`https://${process.env.BUCKET_SHORT_NAME}.s3.amazonaws.com/${req.file.key}`)
      });
      console.log(workOrder)
  
      //   IMP: remember to replace req.body.value as no value field in this schema
      let message = `${decode.name} created WorkOrder ${
        uniqueId
      } on ${getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res
        .status(200)
        .json({ code: 200, message: "WorkOrder Created", data: workOrder });
    }, req, res, decode.id);
  }

  async getTermAndConditionTemplate(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const userId = req.body.userId;
  
      console.log(req.body.templateId)
      const templateRules = await workOrderTermsAndConditions.findById(req.body.templateId);
      // const templateRules = await workOrderTermsAndConditions.find();
  
      let message = `${decode.name} wants all ${templateRules} values on ${getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res
        .status(200)
        .json({ code: 200, message: "Template Fetched", data: templateRules });
    }, req, res, decode.id);
  }
  async getAllTermAndConditionTemplate(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const userId = req.body.userId;
  
      const templateRules = await workOrderTermsAndConditions.find();
      const templateArray = templateRules.map(template => ({
        _id: template._id,
        name: template.nameOfTemplate
      }));
      let message = `${decode.name} wants all templateRules values on ${getCurrentDate()}`;
      await Logs.create({
        logs: message,
        userId: req.body.userId,
      });
      return res
        .status(200)
        .json({ code: 200, message: "Template Fetched", data: templateArray });
    }, req, res, decode.id);
  }
  
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
  async getAllWorkOrderById(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const workOrderId = req.body.workOrderId;
      const userId = req.body.userId;
      console.log('retrieving', workOrderId)
      const workOrders = await WorkOrder.find({
        workOrderId: workOrderId,
      });
  
      let message = `${decode.name} wants all WorkOrder with id: ${req.body.workOrderId} on ${getCurrentDate()}`;
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
