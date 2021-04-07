const meetingsPage = document.getElementById('load');

const loadMeetings = () => {

    fetch( '/add-meeting/' )
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
        const orgs = res.data.organizations;
        const people = res.data.people;
        let orgList = `<div class="add-meeting-container">
        <h1>Add Meeting</h1><div id="meetingMessage"></div>
        <div class="add-meeting-form">
            <label for="name">Name:<br>
                <input type="text" name="name" id="name">
            </label>
            <label for="organization_id">Organization:<br>
                <select type="text" name="organization_id" id="organization_id">
                    <option value="">Please select</option>`;
        orgs.forEach(org => {
            orgList += `<option value="${org.id}">${org.organization}</option>`;
        });
        orgList +=`</select>
        </label>
        <label for="date">Date:<br>
            <input type="datetime-local" id="date" name="date">
        </label>
        <label for="duration">Duration <span class="mini-text">(minutes)</span>:<br>
            <input type="number" id="duration" name="duration" step="15" min="0" max="120">
        </label>
        <label for="instructor_id">Instructor/Leader:<br>
            <select type="text" name="instructor_id" id="instructor_id">
                <option value="">Instructor's name</option>`;
        people.forEach(person => {
            orgList += `<option value="${person.id}">${person.name}</option>`;
        });
        orgList +=`</select>
                    </label>
                    <div class="radio-group-container">
                        <label for="public">Public<br>
                            <input type="checkbox" name="public" id="public" value='1'>
                        </label>
                    </div>
                    <label for="meetingLink">MeetingLink:<br>
                        <input type="text" name="meetingLink" id="meetingLink">
                    </label>
                    <label for="moderator_id">Moderator:<br>
                        <select type="text" name="moderator_id" id="moderator_id">
                            <option value="">Moderator's name</option>`;
        people.forEach(person => {
            orgList += `<option value="${person.id}">${person.name}</option>`;
        });            
        orgList +=`</select>
                    </label>
                </div>
                <button type="button" onclick="addMeeting()">Enter</button>
            </div>`;
        meetingsPage.innerHTML=orgList;    
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

const addMeeting = () => {
    const meetingName = document.getElementById('name').value;
    const organization = parseInt(document.getElementById('organization_id').value);
    const date = document.getElementById('date').value;
    const duration = parseInt(document.getElementById('duration').value);
    const instructor = parseInt(document.getElementById('instructor_id').value);
    const public = parseInt(document.getElementById('public').value);
    const meetingLink = document.getElementById('meetingLink').value;
    const moderator = parseInt(document.getElementById('moderator_id').value);
    const data = { 
        meetingName: meetingName,
        org_id: organization,
        date: date,
        duration: duration,
        instructor_id: instructor,
        public: public,
        meetingLink: meetingLink,
        moderator_id: moderator
    };
    fetch('/add-meeting/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        document.getElementById('meetingMessage').innerHTML=data.message;
    });
        // .catch((error) => {
        // console.error('Error:', error);
}
  
