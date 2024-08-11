var cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
var User = require('./models/userModel.js'),
    Business = require('./models/businessModel.js'),
    UserBusiness = require('./models/userBusinessModel.js'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require('jsonwebtoken');

var generateGUID = require('./utils.js').generateGUID;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
const port = 8080;


const mongoUri = process.env.MONGODBURI || 'mongodb://172.27.77.122:27017/'

mongoose.connect(mongoUri, {
    socketTimeoutMS: 30000,
}).then(() => {
    console.log("Connected too mongo db.");
}, err => {
    console.log("Something went wrong while connecting mongo DB.");
    throw err;
});

app.use(function(req, res, next) {
    console.log("in app.use middleware")
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        else req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

// request/response logger
app.use(function (req, res, next) {
    req.headers['x-request-id'] = req.headers['x-request-id'] ?? generateGUID();
    res.set({
        'x-request-id': req.headers['x-request-id'],
    })
    var requestStartTime = Date(Date.now()).toString();
    next();

    // TODO: redact auth token.
    console.log({
        'x-request-id': req.headers['x-request-id'],
        time: requestStartTime,
        request: req.body,
        reqHeaders: req.headers,
        res: res.body,
        statusCode: res.statusCode,
        resHeaders: res.headers,
    })
})

var routes = require('./routes/routes.js');
routes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 * TODO:
 * 1. write a script to update the encrypted mongoDB data to github (use a new branch "data").
 *      a. this should also pull the data and decrypt the data and restart the mongoDB with new snapshot.
 * 2. write github action to deploy this whole setup in vercel.
 * 3. update logging capability with request ids, truncating the auth details, etc.
 */