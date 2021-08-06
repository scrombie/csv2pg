const fs = require('fs');
const multer = require('multer');
const copyFrom = require('pg-copy-streams').from;
const { storageConfig } = require('../config/storage');

const DATA_TYPE_MAP = {
  'string':'VARCHAR(50)',
  'longtext':'TEXT',
  'integer':'INTEGER',
  'float':'DECIMAL',
  'money':'MONEY',
  'date':'TIMESTAMP',
  'bool':'boolean'
}

const csvUploader = multer({storage: storageConfig, fileFilter: function(req, file, cb) {
  // Accept csv only
  if (!file.originalname.match(/\.(csv)$/) || !file.mimetype.includes("csv")) {
      req.fileValidationError = 'Only csv files are allowed!';
      return cb(new Error('Only csv files are allowed!'), false);
  }
  cb(null, true);
}});

const copyFromCSV = (client, filePath, tableName) => new Promise((resolve, reject) => {  
  const stream = client.query(copyFrom(`COPY ${tableName} FROM STDIN WITH DELIMITER ',' CSV HEADER NULL AS '';`))
  const fileStream = fs.createReadStream(filePath, "utf8")
  fileStream.on('error', reject)  
  stream.on('error', reject)
  fileStream.on('data', (d) => console.log(d));
  stream.on('finish', resolve)
  fileStream.pipe(stream)
});

const rollbackUpload = (input) => {
  if(!input){
    return;
  }
  let path;
  if (typeof input === 'string' || input instanceof String){
    path = input;
  }else if(input.file) {
    path = input.file.path;
  }
  // delete file
  fs.unlink(path, (err) => console.log(err || ''));
}


/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
 const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};


module.exports = {
  DATA_TYPE_MAP,
  csvUploader,
  copyFromCSV,
  rollbackUpload,
  pick
}
