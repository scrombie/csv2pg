const Joi = require('joi');
const { validateJSONString } = require('./custom.validations');

const createDataSource = {
  body: Joi.object({
    source_name: Joi.string().required().pattern(/^[a-z0-9A-Z]+(?:_[a-z0-9A-Z]+)*$/),
    schema: validateJSONString.array().items(Joi.object({
      key: Joi.string().required().pattern(/^[a-z0-9A-Z]+(?:_[a-z0-9A-Z]+)*$/), //add custom validation to remove spaces and special characters (only underscore)
      type: Joi.string().required().valid('string','longtext','integer','date','money','float','bool')
    })).required()
  })  
}

module.exports = {
  createDataSource
}