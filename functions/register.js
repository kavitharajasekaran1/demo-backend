'use strict';

const user = require('../models/newuserlogin');

const users = 'risabh.s';


exports.registerUser = (phonetosend,otp) => new Promise((resolve, reject) => {

    const newUser = new user({

      
        phone:phonetosend,
        otp:otp,
        created_at: new Date()
       
    });
    newUser
        .save()
        .then(() => resolve({status: 201, message: 'Please Check Your'}))
        .catch(err => {

            if (err.code == 11000) {

               resolve({status: 200, message: 'Please Check Your OTP'});

            } else {

                reject({status: 500, message: 'Internal Server Error !'});
            }
        });
});