const titleInput = document.querySelector("#posttitle");
const textInput = document.querySelector("#posttext");
const tagInput = document.querySelector("#tags");
const mediaInput = document.querySelector("#postmedia");
const titleError = document.querySelector(".titleerror");
const textError = document.querySelector(".texterror");
const tagError = document.querySelector(".tagerror");
const createPostButton = document.querySelector(".createpostlink");

const validatePosting = (event) => {
  if (event) {
    event.preventDefault();

    if (
      titleInput.value.trim().length >= 2 &&
      titleInput.value.trim().length <= 25
    ) {
      titleError.style.display = "none";
    } else {
      titleError.style.display = "block";
    }

    if (
      textInput.value.trim().length >= 2 &&
      textInput.value.trim().length <= 250
    ) {
      textError.style.display = "none";
    } else {
      textError.style.display = "block";
    }

    if (
      tagInput.value.trim().length >= 2 &&
      tagInput.value.trim().length <= 25
    ) {
      tagError.style.display = "none";
    } else {
      tagError.style.display = "block";
    }

    if (
      titleInput.value.trim().length >= 2 &&
      titleInput.value.trim().length <= 25 &&
      textInput.value.trim().length >= 2 &&
      textInput.value.trim().length <= 250 &&
      tagInput.value.trim().length >= 2 &&
      tagInput.value.trim().length <= 25
    ) {
      console.log("Validering vellykket. Innlegg kan opprettes.");
    } else {
      console.log(
        "Validering mislyktes. Vennligst fyll ut alle feltene riktig."
      );
    }
  }
};

createPostButton.addEventListener("click", validatePosting);
