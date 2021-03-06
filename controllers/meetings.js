
const { validationResult } = require('express-validator');

const db = require('../services/db');
const Meeting = require('../models/meeting');
const Person = require('../models/person');
const Organization = require('../models/organization');
const Calling = require('../models/calling');
const Broadcast = require('../models/broadcast');

// *** Public Meeting routesn ***
exports.getCurrentPublicMeetings = (req, res, next) => {
  Meeting.fetchAllPublicCurrent()
  .then((meetingList) => {
    res.status(200).json({ data: meetingList.rows});
  }) 
  .catch(err => {
    res.status(401).json({ 
      message: "Error: Meetings not retrieved.",
      data: err });
  });
}

// meetings require orgs and people to be scheduled
exports.getAddMeeting = (req, res, next) => {
  const data = {};
  debugger
  Organization.fetchAllOrgs()
    .then((orgs) => {
      data.organizations = orgs.rows;
    })
    .then(() => Person.fetchAllPersonsList()) //update to only instructors/leaders
    .then((peopleList) => {
      data.people = peopleList.rows;
    }) 
    .then(() => {
      res.status(200).json({ data: data });
    })
    .catch(err => {
      res.status(404).json({ data: err});
    })
}

exports.getAllMeetings = (req, res, next) => {
  Meeting.fetchAll() 
    .then((meetingList) => {
      res.status(200).json({ data: meetingList.rows});
    }) 
    .catch(err => {
      res.status(401).json({ 
        message: "Error: Meetings not retrieved.",
        data: err });
    });
} 

exports.getAllCurrentMeetings = (req, res, next) => {
  Meeting.fetchAllCurrent() 
    .then((meetingList) => {
      res.status(200).json({ data: meetingList.rows});
    }) 
    .catch(err => {
      res.status(401).json({ 
        message: "Error: Meetings not retrieved.",
        data: err });
    });
} 

exports.getAllPublicCurrentMeetings = (req, res, next) => {
  Meeting.fetchAllPublicCurrent() 
    .then((meetingList) => {
      res.status(200).json({ data: meetingList.rows});
    }) 
    .catch(err => {
      res.status(401).json({ 
        message: "Error: Meetings not retrieved.",
        data: err });
    });
} 

exports.postAddMeeting = (req, res, next) => {  
  const meetingName = req.body.meetingName;
  const date = req.body.date;
  const duration = req.body.duration;
  const is_public = req.body.public;
  const orgId = req.body.org_id;
  const meetingLink = req.body.meetingLink;
  const moderator_id = req.body.moderator_id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      message: 'Validation failed. Please enter the data correctly',
      errors: errors.array()
    });
  }
 
  const meeting = new Meeting(meetingName, date, duration, is_public, orgId);
  meeting.save()
  .then(meeting => {
    if (moderator_id) {
      const b = new Broadcast(meeting.rows[0].meeting_id, moderator_id, meetingLink, 1);
      console.log(b);
      b.save()
      .then(broadcast => {
        if(broadcast) {
          return res.status(201).json({ 
            message: 'Your meeting has been added.',
            data: broadcast.rows[0]
          }); 
        } else {
          return res.status(201).json({ 
            message: 'Your meeting has been added but not the broadcast.',
            data: meeting.rows[0]
        }); 
        }
      })
      .catch(err => {
        console.error(err);
        return res.status(401).json({
          message: 'Your meeting was not added.',
          error: err
        });    
      });
    }
  })
  .catch(err => {
    console.error(err);
    return res.status(401).json({
      message: 'Your meeting was not added.',
      error: err
    });    
  });
}


// broadcasts
exports.getAddBroadcast = (req, res, next) => {
  
  Person.fetchAllPersonsList()
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch(err => {
      if (err) {
        console.error(err);
        res.status(401).json({
          message: "Data error. Please try again later.",
          error: err
        });
      }
    })
} 

exports.getAllBroadcasts = (req, res, next) => {
  Broadcast.fetchAll() 
    .then((broadcastList) => {
      data = broadcastList.rows;
    }) 
    .then(() => {
      res.status(200).json({ data: data })
    });
} 

exports.getBroadcastById = (req, res, next) => {
  const id = req.params.id;
  Broadcast.fetchById(id) 
    .then(result => {
      data = result.rows[0];
    }) 
    .then(() => {
      res.status(200).json({ data: data })
    });
} 

exports.postAddBroadcast = (req, res, next) => {  
  const meetingId = req.body.meeting_id;
  const meetingLink = req.body.meetingLink;
  const moderatorId = req.body.moderator_id;
  const providerId = req.body.provider_id;

  // check validataion
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      message: 'Validation failed. Please enter the data correctly',
      errors: errors.array()
    });
  }

  const broadcast = new Broadcast (meetingId, moderatorId, meetingLink, providerId);
  debugger
  broadcast.save()
  .then((result) => {
      res.status(201).json('Your broadcast has been added.');
  }).catch(err => {
    console.log(err);
    res.status(401).json('Your broadcast was not added.');
  });
}


exports.deleteBroadcastById = (req, res, next) => {
  debugger
  const id = req.params.id;
  Broadcast.deleteById(id) 
  .then(result => {
    if (result.rowCount == 1) {
      res.status(200).json({ message: 'The broadcast has been deleted' });
    } else {
      res.status(401).json({ 
        message: 'The broadcast record to delete could not be found by the id you sent.'
      });
    }
    
  }) 
  .catch(err => {
    console.log(err);
    res.status(401).json({ 
      message: 'Your broadcast was not deleted.',
      error: err 
    });
  });
} 