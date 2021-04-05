const orgSelectList = document.getElementById("orgSelectList");
const peopleSelectList = document.getElementById("peopleSelectList");

const getNewMeetingData = () => {

    fetch('/add-meeting/', 
        {
        method: "GET" 
        }
    )
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
        console.log(res);
        const orgs = res.data.organizations;
        const people = res.data.people;
        let orgList = '';
        orgs.forEach(org => {
            orgList += `<option value="${org.id}">${org.organization}</option>`;
        }); 
        orgSelectList.innerHTML += orgList;
        let peopleList = '';
        people.forEach(person => {
            peopleList += `<option value="${person.id}">${person.name}</option>`;
        });
        peopleSelectList.innerHTML += peopleList;
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
    });
        // .catch((error) => {
        // console.error('Error:', error);
}
  