const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')

module.exports = router;

const getnotimplementet = async (req, res, next) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, `conformance.json`));
}

router.get('/', authorize(), asyncHandler(getnotimplementet));
