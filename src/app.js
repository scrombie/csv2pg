const fs = require('fs');
const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1/');
const ApiError = require('./utils/ApiError');
const { errorHandler, errorConverter } = require('./middlewares/error');

const app = express();

// parse request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//enable cors
app.use(cors());
app.options('*', cors());

//setup routes
app.use('/v1', routes);

app.get('/test', (req, res) => {
  console.log("testing...1...2");
  res.status(httpStatus.OK).send("It's alive!!");
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert to ApiError
app.use(errorConverter);

// handle error
app.use(errorHandler);

// create temporary folder for storing csv
var dir = 'tmp/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

module.exports = app;