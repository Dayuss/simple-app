const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./router')
 const bodyParser = require('body-parser');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));


const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')
    console.error(error,"ERROR")
    response.status(error.code || 500).json(error)
}


const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(express.static(__dirname + '/public/files'));
app.use(cors(options));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(router);
app.use(errorResponder)

app.listen(port, '0.0.0.0', () => {
    console.log(`Simple app listening at http://localhost:${port}`)
})