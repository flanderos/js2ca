const loginContainer = document.querySelector(".loginsection");
const loginButton = document.querySelector(".loginbuttontop");
const firstSection = document.querySelector(".landingsection");

const showLogin = () => {
  loginContainer.style.transform = "translateX(0)";
  if ((loginContainer.style.right = "0")) {
    loginButton.style.cursor = "default";
    loginButton.style.backgroundColor = "grey";
    firstSection.style.opacity = "15%";
  }
};

loginButton.addEventListener("click", showLogin);

const url = "https://api.noroff.dev/api";
