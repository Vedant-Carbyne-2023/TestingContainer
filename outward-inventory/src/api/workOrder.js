const { WorkOrderFunction } = require("../database");
// const { PublishCustomerEvent, SubscribeMessage } = require("../utils");
// const  UserAuth = require('./middlewares/auth');
// const { CUSTOMER_SERVICE } = require('../config');
// const { PublishMessage } = require('../utils')

module.exports = (app) => {
    
    const service = new WorkOrderFunction();


    // app.post('/submit-workorder',   async (req,res,next) => {

    //     const { _id } = req.user;
    //     const { txnNumber } = req.body;

    //     const { data } = await service.PlaceOrder({_id, txnNumber});
        
    //     const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

    //     res.status(200).json(data);

    // });

    app.post('/get-all-workOrder', service.getAllWorkOrder);
    app.post('/get-workOrder-by-id', service.getWorkOrderById);
    app.post('/get-wo-termsAndConditionTemplate', service.getAllTermAndConditionTemplate);
    app.post('/get-wo-termsAndConditionTemplate-selectedTemplate', service.getTermAndConditionTemplate);

    app.post('/create-workOrder', service.createWorkOrder);
    app.post('/get-all-workOrder-by-id', service.getAllWorkOrderById);
    app.put('/cart',  async (req,res,next) => {

        const { _id } = req.user;

        const { data } = await service.AddToCart(_id, req.body._id);
        
        res.status(200).json(data);

    });

    app.delete('/cart/:id',  async (req,res,next) => {

        const { _id } = req.user;


        const { data } = await service.AddToCart(_id, req.body._id);
        
        res.status(200).json(data);

    });
    
    app.get('/cart',   async (req,res,next) => {

        const { _id } = req.user;
        
        const { data } = await service.GetCart({ _id });

        return res.status(200).json(data);
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/shoping : I am Shopping Service'})
    })
 
}
