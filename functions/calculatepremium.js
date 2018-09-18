var js2xmlparser = require("js2xmlparser");
var bcSdk = require('../multichain/invoke.js');
//var xml2jsparser = require("xml2jsparser")
var parser = require('xml2json');
var json2xml = require('json2xml')
var request = require("request");
var utf8 = require('utf8');
const log4js = require('log4js');
//const log4js = require('../log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');


exports.calculatepremium = (premiumrequest) =>{ 
return new Promise((resolve, reject) => {
   

  // const brandnewupdatevehical = ({
  //     updatevehical
  //    // rapid_doc_ID: rapid_doc_ID
  //   // docinfo: docinfo
  // })


//var object = js2xmlparser.parse("CALCULATEPREMIUMREQUEST", premiumrequest)
var object = json2xml(premiumrequest)
console.log("object",object)
logger.fatal('Calculatepremium');


request.post({
    url:"https://dtcdoc.royalsundaram.in/Services/Product/TwoWheeler/CalculatePremium",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/xml',
    },
     body: object
},

function(error, response, body){
    logger.fatal('Successfull Taking Response from calculatepremium API.....');
  //  console.log("status",response.StatusCode);
    console.log("body",body);
    console.log(error);
    //console.log(xml2jsparser.parse("CALCULATEPREMIUMREQUEST", body))
    // var json = parser.toJson(body);
    // var json1 = JSON.parse(json)
    var data =  JSON.parse(body)
    
    var status = JSON.stringify(data.PREMIUMDETAILS.Status.StatusCode)
    console.log("status---->",status)
    //console.log("to json -> %s", JSON.stringify(json1));
    if (status === "S-0002"){
        logger.fatal('Successfull in calculating premium response');
    var key  =  JSON.stringify(data.PREMIUMDETAILS.DATA.QUOTE_ID)
    const transactiondetails = ({
        data: data,
        key:key
    });
    logger.fatal('Storing  Responses in Blockchain');
    bcSdk.savetransaction({
        Transactiondetails:transactiondetails   
         })
         console.log(Transactiondetails)
return  resolve({
    status: 201,
    message:data.PREMIUMDETAILS.Status.Message,
    Response:data
    
})
    }else{
        logger.error(data.PREMIUMDETAILS.Status.Message);
        return  resolve({
            status: 200,
            message:data.PREMIUMDETAILS.Status.Message,
            Response:data
            
        })
    }
}




);
})

}