const {   UserFunction } = require("../database");
// const { PublishCustomerEvent, SubscribeMessage } = require("../utils");
// const  UserAuth = require('./middlewares/auth');
// const { CUSTOMER_SERVICE } = require('../config');
// const { PublishMessage } = require('../utils')

module.exports = (app) => {
    
    const service = new UserFunction();


    // app.post('/submit-workorder',   async (req,res,next) => {

    //     const { _id } = req.user;
    //     const { txnNumber } = req.body;

    //     const { data } = await service.PlaceOrder({_id, txnNumber});
        
    //     const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

    //     res.status(200).json(data);

    // });

      
  app.post('/login-user',  service.loginUser);
  app.post('/get-all-users', service.showAllUsers );

}
