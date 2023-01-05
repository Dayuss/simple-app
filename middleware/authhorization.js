const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtMiddleware = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.APP_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).json({
                    status: 1,
                    message: "Token mismatch!"
                });
            } else {
                const decode = jwt.decode(bearerToken);
                res.locals.userId = decode.userId;
                res.locals.email = decode.email;
                next();
            }
        });
    } else {
        return res.status(401).json({
            status: 1,
            message: "Forbidden access!"
        });
    }
};

module.exports = {
    jwtMiddleware,
};