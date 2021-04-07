const peopleView = document.getElementById('load');

const personView =`<div class="add-person-container">
<h1>Add Person</h1><div id='personMessage'></div>
<div class="add-person-form">
    <label for="fname">First Name:<br>
        <input type="text" name="fname" id="fname">
    </label>
    <label for="lname">Last Name:<br>
        <input type="text" name="lname" id="lname">
    </label>
    <label for="gender">Gender:<br>
        <select type="text" name="gender" id="gender">
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
    </label>
    <label for="birthday">Birthday:<br>
        <input type="datetime-local" id="birthday" name="birthday">
    </label> <label for="mobile">Mobile:<br>
        <input type="tel" name="mobile" id="mobile" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
    </label>
    <label for="email">Email:<br>
        <input type="email" name="email" id="email">
    </label>
    <label for="access">Access (for official use only):<br>
        <input type="text" name="access" id="access">
    </label>
</div>
<button type="button" onclick="addperson()">Enter</button>
</div>`;

const loadPeople = () => peopleView.innerHTML=personView;

const addperson = () => {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const access = document.getElementById('access').value;
    const data = { 
        fname: fname,
        lname: lname,
        gender: gender,
        birthday: birthday,
        mobile: mobile,
        email: email,
        access: access
    };
    fetch('add-person/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log({"Success": data});
        document.getElementById('personMessage').innerHTML=data.message;
        });
        // .catch((error) => {
        // console.error('Error:', error);
}
  
