
function loginValidation(event) {
    event.preventDefault(); 

    clearErrors();


    // Get input values
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");


    var emailError=document.getElementById("loginEmailError");
    var passwordError=document.getElementById("loginPasswordError");


// Load users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email.toLowerCase() === emailInput.value.toLowerCase());

    if (!user) {
        emailError.textContent = 'email not found';
       return false; 
    }
    
    if (user.password !== passwordInput.value) {
        passwordError.textContent = 'Incorrect password';
        return false;
    }


    sessionStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
     }));


     window.location.href = "index.html"; // Redirect to the home page after successful login
     return true; 
}




function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }