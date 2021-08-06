const express = require('express');
const { dsController } = require('../../controllers/');
const { csvUploader, rollbackUpload } = require('../../utils/helpers');
const validate = require('../../middlewares/validate');
const { dataSourceValidation } = require('../../validations/');

const router = express.Router();

router
  .route('/')
  .get(dsController.getDataSources)
  .post(csvUploader.single('data-source'), validate(dataSourceValidation.createDataSource, rollbackUpload), dsController.createDataSource);

module.exports = router;