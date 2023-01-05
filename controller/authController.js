const route = require('express').Router();
const authService = require('../services/authService');
const response = require("../helper/responseHelper");

const {
    check,
    validationResult
} = require('express-validator');

// route.get('/section', 
//     async (req, res, next) => {
//     try{
//         let data = await courseService.getList();
//         return res.status(data.code).json({
//             status: 0,
//             ... data,
//         });
//     }catch(e){
//         next(e)
//     }
// });

route.post('/',
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

        let data = await authService.login(req.body);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});

route.post('/register',
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

        let data = await authService.register(req.body);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});

route.post('/reset-password',
    check('email').not().isEmpty().withMessage('Email harus diisi.'),
    async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            throw response({
                code: 400,
                msg: errors.array()
            })

        let data = await authService.resetPassword(req.body.email);
        return res.status(data.code).json(data);
    }catch(e){
        next(e)
    }
});


module.exports = route;
