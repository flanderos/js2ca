const url = "https://api.noroff.dev/api/v1";
const socialUrl = `${url}/social/auth/register`;

const regButton = document.querySelector(".submitregbutton");

const nameInput = document.querySelector(".nameinput");
const emailInput = document.querySelector(".emailreginput");
const nameError = document.querySelector(".usernameerror");
const emailError = document.querySelector(".emailerror");
const passwordError = document.querySelector(".passworderror");
const passwordInput = document.querySelector("#passwordregform");

// Function to check if the email is a Noroff email

function isNoroffEmail(email) {
  return email.endsWith("@stud.noroff.no") || email.endsWith("@noroff.no");
}

// Function to register the user

function registerUser() {
  const directToLoginMessage = document.querySelector(".directtologinmessage");
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  // Display the direct to login message

  directToLoginMessage.style.display = "block";

  const userData = {
    name: userName,
    email: userEmail,
    password: userPassword,
  };

  // Send a POST request to register the user

  fetch(socialUrl, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Registration successful:", data);
    })
    .catch((error) => {
      console.error("Error registering user:", error);
    });
}

// Function to validate the registration form

function validateForm(event) {
  if (event) {
    event.preventDefault();

    // Validate name input

    if (nameInput.value.trim().length > 1) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    // Validate name format

    if (validateName(nameInput.value) === true) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    // Validate email format

    if (validateEmail(emailInput.value) === true) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }

    // Validate password length

    if (passwordInput.value.trim().length > 6) {
      passwordError.style.display = "none";
    } else {
      passwordError.style.display = "block";
    }

    // Validate all criteria before registering

    if (
      nameInput.value.trim().length > 0 &&
      validateEmail(emailInput.value) === true &&
      passwordInput.value.trim().length > 6 &&
      isNoroffEmail(emailInput.value)
    ) {
      registerUser();
    } else {
      console.log(
        "Validering mislyktes. Vennligst fyll ut alle feltene riktig."
      );
    }
  }
}

validateForm();

if (regButton) {
  regButton.addEventListener("click", validateForm);
}

// Function to validate email format

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches && email.endsWith("@stud.noroff.no");
}

// Function to validate name format

function validateName(nameInput) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const patternMatchesName = nameRegex.test(nameInput);
  return patternMatchesName;
}

//login

const emailInputForLogin = document.querySelector("#emailinput");
const passwordInputForLogin = document.querySelector("#passwordinput");
const loginButtonForUsers = document.querySelector("#submitlogin");
const loginForm = document.querySelector(".loginform");
const loginError = document.querySelector(".loginerror");

// Flag to track user login status

let isUserLoggedIn = false;

// Function to update header buttons based on login status

const updateHeaderButtons = () => {
  const loginButton = document.querySelector(".loginbuttontop");
  const logoutButton = document.querySelector(".logoutButton");

  // Update button visibility based on user login status

  if (isUserLoggedIn) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  }
};

// Function to handle user login

const loginUser = (event) => {
  event.preventDefault();

  // Get user's email and password from input fields

  const userEmail = emailInputForLogin.value;
  const userPassword = passwordInputForLogin.value;

  // Prepare user data for login

  const userData = {
    email: userEmail,
    password: userPassword,
  };

  const loginUrl = "https://api.noroff.dev/api/v1/social/auth/login";

  // Send POST request to log in the user

  fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const accessToken = data.accessToken;
      console.log("Login successful. Access Token:", accessToken);

      // Store access token in localStorage

      localStorage.setItem("accessToken", accessToken);

      // Redirect user to the blog page

      window.location.href = "blog.html";
    })
    .catch((error) => {
      console.error("Error logging in user:", error);

      // Display login error message

      loginError.style.display = "block";
    });
};

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}
