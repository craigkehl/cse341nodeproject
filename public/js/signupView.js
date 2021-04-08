const signupPage = document.getElementById('load');

const signupView =`<div class="signup-container">
<h1>Sign UP</h1><div id='signupMessage'></div>
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
    <label for="email">Email:<br>
        <input type="email" name="email" id="email">
    </label>
    <label for="password">Password (for official use only):<br>
        <input type="password" name="password" id="password">
    </label>
</div>
<button type="button" onclick="signup()">Sign Up</button>
</div>`;

const loadSignup = () => signupPage.innerHTML=signupView;

const signup = () => {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { 
        fname: fname,
        lname: lname,
        gender: gender,
        email: email,
        password: password
    };
    console.log(data);
    debugger
    fetch('https://cse341proj2.herokuapp.com/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log({"Success": data});
        document.getElementById('signupMessage').innerHTML=data.message;
        })
        .catch((error) => {
            console.error(error);
        });
}