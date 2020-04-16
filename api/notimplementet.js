const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')

module.exports = router;

const getnotimplementet = async (req, res, next) => {
  res.header("Content-Type", 'application/json');
  res.json({"code": "unavailable", "description": "not  implementet yet"});
}

router.get('/', authorize(), asyncHandler(getnotimplementet));
