const parse = require('xml-parser');
const stringify = require('xml-stringify');
 //const camaro = require('camaro')
 var xml2js = require('xml2js');

var js2xmlparser = require("js2xmlparser");
var jsonxml = require('jsontoxml');
var bcSdk = require('../fabcar/invoke.js');
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


exports.bharathiquickquote = (request1) =>{ 
return new Promise((resolve, reject) => {
   

console.log("1")
 var object= parse("request",request1)
console.log("hi",request1)

// var kavitha='<Session><SessionData xmlns="http://schemas.cordys.com/bagi/b2c/emotor/bpm/1.0"> <Index>1</Index>    <InitTime>Thu, 13 Apr 2017 16:55:39 GMT</InitTime>    <UserName>signMtr<UserName/> <Password>AZg3Q1SktWKLz0Os/H0MlAxFfI75pjnpKjn9xrV9vimyyS7/5Ilil/ftcP5oHxC7IFYLVF0C3MAJcIznwrZvDA==</Password> <OrderNo>NA</OrderNo> <QuoteNo>NA</QuoteNo> <Route>INT</Route> <Contract>MTR</Contract> <Channel>polbaz</Channel> <TransactionType>Quote</TransactionType> <TransactionStatus>Fresh</TransactionStatus> <ID>149208275275017943554968</ID> <UserAgentID>2C000098</UserAgentID> <Source>2C000098</Source></SessionData><tns:Vehicle xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0"> <tns:TypeOfBusiness>TR</tns:TypeOfBusiness> <tns:AccessoryInsured>N</tns:AccessoryInsured> <tns:NonElecAccessoryInsured>N</tns:NonElecAccessoryInsured> <tns:AccessoryValue>0</tns:AccessoryValue> <tns:BiFuelKit> <tns:IsBiFuelKit>N</tns:IsBiFuelKit> <tns:BiFuelKitValue>0</tns:BiFuelKitValue> <tns:ExternallyFitted>N</tns:ExternallyFitted> </tns:BiFuelKit> <tns:DateOfRegistration>2014-04-01T00:00:00.000</tns:DateOfRegistration> <tns:DateOfManufacture>2014-04-01T00:00:00.000</tns:DateOfManufacture> <tns:RiskType>FTW</tns:RiskType> <tns:Make>HERO MOTOR CORP</tns:Make> <tns:Model>PASSION</tns:Model> <tns:FuelType>P</tns:FuelType> <tns:Variant>X PRO DRUM DISC SELF</tns:Variant> <tns:IDV>41208</tns:IDV> <tns:VehicleAge>4</tns:VehicleAge> <tns:CC>110</tns:CC> <tns:PlaceOfRegistration>Bettiah</tns:PlaceOfRegistration> <tns:SeatingCapacity>2</tns:SeatingCapacity> <tns:VehicleExtraTag01 /> <tns:RegistrationNo>BR22S3564 </tns:RegistrationNo> <tns:ExShowroomPrice>52297</tns:ExShowroomPrice> <tns:PaidDriver>False</tns:PaidDriver></tns:Vehicle><tns:Quote xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0"> <tns:LLDriver>false</tns:LLDriver> <tns:ExistingPolicy> <tns:Claims>0</tns:Claims> <tns:NCB>35</tns:NCB> <tns:PolicyType>Comprehensive</tns:PolicyType> <tns:EndDate>2018-07-06T23:59:59.000</tns:EndDate> </tns:ExistingPolicy> <tns:PolicyStartDate>2018-07-06T00:00:00.000</tns:PolicyStartDate><tns:Deductible>0</tns:Deductible> <tns:PAFamilySI>0</tns:PAFamilySI> <tns:AgentNumber /> <tns:DealerId /> <tns:Premium> <tns:Discount /> </tns:Premium> <tns:SelectedCovers> <tns:CarDamageSelected>True</tns:CarDamageSelected> <tns:PAFamilyPremiumSelected>true</tns:PAFamilyPremiumSelected> <tns:TPLiabilitySelected>True</tns:TPLiabilitySelected> <tns:PADriverSelected>True</tns:PADriverSelected> <tns:PAFamilyPremiumSelected>true</tns:PAFamilyPremiumSelected> </tns:SelectedCovers> <tns:PolicyEndDate>2018-04-19T23:59:59.000</tns:PolicyEndDate></tns:Quote><tns:Client xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0"> <tns:ClientType>Individual</tns:ClientType> <tns:CltDOB /> <tns:FinancierDetails> <tns:IsFinanced>0</tns:IsFinanced></tns:FinancierDetails> <tns:GivName>TW238275707201704130455394890 </tns:GivName><tns:SurName /> <tns:ClientExtraTag01>BIHAR</tns:ClientExtraTag01> <tns:CityOfResidence>Bettiah</tns:CityOfResidence> <tns:EmailID>pb@pb.com</tns:EmailID> <tns:MobileNo>9777777777</tns:MobileNo> <tns:RegistrationZone>B</tns:RegistrationZone></tns:Client></Session>'
// console.log(parser.toJson(kavita),"lllllllllllllllllll")
//  object=jsonxml(request)

// object=XML.parse(request)
// object=stringify(request1)

// console.log(js2xmlparser.parse("person", obj))
// var object =JSON.stringify(object1,"request")

//console.log("object",object);
logger.fatal('Calculatepremium');


request.post({
    url:"https://uat.bhartiaxaonline.co.in/cordys/com.eibus.web.soap.Gateway.wcp?organization=o=B2C,cn=cordys,cn=defaultInst106,o=mydomain.com",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/xml',
    },
     body: request1
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
    //console.log(xml2jsparser.parse("CALCULATEPREMIUMREQUEST", body))
    // var json = parser.toJson(body);
    // var json1 = JSON.parse(json)
    // var data =  JSON.stringify(json1)


    var json = parser.toJson(body);
    var json1 = JSON.parse(json)
    var data =  JSON.stringify(json1)
  
    //const parseString = require('xml2js-parser').parseString;
    //const xml = '<root>Hello xml2js-parser!</root>';
    // parseString(body, (err, result) => {
    //   console.log(result,"result");
    // });




    // var status = JSON.stringify(json1.response.StatusCode)

   // var status = data.processTPRequestResponse.response.StatusCode
    // console.log(status)
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