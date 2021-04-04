const addperson = () => {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const access = document.getElementById('access').value;
    const data = { 
        fname: fname,
        lname: lname,
        gender: gender,
        birthday: birthday,
        mobile: mobile,
        email: email,
        password: password,
        access: access
    };
    fetch('/add-person/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log({"Success": data});
        });
        // .catch((error) => {
        // console.error('Error:', error);
}
  
