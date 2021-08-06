const Joi = require('joi');

const validateJSONString = Joi.extend({
  type: 'array',
  base: Joi.array(),
  coerce: {
    from: 'string',
    method(value, helpers) {
      if (value[0] !== '[' &&
        !/^\s*\[/.test(value)) {
        return;
      }
      try {
        return { value: JSON.parse(value) };
      }
      catch (err) {console.log(err) }
    }
  }
}).extend(({
  type: 'object',
  base: Joi.object(),
  coerce: {
    from: 'string',
    method(value, helpers) {
      if (value[0] !== '{' &&
        !/^\s*\{/.test(value)) {
        return;
      }
      try {
        return { value: JSON.parse(value) };
      }
      catch (err) {console.log(err) }
    }
  }
}));

module.exports = {
  validateJSONString
}