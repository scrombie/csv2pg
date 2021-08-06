const httpStatus = require('http-status');
const { dsService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getDataSources = (req, res) => {  
  res.status(httpStatus.OK).send("Returns all datasources");
};

const createDataSource = catchAsync(async (req, res) => {
  console.log("CREATE DATA SOURCE");
  // receive req i.e 'data-source' is the fieldname for the file input
  const file = req.file;
  // validate
  if(!file) {
    throw new Error("Please select a csv data-source");
  }
  
  const schema = req.body.schema;

  // pass to service to create in db
  const dataSource = await dsService.createDataSource(file.path, req.body.source_name, schema);
  // return response
  res.status(httpStatus.CREATED).send({
    "message":`Upload Successful! ${dataSource.length} rows created.`
  });
});

module.exports = {
  getDataSources,
  createDataSource
}