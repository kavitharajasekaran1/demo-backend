// This is just a sample script. Paste your real code (javascript or HTML) here.
// here only routing is done and if the ro
'use strict';
const SendOtp = require('sendotp');
var js2xmlparser = require("js2xmlparser")
const sendOtp = new SendOtp('223774AjX8U4ux5b3a022d');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
var request = require('request');
var cors = require('cors');
var dateTime = require('node-datetime');
var Promises = require('promise');
const date = require('date-and-time');
const Nexmo = require('nexmo');
var mongoose = require('mongoose');
var Photo = require('./models/documents');
var path = require('path');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
const log4js = require('log4js');
//const log4js = require('./log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });

const logger = log4js.getLogger('readypolicy');

const excelToJson = require('convert-excel-to-json');
  
const config = require('./config/config.json');

const register = require('./functions/register');
const newlogin = require('./functions/newlogin');
const login = require('./functions/login');

const verifyphone = require('./functions/phoneverification');
const getnewotp = require('./functions/getnewotp');
const deleteuser = require('./functions/deleteuser');
const getotpcount = require('./functions/getotpcount');

const User = require('./functions/getUser');

const motorsavepolicy = require('./functions/motorsavepolicy');
const motorfetchSavePolicy = require('./functions/motorfetchSavePolicy');

 const savetransaction = require('./functions/savetransaction');
 
 const readAllRequest = require('./functions/readAllRequest');
const updatetransaction = require('./functions/updatetransaction');
const brandnewupdatevehical = require('./functions/brandnewupdatevehical');
const calculatepremium = require('./functions/calculatepremium');
const getPolicyinfo = require('./functions/getPolicyinfo');
const gproposal = require('./functions/gproposal');
const calculatecarpremium = require('./functions/calculatecarpremium');
const updatevehicalcardetails = require('./functions/updatevehicaldetails');
const gproposalcar = require('./functions/gproposalcar');

const paymentDetails = require('./functions/paymentDetails');
const bharathiquickquote = require('./functions/bharathiquickquote');
const bharathiproposal = require('./functions/bharathiproposal');
const digitgo2wcreatequote = require('./functions/digitgo2wcreatequote');
const digitgo2wquickquote = require('./functions/digitgo2wquickquote');
// const royalmasterdetails =require('./functions/royalmasterdetails');


const digitgoPaymentGateway = require('./functions/digitgoPaymentGateway');
//const godigitcreatequote = require('./functions/godigitcreatequote');
var startdatetemp;
var enddatetemp;



const nexmo = new Nexmo({
    apiKey: 'c7ae10d1',
    apiSecret: '5d6766133225cd92'
});

// connection to email API
var transporter = nodemailer.createTransport("SMTP", {
    host: 'smtp.office365.com',
    port: 25,
    secure: true,
    auth: {
        user: "arun.hossamani@rapidqube.com",
        pass: "8983028@Ar"
    }
});

var requestList = [];

module.exports = router => {

    router.get('/', (req, res) => res.send("Welcome to commercial-insurance,please hit a service !"));

    router.post('/registerUser', cors(), (req, res) => {

        const userObject = req.body.userObject;
        console.log(userObject);
        


            register
                .registerUser(userObject)
                .then(result => {

                   
                    res
                        .status(result.status)
                        .json({
                            message: result.message
                        
                        });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        
    });
   
  

    router.post('/newLogin1', cors(), (req, res) => {

    logger.fatal('Hitting Login services.......');
    var ui = req.body;
    console.log("ui",ui);
        var phonetosend = req.body.phone;

        var otp = "";
        var possible = "0123456789";
       
        for (var i = 0; i<4; i++)
            otp += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log("otp" + otp);
        logger.fatal('OTP getting generate'+ '-->' +otp);
        sendOtp.send(phonetosend, "RDYPOL", otp, function (error, data, response) {
            console.log(data);
           // console.log("response",response)
            console.log(otp,"otp")
          });
        var otptosend = 'your otp is ' + otp;

        if (!phonetosend) {
            logger.error('Invalid Request');
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {
            User
            .getUser(phonetosend)
            .then(result => {
                if (result.usr.length == 0) {
                   
            newlogin
                .newlogin(phonetosend, otp)
                .then(result => {

                    
                    console.log(token,"token")
                   
                    res
                        .status(result.status)
                        .json({
                            message: result.message,
                            token:token,
                            
                            phone:phonetosend
                           
                        });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }else{

            register
            .registerUser(phonetosend, otp)
            .then(result => {
                const token = jwt.sign(result, config.secret, {
                    expiresIn: 60000
                })
                res
                    .status(result.status)
                    .json({
                        message: result.message,
                        token:token,
                        otp:otp,
                        phone:phonetosend
                    });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
        }
    
    });
    }
    });



    router.post('/newLogin', cors(), (req, res) => {


        var phonetosend = req.body.phone;

        var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
            otp += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log("otp" + otp);

        var otptosend = 'your otp is ' + otp;

        if (!phonetosend) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            newlogin
                .newlogin(phonetosend, otp)
                .then(result => {

                    const token = jwt.sign(result, config.secret, {
                        expiresIn: 60000
                    })

                    nexmo
                        .message
                        .sendSms('919768135452', phonetosend, otptosend, {
                            type: 'unicode'
                        }, (err, responseData) => {
                            if (responseData) {
                                console.log(responseData)
                            }
                        });
                    res
                        .status(result.status)
                        .json({
                            message: result.message,
                            token:token,
                            otp: result.otp
                        });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }
    });

    router.post('/otp', cors(), (req, res) => {

        const otp = req.body.otp;

   

        if (!otp) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {
            
               
                   
                        //var status = result.usr[0]._doc.status
                        
                            login
                                .loginUser(otp)
                            

                                    .then(result => {

                                    res
                                        .status(result.status)
                                        .json({
                                            message: result.message,
                                            token: token,
                                            userdetails: result.users[0]
                                        });

                                })
                                .catch(err => res.status(err.status).json({
                                    message: err.message
                                }));
                      
                    
                

        }
    });

    

    

    router.post("/newotp", cors(), (req, res, next) => {
        var phonetosend = req.body.phone;
        var email = req.body.email;
        var emailtosend = email;
        var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
            otp += possible.charAt(Math.floor(Math.random() * possible.length));
        var otptosend = 'your new otp is ' + otp;

        if (!email || !phonetosend) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            var mailOptions = {
                transport: transporter,
                from: '"Marin Service"<vikram.viswanathan@rapidqube.com>',
                to: emailtosend,
                subject: 'OTP Confirmation',

                html: "Hello,<br> Your Otp is.<br> " + otp
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {}
            });
            nexmo
                .message
                .sendSms('919768135452', phonetosend, otptosend, {
                    type: 'unicode'
                }, (err, responseData) => {
                    if (responseData) {
                        console.log(responseData)
                    }
                });
            getnewotp
                .getnewotp(email, otp)
                .then(result => {
                    res
                        .status(result.status)
                        .json({
                            message: result.message
                        });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });

    router.post("/getotpcount", cors(), (req, res, next) => {
        var count = req.body.count;
        var email = req.body.email;

        getotpcount
            .getotpcount(email, count)
            .then(result => {
                res
                    .status(result.status)
                    .json({
                        email: result.email,
                        count: result.count
                    });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    });

    router.post("/user/phoneverification", cors(), (req, res) => {
        logger.fatal('Entering into phone verification');
        const phone = parseInt(req.body.phone);
        var otp = req.body.otp;
        const userinfo = req.body.user;
        console.log(otp);
        console.log(phone);
        console.log(userinfo);
        User
            .getUser(phone)
            .then(result => {
                if (result.usr.length == 0) {
                    res.send({
                        status: 401,
                        message: 'user does not exist !'
                    });
                } else {
                var minutes1 = new Date(result.usr[0]._doc.created_at).getMinutes();
                console.log("minutes1" + minutes1);
                var minutes2 = new Date().getMinutes();
                console.log("minutes2" + minutes2);
                var diffinminutes = minutes2 - minutes1;
                if (diffinminutes > 10) {
                    logger.error('your otp has been expired please request new one');
                    res.send({
                        status: 201,
                        message: 'your otp has been expired please request new one'
                    });
                } else {
                    verifyphone
                        .phoneverification(otp, phone, userinfo)
                        .then(result => {

                            if (result.status === 202) {

                                const token = jwt.sign(result, config.secret, {
                                    expiresIn: 60000
                                })

                                res
                                    .status(result.status)
                                    .json({
                                        message: result.message,
                                        token: token

                                    });
                               
                            } else {

                                if (result.status === 404) {
                                    res
                                        .status(result.status)
                                        .json({
                                            message: result.message
                                        });
                                } else {
                                    logger.fatal('sucessfully verified'+'-->'+phone);
                                    res
                                        .status(200)
                                        .json({
                                            message: "please verify emailid too",
                                            status: false
                                        });

                                }
                            }

                        })
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }));
                }
            }
            })
        
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    });

    router.post("/setPassword", cors(), (req, res, next) => {
        var password = req.body.password;
        var email = req.body.email;

        setpassword
            .setpassword(email, password)
            .then(result => {
                res
                    .status(result.status)
                    .json({
                        message: result.message
                    });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    });

   

    router.post('/userfullname', cors(), (req, res) => {
        const userid = getUserId(req)
        console.log(userid);
        const rapidid = req.body.rapidID;
        console.log(rapidid);
        if (!rapidid || !rapidid.trim()) {
            // the if statement checks if any of the above paramenters are null or not..if
            // is the it sends an error report.
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            userfullname
                .userfullname(rapidid)
                .then(function(result) {
                    console.log(result)

                    res
                        .status(result.status)
                        .json({
                            status: result.status,
                            fullname: result.usr
                        })
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }

    });

   

    router.post('/brandnewupdatevehical', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering in Brandnewupdatevehicle');
        const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
       
      
       console.log(updatevehical,"brandnewupdatevehical")
      
        
        
    
         if (!updatevehical) {
        logger.error('Body is Invalid');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
    
        brandnewupdatevehical.brandnewupdatevehical(updatevehical)
        
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    
    
    router.post('/bharathiproposal', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Hitting gproposal for two wheeler');
        var obj=req.body;
        console.log(obj)
        var proposalenddate=  obj.Body.serve.SessionDoc.Session.Quote.PolicyEndDate

       var proposalstartdate=  obj.Body.serve.SessionDoc.Session.Quote.PolicyStartDate
       var QuoteNo=obj.Body.serve.SessionDoc.Session.SessionData.QuoteNo
       var OrderNo=obj.Body.serve.SessionDoc.Session.SessionData.OrderNo
       var emailId=obj.Body.serve.SessionDoc.Session.Client.EmailID
       var mobileNo=obj.Body.serve.SessionDoc.Session.Client.MobileNo 
       var inittime=obj.Body.serve.SessionDoc.Session.SessionData.InitTime
       var financed=obj.Body.serve.SessionDoc.Session.Client.FinancierDetails.IsFinanced
       var stateofregistration=obj.Body.serve.SessionDoc.Session.Client.ClientExtraTag01
       var Occupation=obj.Body.serve.SessionDoc.Session.Client.Occupation
       var EngineNo=obj.Body.serve.SessionDoc.Session.Vehicle.EngineNo
       var ChasisNo=obj.Body.serve.SessionDoc.Session.Vehicle.ChasisNo
       var Make=obj.Body.serve.SessionDoc.Session.Vehicle.Make
       var Model=obj.Body.serve.SessionDoc.Session.Vehicle.Model
       var FuelType=obj.Body.serve.SessionDoc.Session.Vehicle.FuelType
       var AccessoryInsured=obj.Body.serve.SessionDoc.Session.Vehicle.AccessoryInsured
       var ExShowroomPrice=obj.Body.serve.SessionDoc.Session.Vehicle.ExShowroomPrice
       var DateOfManufacture=obj.Body.serve.SessionDoc.Session.Vehicle.DateOfManufacture
       var DateOfRegistration=obj.Body.serve.SessionDoc.Session.Vehicle.DateOfRegistration
       var CityOfRegistration=obj.Body.serve.SessionDoc.Session.Client.CityOfResidence
       var givname=obj.Body.serve.SessionDoc.Session.Client.GivName
       var CarDamageSelected=obj.Body.serve.SessionDoc.Session.Quote.SelectedCovers.CarDamageSelected
       var TPLiabilitySelected=obj.Body.serve.SessionDoc.Session.Quote.SelectedCovers.TPLiabilitySelected
       var PADriverSelected=obj.Body.serve.SessionDoc.Session.Quote.SelectedCovers.PADriverSelected
       var PAFamilyPremiumSelected=obj.Body.serve.SessionDoc.Session.Quote.SelectedCovers.PAFamilyPremiumSelected


       console.log(OrderNo,"orderno")
       console.log(QuoteNo,"quoteno00000")




      console.log(proposalstartdate,"kaviiiiiiiii")
 const proposalrequest='<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><serve xmlns="http://schemas.cordys.com/gateway/Provider"> <SessionDoc><Session><SessionData xmlns="http://schemas.cordys.com/bagi/b2c/emotor/bpm/1.0"><Index>2</Index><InitTime>'+inittime+'</InitTime><UserName>signMtr</UserName><Password>AZg3Q1SktWKLz0Os/H0MlAxFfI75pjnpKjn9xrV9vimyyS7/5Ilil/ftcP5oHxC7IFYLVF0C3MAJcIznwrZvDA==</Password>	<OrderNo>'+OrderNo+'</OrderNo><QuoteNo>'+QuoteNo+'</QuoteNo><Route>INT</Route><Contract>MTR</Contract><Channel>signMtr</Channel><TransactionType>Quote</TransactionType><TransactionStatus>Fresh</TransactionStatus><ID>149208275803217169563038</ID><UserAgentID>2C000098</UserAgentID><Source>2C000098</Source></SessionData><tns:Vehicle xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0">	<tns:TypeOfBusiness>TR</tns:TypeOfBusiness>	<tns:AccessoryInsured>'+AccessoryInsured+'</tns:AccessoryInsured><tns:AccessoryValue>0</tns:AccessoryValue><tns:BiFuelKit>	<tns:IsBiFuelKit>N</tns:IsBiFuelKit><tns:BiFuelKitValue>0</tns:BiFuelKitValue><tns:ExternallyFitted>N</tns:ExternallyFitted></tns:BiFuelKit><tns:DateOfRegistration>'+DateOfRegistration+'</tns:DateOfRegistration><tns:DateOfManufacture>'+DateOfManufacture+'</tns:DateOfManufacture><tns:RiskType>FTW</tns:RiskType><tns:Make>'+Make+'</tns:Make><tns:Model>'+ Model+'</tns:Model><tns:FuelType>'+FuelType+'</tns:FuelType><tns:Variant>X PRO DRUM DISC SELF</tns:Variant><tns:IDV>41208.00</tns:IDV><tns:EngineNo>'+EngineNo+'</tns:EngineNo>	<tns:ChasisNo>'+ChasisNo+'</tns:ChasisNo><tns:VehicleAge>4</tns:VehicleAge><tns:CC>110</tns:CC><tns:SeatingCapacity>2</tns:SeatingCapacity><tns:PlaceOfRegistration>Bettiah</tns:PlaceOfRegistration><tns:VehicleExtraTag01 />	<tns:RegistrationNo>BR22S3564 </tns:RegistrationNo>	<tns:ExShowroomPrice>'+ExShowroomPrice+'</tns:ExShowroomPrice><tns:PaidDriver>False</tns:PaidDriver></tns:Vehicle><tns:Quote xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0"><tns:LLDriver>false</tns:LLDriver><tns:ExistingPolicy>	<tns:Claims>0</tns:Claims><tns:NCB>35</tns:NCB>	<tns:PolicyType>Comprehensive</tns:PolicyType><tns:EndDate>2019-08-06T23:59:59.000</tns:EndDate><tns:PolicyNo>OG-17-9906-1802-00004439</tns:PolicyNo><tns:InsuranceCompany>Bajaj Allianz General Insurance Co. Ltd.</tns:InsuranceCompany></tns:ExistingPolicy>	<tns:PolicyStartDate>'+proposalstartdate+'</tns:PolicyStartDate><tns:Deductible>0</tns:Deductible><tns:PAFamilySI>0</tns:PAFamilySI><tns:AgentNumber /><tns:DealerId /><tns:Premium><tns:Discount /></tns:Premium><tns:SelectedCovers><tns:CarDamageSelected>'+CarDamageSelected+'</tns:CarDamageSelected>	<tns:TPLiabilitySelected>'+TPLiabilitySelected+'</tns:TPLiabilitySelected>	<tns:PADriverSelected>'+PADriverSelected+'</tns:PADriverSelected><tns:PAFamilyPremiumSelected>'+PAFamilyPremiumSelected+'</tns:PAFamilyPremiumSelected></tns:SelectedCovers><tns:PolicyEndDate>'+proposalenddate+'</tns:PolicyEndDate></tns:Quote><tns:Client xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0"><tns:ClientType>Individual</tns:ClientType><tns:FinancierDetails><tns:IsFinanced>'+financed+'</tns:IsFinanced></tns:FinancierDetails>	<tns:CltDOB>19790930</tns:CltDOB><tns:CltSex>M</tns:CltSex>	<tns:Salut>MR</tns:Salut><tns:GivName>'+givname+'</tns:GivName><tns:ClientExtraTag01>'+stateofregistration+'</tns:ClientExtraTag01><tns:CityOfResidence>'+CityOfRegistration+'</tns:CityOfResidence><tns:EmailID>'+emailId+'</tns:EmailID><tns:MobileNo>'+mobileNo+'</tns:MobileNo><tns:SurName>Kumar Tiwari</tns:SurName><tns:Marryd>S</tns:Marryd><tns:Occupation>'+Occupation+'</tns:Occupation>	<tns:CltAddr01>vishunpurwa po d k shikarpur</tns:CltAddr01>	<tns:CltAddr02>ps -Shikarpur</tns:CltAddr02><tns:City>Bettiah</tns:City><tns:State>Bihar</tns:State><tns:PinCode>845451</tns:PinCode><tns:Nominee><tns:Name>punam pandey</tns:Name>	<tns:Age>39</tns:Age><tns:Relationship>Spouse</tns:Relationship></tns:Nominee><tns:RegistrationZone>B</tns:RegistrationZone></tns:Client><Payment><PaymentMode /><PaymentType /><TxnReferenceNo /><TxnAmount />	<TxnDate />	<BankCode /><InstrumentAmount /></Payment></Session></SessionDoc> </serve> </Body></Envelope>'

      
      console.log(proposalrequest,"proposalrequest")
      
        
        
    
      if (!proposalrequest) {
        logger.error('Body is Invalid...');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
                                    });
    
                            }else{

            bharathiproposal.bharathiproposal(proposalrequest)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });


    router.post('/bharathiquickquote', (req, res) => {
       console.log("hiiiiiiiiiiii")
       if (!checkToken(req)) {
        console.log("invalid token")
        return res.status(401).json({
            message: "invalid token"
        })
    }
      
       let  xmldata2=req.body;
       let startdatetemp=xmldata2.Body.serve.SessionDoc.Session.Quote.PolicyStartDate
       let enddatetemp=xmldata2.Body.serve.SessionDoc.Session.Quote.PolicyEndDate
      
  
       let emailId=xmldata2.Body.serve.SessionDoc.Session.Client.EmailID
       let mobileNo=xmldata2.Body.serve.SessionDoc.Session.Client.MobileNo 

       let financed=xmldata2.Body.serve.SessionDoc.Session.Client.FinancierDetails.IsFinanced
       let givname=xmldata2.Body.serve.SessionDoc.Session.Client.GivName
       let stateofregistration=xmldata2.Body.serve.SessionDoc.Session.Client.ClientExtraTag01
       let cityofregistration=xmldata2.Body.serve.SessionDoc.Session.Client.CityOfResidence
       let zone=xmldata2.Body.serve.SessionDoc.Session.Client.RegistrationZone
 
       let Make=xmldata2.Body.serve.SessionDoc.Session.Vehicle.Make
       let Model=xmldata2.Body.serve.SessionDoc.Session.Vehicle.Model
       let UserName=xmldata2.Body.serve.SessionDoc.Session.SessionData.UserName

       let password=xmldata2.Body.serve.SessionDoc.Session.SessionData.Password
       let inittime=xmldata2.Body.serve.SessionDoc.Session.SessionData.InitTime

       console.log(startdatetemp,"raj")
       console.log(enddatetemp,"kavitha")


        let xmldata = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">      <Body>        <serve xmlns="http://schemas.cordys.com/gateway/Provider">            <SessionDoc><Session>	<SessionData xmlns="http://schemas.cordys.com/bagi/b2c/emotor/bpm/1.0">		<Index>1</Index>		<InitTime>'+inittime+'</InitTime>		<UserName>'+UserName+'</UserName>		<Password>'+password+'</Password>		<OrderNo>NA</OrderNo>		<QuoteNo>NA</QuoteNo>		<Route>INT</Route>		<Contract>MTR</Contract>		<Channel>signMtr</Channel>		<TransactionType>Quote</TransactionType>		<TransactionStatus>Fresh</TransactionStatus>		<ID>149208275275017943554968</ID>		<UserAgentID>2C000098</UserAgentID>		<Source>2C000098</Source>	</SessionData>	<tns:Vehicle xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0">		<tns:TypeOfBusiness>TR</tns:TypeOfBusiness>		<tns:AccessoryInsured>N</tns:AccessoryInsured>		<tns:NonElecAccessoryInsured>N</tns:NonElecAccessoryInsured>		<tns:AccessoryValue>0</tns:AccessoryValue>		<tns:BiFuelKit>			<tns:IsBiFuelKit>N</tns:IsBiFuelKit>			<tns:BiFuelKitValue>0</tns:BiFuelKitValue>			<tns:ExternallyFitted>N</tns:ExternallyFitted>		</tns:BiFuelKit>		<tns:DateOfRegistration>2014-04-01T00:00:00.000</tns:DateOfRegistration>		<tns:DateOfManufacture>2014-04-01T00:00:00.000</tns:DateOfManufacture>		<tns:RiskType>FTW</tns:RiskType>		<tns:Make>'+Make+'</tns:Make>		<tns:Model>'+Model+'</tns:Model>		<tns:FuelType>P</tns:FuelType>		<tns:Variant>X PRO DRUM DISC SELF</tns:Variant>		<tns:IDV>41208</tns:IDV>		<tns:VehicleAge>4</tns:VehicleAge>		<tns:CC>110</tns:CC>		<tns:PlaceOfRegistration>Bettiah</tns:PlaceOfRegistration>		<tns:SeatingCapacity>2</tns:SeatingCapacity>		<tns:VehicleExtraTag01 />		<tns:RegistrationNo>BR22S3564 </tns:RegistrationNo>		<tns:ExShowroomPrice>52297</tns:ExShowroomPrice>		<tns:PaidDriver>False</tns:PaidDriver>	</tns:Vehicle>	<tns:Quote xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0">		<tns:LLDriver>false</tns:LLDriver>		<tns:ExistingPolicy>			<tns:Claims>0</tns:Claims>			<tns:NCB>35</tns:NCB>			<tns:PolicyType>Comprehensive</tns:PolicyType>			<tns:EndDate>2019-07-14T23:59:59.000</tns:EndDate>		</tns:ExistingPolicy>		<tns:PolicyStartDate>'+startdatetemp+'</tns:PolicyStartDate>		<tns:Deductible>0</tns:Deductible>		<tns:PAFamilySI>0</tns:PAFamilySI>		<tns:AgentNumber />		<tns:DealerId />		<tns:Premium>			<tns:Discount />		</tns:Premium>		<tns:SelectedCovers>			<tns:CarDamageSelected>True</tns:CarDamageSelected>			<tns:PAFamilyPremiumSelected>true</tns:PAFamilyPremiumSelected>			<tns:TPLiabilitySelected>True</tns:TPLiabilitySelected>			<tns:PADriverSelected>True</tns:PADriverSelected>			<tns:PAFamilyPremiumSelected>true</tns:PAFamilyPremiumSelected>		</tns:SelectedCovers>		<tns:PolicyEndDate>'+enddatetemp+'</tns:PolicyEndDate>	</tns:Quote>	<tns:Client xmlns:tns="http://schemas.cordys.com/bagi/b2c/emotor/2.0">		<tns:ClientType>Individual</tns:ClientType>		<tns:CltDOB />		<tns:FinancierDetails>			<tns:IsFinanced>'+financed+'</tns:IsFinanced>		</tns:FinancierDetails>		<tns:GivName>'+givname+' </tns:GivName>		<tns:SurName />		<tns:ClientExtraTag01>'+stateofregistration+'</tns:ClientExtraTag01>		<tns:CityOfResidence>'+cityofregistration+'</tns:CityOfResidence>		<tns:EmailID>'+emailId+'</tns:EmailID>		<tns:MobileNo>'+mobileNo+'</tns:MobileNo>		<tns:RegistrationZone>'+zone+'</tns:RegistrationZone>	</tns:Client></Session> </SessionDoc>        </serve>    </Body></Envelope>'
        
        console.log('Done');
         if (!xmldata) {
            logger.error('Body Is Invalid');
            console.log("invalid body ")
            return res.status(400).json({
                message: 'Invalid Request !'
                                        });
        
                          }else{
            logger.fatal('Premium Request Sucessfull....');
            bharathiquickquote.bharathiquickquote(xmldata)
        
            .then(result => {
               
                    res.status(result.status).json({
                        message: result.message,
                        response: result.Response
                                                   })
                               })
        
                .catch(err => res.status(err.status).json({
                    message: err.message
                                                            }));
        
            }
        
     
 });
    


    
      
 


    
    
    router.post('/calculatepremium', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering Into Calculate Premium......');
        const premiumrequest = req.body.CALCULATEPREMIUMREQUEST;
       
      
       console.log(premiumrequest,"premiumrequest")
      
        
        
    
         if (!premiumrequest) {
        logger.error('Body Is Invalid');
        console.log("invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
        logger.fatal('Premium Request Sucessfull....');
        calculatepremium.calculatepremium(premiumrequest)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    }); 

   
    
   




    router.post('/digitgo2wcreatequote', (req, res) => {
        console.log('Haiiiiiii');
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering Into digitgo2wcreatequote........');
       const createquote = req.body;
       
        console.log("Request",createquote);
                
             if (!createquote) {
        logger.error('Body Is Invalid');
        console.log("invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
       
        logger.fatal('createquote Request Sucessfull....');
        digitgo2wcreatequote.digitgo2wcreatequote(createquote)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });


    router.post('/digitgo2wquickquote', (req, res) => {
        console.log('Haiiiiiii');
        //console.log("Request: ", req.body.contract);
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering Into digitgo2wquickquote........');
       const createquote = req.body;
       
        console.log("Request",createquote);
                
             if (!createquote) {
        logger.error('Body Is Invalid');
        console.log("invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
       
        logger.fatal('quickquote Request Sucessfull....');
        digitgo2wquickquote.digitgo2wquickquote(createquote)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    

    router.post('/digitgo2wquickquote', (req, res) => {
        console.log('Haiiiiiii');
        //console.log("Request: ", req.body.contract);
        // if (!checkToken(req)) {
        //     console.log("invalid token")
        //     return res.status(401).json({
        //         message: "invalid token"
        //     })
        // }
        logger.fatal('Entering Into digitgo2wquickquote........');
       const createquote = req.body;
       
        console.log("Request",createquote);
                
             if (!createquote) {
        logger.error('Body Is Invalid');
        console.log("invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
       
        logger.fatal('quickquote Request Sucessfull....');
        digitgo2wquickquote.digitgo2wquickquote(createquote)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    /**
     * @description : Digitgo PaymentGateway Functionality
     */
    router.post('/digitgoPaymentGateway', (req, res) => {

        var data = req.body;
        console.log("data ::",data);

       
        digitgoPaymentGateway.digitgoPaymentGateway(data)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
                //res.redirect("'"+result.Response+"'");
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
    })
    

    router.post('/gproposalrequest', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Hitting gproposal for two wheeler');
        const proposalrequest = req.body.GPROPOSALREQUEST;
       
      
       console.log(proposalrequest,"proposalrequest")
      
        
        
    
         if (!proposalrequest) {
        logger.error('Body is Invalid...');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{

            gproposal.gproposal(proposalrequest)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    router.post('/calculatecarpremium', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
      
logger.fatal('Entering in Calculate Premium....');

    
        const calculatepremium = req.body. CALCULATEPREMIUMREQUEST;
       
      
       console.log(calculatepremium,"calculatepremium")
      // logger.debug("Some debug messages");
      
        
        
    
         if (!calculatepremium) {
        logger.fatal('Body is not valid...');
        console.log("invalid body")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
    
            calculatecarpremium.calculatecarpremium(calculatepremium)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
            
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });  
    
    router.post('/updatevehicalcardetails', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering in Update Vehicle car details..');
        const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
       
      
       console.log(updatevehical,"updatevehical")
      
        
        
    
         if (!updatevehical) {
        logger.error('Body is Invalid....');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
    
            updatevehicalcardetails.updatevehical(updatevehical)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });
    
    router.post('/gproposalcar', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Hitting gproposal car...');
        const gpproposalcar = req.body.GPROPOSALREQUEST;
       
      
       console.log(gpproposalcar,"gpproposalcar")
      
        
        
    
         if (!gpproposalcar) {
            if (!checkToken(req)) {
                console.log("invalid token")
                return res.status(401).json({
                    message: "invalid token"
                })
            }
            logger.error('Body is Invalid..');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
    
            gproposalcar.gpcar(gpproposalcar)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    router.post('/calculatepremiumrollover', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Entering Into Calculate Premium Rollover......');
        const premiumrequest = req.body.CALCULATEPREMIUMREQUEST;
       
      
       console.log(premiumrequest,"premiumrequest")
      
        
        
    
         if (!premiumrequest) {
        logger.error('Body Is Invalid');
        console.log("invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
        logger.fatal('Premium Request Sucessfull....');
        calculatepremium.calculatepremium(premiumrequest)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });   

    router.post('/brandnewupdatevehicalrollover', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        
        logger.fatal('Entering in Brandnewupdatevehicle Rollover');
        const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
       
      
       console.log(updatevehical,"brandnewupdatevehical")
      
        
        
    
         if (!updatevehical) {
        logger.error('Body is Invalid');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
    
        brandnewupdatevehical.brandnewupdatevehical(updatevehical)
        
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });
    router.get('/royalmasterdetail', cors(), (req, res) => {
        var data ;
        const result = excelToJson({
            sourceFile: 'uploads/royalmaster.xlsx',
        });
            var lookup = {};
            var items = result.Sheet1;
            var final = [];
             var item
            for (var item, i = 1; item = items[i++];) {
                var name = item.E;
    
                if (!(name in lookup)) {
                    lookup[name] = 1;
                    final.push(name);
                }  
            } 
            console.log("printing unique ",final)
    
            //royalmasterdetails.royalmasterdetails(final)
         res.send(final);
    }); 

    router.post('/gproposalrequestrollover', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        logger.fatal('Hitting gproposal for two wheeler rollover....');
        const proposalrequest = req.body.GPROPOSALREQUEST;
       
      
       console.log(proposalrequest,"proposalrequest")
      
        
        
    
         if (!proposalrequest) {
        logger.error('Body is Invalid...');
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{

            gproposal.gproposal(proposalrequest)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    response: result.Response
                })
            })
    
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });

    router.post('/calculatecarpremiumrollover', (req, res) => {
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
      
        logger.fatal('Entering in Calculate Premium Rollover....');
        
            
                const calculatepremium = req.body.CALCULATEPREMIUMREQUEST;
               
              
               console.log(calculatepremium,"calculatepremium")
              // logger.debug("Some debug messages");
              
                
                
            
                 if (!calculatepremium) {
                logger.fatal('Body is not valid...');
                console.log("invalid body")
                return res.status(400).json({
                    message: 'Invalid Request !'
                });
            
            }else{
            
                    calculatecarpremium.calculatecarpremium(calculatepremium)
            
                .then(result => {
                   
                        res.status(result.status).json({
                            message: result.message,
                            response: result.Response
                        })
                    })
                    
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
            
                }
            });  

            router.post('/updatevehicalcardetailsrollover', (req, res) => {
                logger.fatal('Entering in Update Vehicle car details Rollover..');
                const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
               
              
               console.log(updatevehical,"updatevehical")
              
                
                
            
                 if (!updatevehical) {
                logger.error('Body is Invalid....');
                console.log(" invalid body ")
                return res.status(400).json({
                    message: 'Invalid Request !'
                });
            
            }else{
            
                    updatevehicalcardetails.updatevehical(updatevehical)
            
                .then(result => {
                   
                        res.status(result.status).json({
                            message: result.message,
                            response: result.Response
                        })
                    })
            
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
            
                }
            });

            router.post('/gproposalcarrollover', (req, res) => {
                if (!checkToken(req)) {
                    console.log("invalid token")
                    return res.status(401).json({
                        message: "invalid token"
                    })
                }
                logger.fatal('Hitting gproposal car Rollover...');
                const gpproposalcar = req.body.GPROPOSALREQUEST;
               
              
               console.log(gpproposalcar,"gpproposalcar")
              
                
                
            
                 if (!gpproposalcar) {
                    logger.error('Body is Invalid..');
                console.log(" invalid body ")
                return res.status(400).json({
                    message: 'Invalid Request !'
                });
            
            }else{
            
                    gproposalcar.gpcar(gpproposalcar)
            
                .then(result => {
                   
                        res.status(result.status).json({
                            message: result.message,
                            response: result.Response
                        })
                    })
            
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
            
                }
            });

            router.get("/getPolicyinfo", cors(), (req, res) => {
            
                    getPolicyinfo.getPolicyinfo()
                     .then(function(result) {
                         console.log("result.query---->", JSON.stringify (result.query));
                         return res.json({
                             "status": 200,
                             "getdata": JSON.stringify (result.query)
                         });
                     })
                     .catch(err => res.status(err.status).json({
                         message: err.message
                     }));
              
             
             
         });
   

    router.get("/readIndex", cors(), (req, res) => {

        if (checkToken(req)) {

            readIndex
                .readIndex({})
                .then(function(result) {
                    var firstrequest = result.query[0]
                    console.log("firstrequest--", firstrequest);
                    var length = result.query.length;
                    var lastrequest = result.query[length - 1];
                    console.log("lastrequest--", lastrequest);
                    if (requestList.length === 0) {
                        requestList.push(firstrequest.requestid);
                        requestList.push(lastrequest.requestid);

                    }

                    return res.json({
                        "status": 200,
                        "requestrange": requestList
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        } else {
            res
                .status(401)
                .json({
                    "status": false,
                    message: 'cant fetch data !'
                });
        }
    });

    router.post("/readAllrequest", cors(), (req, res) => {
        
        const key = req.body.key;
        if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }


            readAllRequest
                .readAllRequest(key)
                .then(function(result) {
                    console.log("  result.query---->", result.query);
                    return res.json({
                        "status": 200,
                        "readAllRequest": result.query
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        
           
        }
    )

    router.post("/readTransaction", (req, res) => {

        if (checkToken(req)) {

            const requestid = req.body.policyNumber;
            console.log("requestid1", requestid);

            readRequest
                .readRequest(requestid)
                .then(function(result) {

                    return res.json({
                        "status": 200,
                        "message": result.query
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        } else {
            res
                .status(401)
                .json({
                    "status": false,
                    message: 'cant fetch data !'
                });
        }
    });



    router.post('/notifyClaim', cors(), (req, res) => {
        const userid = getUserId(req)
        const NotificationClaim = req.body.transaction;
        const phonetosend = req.body.phone;
        console.log(phonetosend);
        const emailtosend = req.body.email;
        console.log(emailtosend);
        var messagetosend = 'Thank you for choosing HDFC Ergo to insure your Motor. Please wait for 4-5 working days to receive your copy of the Insurance Policy Document';

        const policyNumber = NotificationClaim.policyNumber;
        const claim_no1 = Math.floor(Math.random() * (1000 - 1)) + 1;
        const claim_no = claim_no1.toString();
        const claimNotifiedDate = new Date();
        const status = "Claim Notified";

        NotificationClaim.claimNotifiedDate = claimNotifiedDate;
        NotificationClaim.status = status;
        NotificationClaim.InsuredId = userid;
        console.log("NotificationClaim" + JSON.stringify(NotificationClaim));
        const transactionString = JSON.stringify((({
            claim_no,
            Title,
            status,
            claimNotifiedDate
        }) => ({
            claim_no,
            Title,
            status,
            claimNotifiedDate
        }))(NotificationClaim));
        console.log("transactionString" + transactionString);
        if (!userid || !userid.trim()) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });
        } else {

            var firstMethod = function() {
                var promise = new Promise(function(resolve, reject) {
                    notifyClaim
                        .notifyClaim(claim_no, policyNumber, userid, NotificationClaim)
                        .then(result => {
                            var message = result.message
                            console.log("message" + message);
                            resolve(message);

                        })
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }));
                });
                return promise;
            };

            var secondMethod = function() {

                updatetransaction
                    .updatetransaction(policyNumber, transactionString, userid)
                    .then((result) => {
                        if (result !== null && result !== '') {
                            var mailOptions = {
                                transport: transporter,
                                from: '"Marin Service"<vikram.viswanathan@rapidqube.com>',
                                to: emailtosend,
                                subject: 'Policy Issue Notification',

                                html: "Hello,<br> Thank you for choosing HDFC Ergo to insure your Motor. Please wait fo" +
                                    "r 4-5 working days to receive your copy of the Insurance Policy Document<br>"
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {}
                            });
                            // nexmo     .message     .sendSms('919768135452', phonetosend, messagetosend, {
                            //         type: 'unicode'     }, (err, responseData) => {         if
                            // (responseData) {             console.log(responseData)         }     });

                            res
                                .status(200)
                                .json({
                                    "message": result.message,
                                    "status": "success"
                                });
                        }

                    })
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));

            };
            firstMethod().then(secondMethod);
        }

    });

    
   

    



    router.post('/UploadDocs', multipartMiddleware, function(req, res, next) {
        const id = getUserId(req)
        const claimno = parseInt(req.body.claimno, 10);
        // const claimno =215;
        console.log(claimno)
        var photo = new Photo(req.body);
        console.log("req.files.image" + JSON.stringify(req.files));
        var imageFile = req.files.file.path;

        cloudinary
            .uploader
            .upload(imageFile, {
                tags: 'express_sample'
            })
            .then(function(image) {
                console.log('** file uploaded to Cloudinary service');
                console.dir(image);
                photo.url = image.url;
                photo.userid = id;
                photo.claimno = claimno;
                // Save photo with image metadata
                return photo.save();
            })
            .then(function(photo) {

                res.send({
                    url: photo._doc.url,
                    claimno: photo._doc.claimno,
                    message: "files uploaded succesfully"
                });
            })
            .finally(function() {

                res.render('photos/create_through_server', {
                    photo: photo,
                    upload: photo.image
                });
            });
    });

    router.get('/images/id', cors(), (req, res) => {
        const id = getUser(req)
        console.log("id" + id);
        Photo
            .find({
                "userid": id
            })
            .then((images) => {
                var image = [];
                for (let i = 0; i < images.length; i++) {
                    image.push(images[i]._doc)

                }

                res.send({
                    images: image,
                    message: "image fetched succesfully"
                });
            })

    });

 /* 
    Royal sundaram payment gateway return response and redirect to UI
 */ 
 router.post("/rsReturnURL", (req, res) =>{
    console.log("payment gateway response: ", req.body);
    const response = req.body;

        paymentDetails
            .savePaymentDetails(response)
            .then(result => {
                
                res.redirect('http://localhost:8081/index.html'); //url to UI


            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
   
})

    function getUserId(req) {
        const token = req.headers['x-access-token'];
        if (token) {
            try {
                var decoded = jwt.verify(token, config.secret);
                return decoded.usr[0]._id
            } catch (err) {
                return false;
            }
        } else {
            return failed;
        }
    }

    function getUser(req) {
        const token = req.query.token;
        if (token) {
            try {
                var decoded = jwt.verify(token, config.secret);
                return decoded.users[0].rapidID
            } catch (err) {
                return false;
            }
        } else {
            return failed;
        }
    }

    function checkToken(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                var decoded = jwt.verify(token, config.secret);
                return true

            } catch (err) {

                return false;
            }

        } else {

            return false;
        }
    }

    function filterstatus(status) {

        if (1 == 1) {

            fetchClaimlist
                .fetch_Claim_list({
                    "user": "risabh",
                    "getclaims": "getclaims"
                })
                .then(function(result) {

                    console.log("result" + result.claimlist.claimlist)
                    var statusfilter = [];

                    for (let i = 0; i < result.claimlist.claimlist.length; i++) {
                        console.log("status" + status);
                        console.log("statusledger" + result.claimlist.claimlist[i].status);
                        if (result.claimlist.claimlist[i].status === status) {

                            statusfilter.push(result.claimlist.claimlist[i].status);
                            console.log("statusfilter" + statusfilter);

                        }
                    }
                    return statusfilter;
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));

        } else {
            return res
                .status(401)
                .json({
                    message: 'cant fetch data !'
                });

        }
    }

    function count(arr) {
        var statusname = [],
            statuscount = [],
            prev;

        arr.sort();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== prev) {
                statusname.push(arr[i]);
                statuscount.push(1);
            } else {
                statuscount[statuscount.length - 1]++;
            }
            prev = arr[i];
        }
        console.log("statusname" + statusname);
        var result = [];
        for (var status in statusname) {

            result.push({
                statusname: statusname[status],
                statuscount: statuscount[status]
            });
        }

        return result;
    }

/*
 To get vehicle details dropdownlist from the excel sheet.
*/
    router.get('/dropdownList', cors(), (req, res) => {
        var data ;
        const result = excelToJson({
            sourceFile: 'uploads/MMV master 27102017.xlsx',
        });
            var lookup = {};
            var items = result.Sheet1;
            var final = [];

            for (var item, i = 0; item = items[i++];) {
                var name = item.E;

                if (!(name in lookup)) {
                    lookup[name] = 1;
                    final.push(name);
                }   
                console.log("printing unique ",final)
            }

         res.json(final);
    });

}
 
