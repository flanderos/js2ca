const nameInput = document.querySelector(".nameinput");
const registerButton = document.querySelector(".submitregbutton");
const emailInput = document.querySelector(".emailreginput");
const nameError = document.querySelector(".usernameerror");
const emailError = document.querySelector(".emailerror");
const passwordError = document.querySelector(".passworderror");
const passwordInput = document.querySelector("#passwordregform");

registerButton.addEventListener("click", validateForm);

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
      messageInput.value.trim().length > 9 &&
      validateEmail(emailInput.value) === true &&
      subjectInput.value.trim().lenght > 1 &&
      passwordInput.value.trim().length > 6
    ) {
      success.style.display = "block";
    } else {
      success.style.display = "none";
    }
  }
}

validateForm();

registerButton.addEventListener("click", validateForm);

function validateEmail(emailInput) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(emailInput);
  return patternMatches;
}

function validateName(nameInput) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const patternMatchesName = nameRegex.test(nameInput);
  return patternMatchesName;
}
