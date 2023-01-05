const jwt = require('jsonwebtoken');
const User = require("../repositories/userRepository")
const moment = require("moment");
const bcrypt = require("bcryptjs");
const strRand = require("../helper/strRand");
const hashPassword = require("../helper/hashPassword");
const  { v4: uuidv4 }  = require('uuid');
const response = require("../helper/responseHelper");
const { sendForgotPassword } = require("../helper/mailHandler");
require('dotenv').config()

const login = async ({
    email,
    password
}) => {
    try {
        
        const data = await User.detail({email})
        if (!data) 
            throw response({code:400,msg:"Email tidak dikenali."})
    
        let verify = await bcrypt.compare(password, data.password);
        if(!verify)
            throw response({code:400,msg:"Password salah."})
    
        let json = { 
            userId: data.id,
            email: data.email
        }
        const token = await jwt.sign(json, process.env.APP_SECRET, {
            expiresIn: "5h"
        });
    
        json.access_token = token;
    
    
        return response({
            data:{
                rows: json
            },
            code:200,
            msg: "Login berhasil."
        })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }
}

const register = async (inputValues) => {
    try {

        const check = await User.detail({
            email: inputValues.email
        })
        if (check) 
            throw response({code:400,msg:"Email telah terdaftar."})


        const data = await User.create({
            id: uuidv4(),
            email: inputValues.email,
            password: hashPassword(inputValues.password),
            phoneNumber: inputValues.phoneNumber,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        return response({
            data: {
                rows: data
            },
            code: 200,
            msg: "Register berhasil."
        })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }
    
}

const resetPassword = async (email) => {
    try {
        const data = await User.detail({email})
    if (!data) 
        throw response({code:400,msg:"Email tidak dikenali."})
    
    const newPass = strRand(6, true);
    await User.update(data.id,{
        password: hashPassword(newPass),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
    });

    await sendForgotPassword(email, newPass)

    return response({
        code: 200,
        msg: "Reset password berhasil silahkan cek email anda."
    })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }
    
}


module.exports={
    login,
    register,
    resetPassword
}