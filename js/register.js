/*regular expression*/ 
var FirstNameValidation=/^[A-Za-z]{3,11}$/;
var LastNameValidation=/^[A-Za-z]{3,11}$/;
// var Email=/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z]{3,}$/;
var Email=/^[a-zA-Z0-9_]+@(gmail|yahoo|outlook|aol)+\.com$/;


// Get the input elements 
var FirstName=document.getElementById("fname");
var LastName=document.getElementById("lname");
var EmailInput=document.getElementById("email");
var Password=document.getElementById("password");

var FirstNameError=document.getElementById("fnameError");
var lastNameError = document.getElementById("lastNameError"); 
var EmailError=document.getElementById("emailError"); 
var PasswordError=document.getElementById("passwordError"); 

  // Load existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

// Add event listener to the form submission
document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Clear previous error messages
            clearErrors();

            if (validateForm()) {
                const newUser = {
                    firstName: FirstName.value,
                    lastName: LastName.value,
                    email: EmailInput.value.toLowerCase(),
                    password: Password.value
                };

                users.push(newUser);

                // Save the updated users array to local storage
                localStorage.setItem('users', JSON.stringify(users));


                 window.location.href = "login.html"; 
            }
        });
    } 
});

function validateForm() {
    var isValid = true;

    if (!FirstNameValidation.test(FirstName.value)) {
        FirstNameError.textContent = "enter a valid name";
        isValid = false;
     
    } 

    if (!LastNameValidation.test(LastName.value)) {
        lastNameError.textContent = "enter a valid name";
        isValid = false;
    } 

    if (!Email.test(EmailInput.value)) {
        EmailError.textContent = "enter a valid email";
        isValid = false;
    }
    if (users.some(user => user.email === EmailInput.value)) {
        EmailError.textContent = "Email already exists";
        isValid = false;
    }
    if (Password.value.length < 8) {
        PasswordError.textContent = "weak password";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }



    // document.getElementById("registerForm").addEventListener("submit", function(event) {
//     event.preventDefault(); 

//     // Clear previous error messages
//     clearErrors();

//     if (validateForm()) {
//         const newUser = {
//             firstName: FirstName.value,
//             lastName: LastName.value,
//             email: EmailInput.value.toLowerCase(),
//             password: Password.value
//         };

//         users.push(newUser);

//         // Save the updated users array to local storage
//         localStorage.setItem('users', JSON.stringify(users));

//         // Redirect to login page 

//        window.location.href = "login.html"; 
//     }
// });