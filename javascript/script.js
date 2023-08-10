const loginContainer = document.querySelector(".loginsection");
const loginButton = document.querySelector(".loginbuttontop");
const firstSection = document.querySelector(".landingsection");
const navBar = document.querySelector("nav");
const hamburger = document.querySelector(".hamburgericon");
let checkForMenu = false;
const headerIcons = document.querySelector(".dnone");
const createPostContainer = document.querySelector(".profilebox");
const background = document.querySelector(".flexdiv");

const toggleMenu = () => {
  if (checkForMenu) {
    hideMenu();
  } else {
    showMenu();
  }
};

const showMenu = () => {
  navBar.classList.add("checked");
  navBar.style.transition = "0.5s";
  checkForMenu = true;
};

const hideMenu = () => {
  navBar.classList.remove("checked");
  checkForMenu = false;
};

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

const subscribeButton = document.querySelector(".subscribebutton");

const errorPopUp = () => {
  alert("Sorry. This does not work yet");
};

subscribeButton.addEventListener("click", errorPopUp);

const darkenBackground = () => {};
