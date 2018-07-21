var js2xmlparser = require("js2xmlparser");
var bcSdk = require('../fabcar/invoke.js');
//var xml2jsparser = require("xml2jsparser")
var parser = require('xml2json');
var js2xmlparser = require("js2xmlparser");
var request = require("request");
var utf8 = require('utf8');
const log4js = require('../log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');


exports.digitgo2wcreatequote = (createquote) =>{ 
return new Promise((resolve, reject) => {

    console.log("1")


//   var object = js2xmlparser.parse("contract", createquote)
//  object1= parser.toJson(object)
//  console.log("our request", object1);
 object=JSON.stringify(createquote);
console.log("2")

logger.fatal('godigitcreatequote');


request.post({
    url:"https://preprod-qnb.godigit.com/motorinsurance/services/contract/quote",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
    },
     body: object
    //  body:createquote
},

function(error, response, body){
    logger.fatal('Successfull Taking Response from godigitcreatequote API.....');
  //  console.log("status",response.StatusCode);
    console.log("body",body);
    console.log(error);
    // console.log(xml2jsparser.parse("CALCULATEPREMIUMREQUEST", body))
    
    //var json = parser.toJson(body);
    var json1 = JSON.parse(body);
    // console.log("json1",json1);
    var data =  JSON.stringify(json1);
    console.log("data", data)
    
    console.log("kavi",json1.error.errorCode);
    // console.log("data",data.error.errorCode);
    // console.log(body.errorCode);
    var status = json1.error.errorCode;
    console.log("status---->",status)
    if (status == 0){
        console.log('3');
        logger.fatal('Successfull in calculating premium response');
    // var key  =  JSON.stringify(json1.enquiryId)
    var key  = json1.enquiryId

    console.log("keyvalue",key)
    const transactiondetails = ({
        data: data,
        key:key
    });
    logger.fatal('Storing  Responses in Blockchain');
    bcSdk.savetransaction({
        Transactiondetails:transactiondetails   
         })
return  resolve({
    status: 200,
    message:"Success",
    Response:json1
    
})
    }else{
        logger.error(json1.error.errorMessage);
        return  resolve({
            status: 400,
            message:json1.error.errorMessage,
            Response:json1
            
        })
    }
}




);
})

}