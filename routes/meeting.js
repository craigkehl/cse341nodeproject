const path = require('path');

const express = require('express');
const { body, param } = require('express-validator');

const meetingController = require('../controllers/meetings');

const router = express.Router();

// *** meetings ***//
router.get('/add-meeting', meetingController.getAddMeeting);

router.get('/meetings', meetingController.getAllMeetings);

router.get('/get')

router.post(
  '/add-meeting/',
  [
    body('meetingName')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('date')
      .isString()
      .isISO8601(),
    body('duration')
      .isInt(),
    body('org_id')
      .isInt(),
    body('public').isBoolean()
  ],
  meetingController.postAddMeeting
);


// *** broadcasts ***//
router.get('/add-broadcast', meetingController.getAddBroadcast);

router.get('/broadcast/:id', 
  param('id').isInt(),
  meetingController.getBroadcastById);

router.get('/broadcasts', meetingController.getAllBroadcasts);

router.post(
  '/add-broadcast/',
  [
    body('meeting_id').isInt(),
    body('moderator_id').isInt(),
    body('provider_id').isInt(),
    body('meetingLink')
      .isString()
      .isLength({ min: 0, max: 30 })
      .trim()
  ],
  meetingController.postAddBroadcast
);

router.delete('/broadcast:id', 
param('id').isInt(),
meetingController.deleteBroadcastById);


// *** assignments ***//
//router.get('/add-assignment/', meetingController.getAddAssignment);



module.exports = router;
