const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const meetingController = require('../controllers/meetings');

const router = express.Router();

// /add-meeting => POST
router.post(
  '/add-meeting/',
  [
    body('meetingName')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('org_id')
      .isInt(),
    body('date')
      .isString()
      .isISO8601(),
    body('duration')
      .isInt(),
    body('instructor_id')
      .isInt(),
    body('public')
      .isBoolean(),
    body('meetingLink')
      .isString()
      .isLength({ min: 0, max: 30 })
      .trim(),
    body('moderator_id')
      .isInt()      
  ],
  meetingController.postAddMeeting
);


module.exports = router;
