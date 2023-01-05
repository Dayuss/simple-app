const route = require('express').Router();
const userService = require('../services/userService');
const response = require("../helper/responseHelper");

const {
    check,
    validationResult
} = require('express-validator');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


route.get('/', 
    async (req, res, next) => {
    try{
        let data = await userService.getList();
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});

route.post('/',
    upload.single('image'),
    check('email').not().isEmpty().withMessage('Email harus diisi.'),
    check('password').not().isEmpty().withMessage('Password harus diisi.'),
    async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            throw response({
                code: 400,
                msg: errors.array()
            })

        let data = await userService.addUser(req.body, req.file);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});

route.put('/',
    check('email').not().isEmpty().withMessage('Email harus diisi.'),
    check('password').not().isEmpty().withMessage('Password harus diisi.'),
    check('phoneNumber').optional(),
    async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            throw response({
                code: 400,
                msg: errors.array()
            })

        let data = await userService.updateUser(req.body);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});

route.delete('/:userId',
    async (req, res, next) => {
    try{
        let data = await userService.deleteUser(req.params.userId);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});


module.exports = route;
