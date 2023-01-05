const router = require('express').Router();
const {jwtMiddleware} = require('../middleware/authhorization')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/auth', require("../controller/authController"))
router.use('/users', jwtMiddleware, require("../controller/userController"))
module.exports = router;