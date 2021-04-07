// the view for add calling
const mainContainer2 = document.getElementById('load');
const loadCallings = () => {
    let callingPage = `
    <div class="add-person-container">
        <h1>Add Calling</h1><div id="callingMessage"></div>
        <div class="add-person-form"> 
            <label for="orgSelectList">Organization:<br>
                <select type="text" name="orgSelectList" id="orgSelectList">
                    <option value="">Please select</option>`;
    fetch('/add-calling/')
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
        const orgs = res.data.organizations;
        const people = res.data.people;
        
        orgs.forEach(org => {
            callingPage += `<option value="${org.id}">${org.organization}</option>`;
        }); 
        callingPage += `</select>
            </label>
            <label for="peopleSelectList">Person:<br>
                <select type="text" name="peopleSelectList" id="peopleSelectList">
                    <option value="">Please select</option>`;
        people.forEach(person => {
            callingPage += `<option value="${person.id}">${person.name}</option>`;
        });
        callingPage += `</select>
                            </label>
                            <label for="calling">Calling:<br>
                                <input type="text" name="calling" id="calling">
                            </label>
                            <label for="start-date">Date called:<br>
                                <input type="date" id="start-date" name="start-date">
                            </label> 
                            <label for="release-date">Release Date (if known):<br>
                                <input type="date" id="release-date" name="release-date">
                            </label> 
                        </div>
                        <button type="button" onclick="addCalling()">Enter</button>
                    </div>
                    `
        mainContainer2.innerHTML=callingPage;            
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

const addCalling = () => {
    const orgId = document.getElementById("orgSelectList").value;
    const personId = document.getElementById("peopleSelectList").value;
    const calling = document.getElementById("calling").value;
    const startDate = document.getElementById("start-date").value;
    const releaseDate = document.getElementById("release-date").value;
    const data = { 
        orgId: orgId,
        personId: personId,
        calling: calling,
        startDate: startDate,     
        releaseDate: releaseDate       
    };
    console.log(data);
    fetch('/add-calling/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
            document.getElementById('callingMessage')
            .innerHTML = "Success: The calling has been Assigned."
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}
