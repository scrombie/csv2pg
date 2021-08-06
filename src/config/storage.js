const path = require('path');
const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'tmp/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

module.exports = {
  storageConfig
}