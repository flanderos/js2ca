const loginContainer = document.querySelector(".loginsection");
const loginButton = document.querySelector(".loginbuttontop");
const firstSection = document.querySelector(".landingsection");
const navBar = document.querySelector("nav");
const hamburger = document.querySelector(".hamburgericon");
let checkForMenu = false;
const headerIcons = document.querySelector(".dnone");
const createPostContainer = document.querySelector(".profilebox");
const background = document.querySelector(".flexdiv");

// Function to toggle the mobile menu

const toggleMenu = () => {
  if (checkForMenu) {
    hideMenu();
  } else {
    showMenu();
  }
};

// Function to show the mobile menu

const showMenu = () => {
  navBar.classList.add("checked");
  navBar.style.transition = "0.5s";
  checkForMenu = true;
};

// Function to hide the mobile menu

const hideMenu = () => {
  navBar.classList.remove("checked");
  checkForMenu = false;
};

// Add a click event listener to the hamburger icon

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

// Selecting the subscribe button and defining an error pop-up function

const subscribeButton = document.querySelector(".subscribebutton");

const errorPopUp = () => {
  alert("Sorry. This does not work yet");
};

subscribeButton.addEventListener("click", errorPopUp);

const darkenBackground = () => {};

// Wait for the DOM to be fully loaded

document.addEventListener("DOMContentLoaded", () =>
  // Check if a user is logged in using the access token
  {
    const token = localStorage.getItem("accessToken");
    const loginSection = document.querySelector(".loginsection");
    const feedPage = document.getElementById("feedPage");
    const communityPage = document.getElementById("communityPage");
    const registerButtonTop = document.querySelector(".registerbuttontop");
    const profileCards = document.querySelector(".profile-card");
    const seeProfilesMessage = document.querySelector(".loginorcreate");
    const feedContainer = document.querySelector(".container");

    // Based on whether the user is logged in or not, adjust UI elements

    if (token) {
      // If logged in
      if (registerButtonTop) {
        registerButtonTop.style.backgroundColor = "grey";
      }
      if (loginSection) {
        loginSection.style.display = "none";
      }
      if (feedPage) {
        feedPage.style.display = "block";
      }
      if (communityPage) {
        communityPage.style.display = "block";
      }
      if (seeProfilesMessage) {
        seeProfilesMessage.style.display = "none";
      }
      if (feedContainer) {
        feedContainer.style.display = "block";
      }
    } else {
      // If not logged in
      if (profileCards) {
        profileCards.style.display = "none";
      }
      if (loginSection) {
        loginSection.style.display = "block";
      }
      if (feedPage) {
        feedPage.style.display = "none";
      }
      if (communityPage) {
        communityPage.style.display = "none";
      }
      if (seeProfilesMessage) {
        seeProfilesMessage.style.display = "block";
      }
      if (feedContainer) {
        feedContainer.style.display = "none";
      }
    }
  }
);
