const parse = require('xml-parser');
const stringify = require('xml-stringify');
 //const camaro = require('camaro')
 var xml2js = require('xml2js');

var js2xmlparser = require("js2xmlparser");
var jsonxml = require('jsontoxml');
var bcSdk = require('../multichain/invoke.js');
//var xml2jsparser = require("xml2jsparser")
var parser = require('xml2json');

var request = require("request");
var utf8 = require('utf8');
const log4js = require('log4js');
//const log4js = require('../log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');


exports.bharathiproposal = (proposalrequest) =>{ 
return new Promise((resolve, reject) => {
   

console.log("1")
 var object= parse("request",proposalrequest)
console.log("hi",proposalrequest)
//  object=jsonxml(request)

// object=XML.parse(request)
// object=stringify(request1)

// console.log(js2xmlparser.parse("person", obj))
// var object =JSON.stringify(object1,"request")

//console.log("object",object);
logger.fatal('proposalcaluation');


request.post({
    url:"https://uat.bhartiaxaonline.co.in/cordys/com.eibus.web.soap.Gateway.wcp?organization=o=B2C,cn=cordys,cn=defaultInst106,o=mydomain.com",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/xml',
    },
     body: proposalrequest
},



function(error, response, body){
    logger.fatal('Successfull Taking Response from calculatepremium API.....');
    console.log("status",body);
  console.log('================================')
  console.log(' inside function                                ')
    console.log("body",parser.toJson(body));
    console.log('================================')
    console.log('                                 ')
    console.log(error);
    console.log('================================')
    console.log('                                 ')
   // console.log(response)
    console.log('================================')
    console.log('                                 ')
    
    var json = parser.toJson(body);
    var json1 = JSON.parse(json)
    var data =  JSON.stringify(json1)
  

    console.log("status---->",data)
    console.log("to json -> %s", JSON.stringify(json1));
    console.log('================================')
    console.log('       Result code check                           ')
   
    console.log('================================')
    var status = json1.Envelope.Body.serveResponse.tuple.old.serve.serve["SOAP:Envelope"]["SOAP:Body"].processTPRequestResponse.response.StatusCode;
console.log(status)

    if (status == 200){
        logger.fatal('Successfull in calculating premium response');
    var key  =  JSON.stringify(json1.Envelope.Body.serveResponse.tuple.old.serve.serve["SOAP:Envelope"]["SOAP:Body"].processTPRequestResponse.response.QuoteNo.$t);
console.log(key)
console.log(json1.Envelope.Body.serveResponse.tuple.old.serve.serve["SOAP:Envelope"]["SOAP:Body"].processTPRequestResponse.response.StatusMsg)
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
    Response:data
    
})
    }else{
        logger.error(json1.Envelope.Body.serveResponse.tuple.old.serve.serve["SOAP:Envelope"]["SOAP:Body"].processTPRequestResponse.response.StatusMsg);
        return  resolve({
            status: 400,
            message:json1.Envelope.Body.serveResponse.tuple.old.serve.serve["SOAP:Envelope"]["SOAP:Body"].processTPRequestResponse.response.StatusMsg,
            Response:json1
            
        })
    }
}




);
})

}