
const nodemailer = require("nodemailer")
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dayusmaan@gmail.com',
      pass: 'FaUKkYsxywrztXBP',
    },
});

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


const sendForgotPassword = async (to, password) => {
    let appDir = path.dirname(require.main.filename);

    readHTMLFile(appDir + '/public/forgot.html', function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            password: password,
        };

        const htmlToSend = template(replacements);

        let mailOptions = {
            from: 'SimpleApp <no-reply@simple-app.id>',
            to: to,
            subject: "Reset Password",
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('error email');
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            console.log(transporterCampaign)
        });
    });

    return true
}



module.exports = {
    sendForgotPassword,
};