const url = "https://api.noroff.dev/api/v1";
const socialUrl = `${url}/social/auth/register`;

const regButton = document.querySelector(".submitregbutton");

const nameInput = document.querySelector(".nameinput");
const emailInput = document.querySelector(".emailreginput");
const nameError = document.querySelector(".usernameerror");
const emailError = document.querySelector(".emailerror");
const passwordError = document.querySelector(".passworderror");
const passwordInput = document.querySelector("#passwordregform");

function isNoroffEmail(email) {
  return email.endsWith("@stud.noroff.no");
}

function registerUser() {
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  const userData = {
    name: userName,
    email: userEmail,
    password: userPassword,
  };

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

function validateForm(event) {
  if (event) {
    event.preventDefault();

    if (nameInput.value.trim().length > 1) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    if (validateName(nameInput.value) === true) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    if (validateEmail(emailInput.value) === true) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }

    if (passwordInput.value.trim().length > 6) {
      passwordError.style.display = "none";
    } else {
      passwordError.style.display = "block";
    }

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

regButton.addEventListener("click", validateForm);

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches && email.endsWith("@stud.noroff.no");
}

function validateName(nameInput) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const patternMatchesName = nameRegex.test(nameInput);
  return patternMatchesName;
}

//login

const emailInputForLogin = document.querySelector("#emailinput");
const passwordInputForLogin = document.querySelector("#passwordinput");
const loginButtonForUsers = document.querySelector("#submitlogin");

const registeredUserEmail = emailInputForLogin.value;
const registeredUserPassword = passwordInputForLogin.value;

const loginUser = () => {
  console.log("knappen fungerer");
};

loginButtonForUsers.addEventListener("click", loginUser);
