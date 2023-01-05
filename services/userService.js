const User = require("../repositories/userRepository")
const UserDetail = require("../repositories/userDetailRepository")
const moment = require("moment");
const isEmpty = require("../helper/isEmpty");
const  { v4: uuidv4 }  = require('uuid');
const response = require("../helper/responseHelper");

const getList = async () => {
    try {
        const data = await User.listAll();
        return response({
            data,
            code: 200,
            msg: "get list user berhasil."
        })
        
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }
}

const addUser = async (inputValues, files) => {
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
        const detail = await UserDetail.create({
            id: uuidv4(),
            userId: data.id,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            address: inputValues.address,
            gender: inputValues.gender,
            image: "http://localhost:3000/" + files.filename,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        });

        return response({
            data: {
                rows: {
                    ...data,
                    detail
                }
            },
            code: 200,
            msg: "Berhasil menambah."
        })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }
}

const updateUser = async (inputValues) => {
    try {

        const column = ['email', 'password', 'phoneNumber']
        const columnDetail = ['firstName', 'lastName', 'address','gender','image']
        let userData = {}
        let detailData = {}
        for (const key in inputValues) {
            if (column.includes(key)) {
                userData = {
                    ...userData,
                    [key]: key === 'password' ? hashPassword(inputValues[key]) : inputValues[key]
                }
            }
            if (columnDetail.includes(key)) {
                detailData = {
                    ...userData,
                    [key]: inputValues[key]
                }
            }
        }

        const data = await User.update(userId,{
            ...userData,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        const detail = await UserDetail.update(userId,{
            ...detailData,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
        });

        return response({
            data: {
                rows: {
                    ...data,
                    detail
                }
            },
            code: 200,
            msg: "Berhasil update."
        })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }

}

const deleteUser = async (userId) => {
    try {
        await User.destroy({id:userId})
        await UserDetail.destroy(userId)
        return response({
            code: 200,
            msg: "Delete berhasil."
        })
    } catch (error) {
        throw response({
            code: 400,
            msg: error.message
        })
    }

}
module.exports={
    getList,
    addUser,
    updateUser,
    deleteUser
}