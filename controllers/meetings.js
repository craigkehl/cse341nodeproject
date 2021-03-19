const db = require('../services/db');

const { validationResult } = require('express-validator');

const Product = require('../models/meeting');

exports.postAddMeeting = (req, res, next) => {  
  const meetingName = req.body.meetingName;
  const organization = req.body.org_id;
  const date = req.body.date;
  const duration = req.body.duration;
  const instructor = req.body.instructor_id;
  const public = req.body.public;
  const meetingLink = req.body.meetingLink;
  const moderator = req.body.moderator_id;
  // const errors = req.body.errors;


  console.log(meetingName);
  console.log(organization);
  console.log(date);
  console.log(duration);
  console.log(instructor);
  console.log(public);
  console.log(meetingLink);
  console.log(moderator);
  return res.status(200).json({ message: 'Success!' });
};