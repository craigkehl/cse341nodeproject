const express = require('express');
const { body, param } = require('express-validator');

const meetingController = require('../controllers/meetings');

const router = express.Router();


// *** Public ****
router.get('/meetings/current', meetingController.getCurrentPublicMeetings)


module.exports = router;