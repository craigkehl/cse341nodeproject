const loginPage = document.getElementById('load');

const loginView =`<div class="login-container">
<h1>Login</h1><div id='loginMessage'></div>
<div class="add-person-form">
    <label for="email">Email:<br>
        <input type="email" name="email" id="email">
    </label>
    <label for="password">Password:<br>
        <input type="password" name="password" id="password">
    </label>
</div>
<button type="button" onclick="login()">Login</button>
<br>
<h3>Need to Sign Up first?</h3>
<button onclick="loadSignup()">Sign Up</button
</div>
`;

const loadLogin = () => loginPage.innerHTML=loginView;

const login = () => {
    const email = document.getElementById('email').value;
    const access = document.getElementById('password').value;
    const data = {
        email: email,
        password: password
    };
    fetch('https://cse341proj2.herokuapp.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log({"Success": data});
        document.getElementById('loginMessage').innerHTML=data.message;
        document.getElementById('access').innerText="Logout";
        });
        // .catch((error) => {
        // console.error('Error:', error);
}