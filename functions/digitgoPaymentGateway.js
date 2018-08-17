var request = require("request");
var utf8 = require('utf8');
const log4js = require('log4js');

log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');


exports.digitgoPaymentGateway = (data) =>{ 
return new Promise((resolve, reject) => {

    const object=JSON.stringify(data);

request.post({
    url:"https://preprod-digitpaymentgateway.godigit.com/DigitPaymentGateway/rest/insertPaymentOnline/EB/Motor",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
        'Authorization':'YANTNIVR6YASG3G838UTB15RRUMPHQ5G'
    },
     body: object
    },

    function(error, response, body){

    logger.fatal('Successfull Taking Response from godigitcreatequote API.....');
  
        console.log("response :",body);
        console.log("error :",error)
       
            return  resolve({
                status: 200,
                message:"Success",
                Response:body
            
            })
        
});
})

}