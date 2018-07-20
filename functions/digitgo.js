var js2xmlparser = require("js2xmlparser");
//var xml2jsparser = require("xml2jsparser")
var parser = require('xml2json');
var request = require("request");
var utf8 = require('utf8');
var bcSdk = require('../fabcar/invoke.js');
const log4js = require('log4js');
//const log4js = require('../log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');

exports.digitgo= (digital) =>{ 
return new Promise((resolve, reject) => {
   

  // const brandnewupdatevehical = ({
  //     updatevehical
  //    // rapid_doc_ID: rapid_doc_ID
  //   // docinfo: docinfo
  // })

console.log("1")
//  object1 = JSON.stringify( digital)


// console.log("object",object1)
logger.fatal('Calculate Car Premium..');


request.post({
    url:"https://preprod-qnb.godigit.com/motorinsurance/services/contract/quote",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
    },
     body: digital
},

function(error, response, body){
    logger.fatal('Taking Response From Calculate Car Premium API.');
  //  console.log("status",response.StatusCode);

   
    console.log(error);
    //console.log(xml2jsparser.parse("CALCULATEPREMIUMREQUEST", body))
    logger.fatal('Converting Response in Json');
    // var json = parser.toJson(body);
    var json1=JSON.parse(body);
    var data = JSON.stringify(json1)
    console.log(json1,"dfghdf")
    // var data =  JSON.stringify(json1)
    var status =json1.error.errorCode
console.log(status,"status")
  
    if (status==0){
        logger.fatal('Response is successfull...');
    var key  =  json1.enquiryId
    
    const transactiondetails = ({
        data: data,
        key:key
    });
    logger.fatal('Storing Response in Blockchain.');
    bcSdk.savetransaction({
        Transactiondetails:transactiondetails   
         })
return  resolve({
    status: 201,
    message:"Success",
    Response:json1
})

} else {
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