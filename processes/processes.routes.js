const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')
const processescontroller = require('./processes.controller');

module.exports = router;

const getnotimplementet = async (req, res, next) => {
  res.header("Content-Type", 'application/json');
  res.json({"code": "unavailable", "description": "not  implementet yet"});
}

router.get('/', authorize(), asyncHandler(processescontroller.getProcesses));

router.get('/:processId', authorize(), asyncHandler(processescontroller.getProcess));
router.get('/:processId/jobs', authorize(), asyncHandler(getnotimplementet));
router.post('/:processId/jobs', authorize(), asyncHandler(processescontroller.postJob));

router.get('/:processId/jobs/:jobId', authorize(), asyncHandler(getnotimplementet));
router.delete('/:processId/jobs/:jobId', authorize(), asyncHandler(getnotimplementet));

router.get('/:processId/jobs/:jobId/results', authorize(), asyncHandler(getnotimplementet));
