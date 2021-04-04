// render org_id select input
const orgSelectList = document.getElementById("orgSelectList");
const peopleSelectList = document.getElementById("peopleSelectList");

const getNewCallingData = () => {

    fetch('http://localhost:5100/add-calling/', 
        {
        method: "GET" 
        }
    )
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
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

const addCalling = () => {
    const orgId = document.getElementById("orgSelectList");
    const personId = document.getElementById("peopleSelectList");
    const calling = document.getElementById("calling");
    const startDate = document.getElementById("start-date")
    const data = { 
        orgId: orgId,
        personId: personId,
        calling: calling,
        startDate: startDate       
    };
    fetch('http://localhost:5100/add-calling/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

window.onload = getNewCallingData();
  

