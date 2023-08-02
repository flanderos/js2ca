let userName = document.querySelector("#pname");
const userUrl = url + "/social/profiles?limit=10";
const showMoreButton = document.querySelector(".showmorebutton");

let loadedProfiles = 10;
let perPage = 10;

const showMoreUrl = userUrl + "&offset=10" + perPage;

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxNywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTA5MDg5ODl9.gXu4Fd5WLUIQBCtiM8hMNUrHAExW1ONYdqKecL_Z--Y",
  },
};

async function getUserData(pageNumber) {
  const profileCard = document.querySelector(".profile-card");
  const cardProfileImage = document.querySelector(".profile-image");
  const cardUserName = document.querySelector("#username");

  const response = await fetch(
    `${userUrl}&per_page=${perPage}&offset=${loadedProfiles}`,
    options
  );
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let userName = results[i].name;
    let userImage = results[i].banner;
    let userEmail = results[i].email;
    let userAvatar = results[i].avatar;
    let followers = results[i]._count.followers;
    let following = results[i]._count.following;
    let posts = results[i]._count.posts;

    profileCard.innerHTML += `<div class="profilebox"><img class="profile-image" src="${userImage}" onerror="this.src='/images/placeholderimg.png'" alt="profilepicture" />
    <h2 class="username" id="username">${userName}</h2>
    <p class="userfollowers" id="userdata">Followers:${followers}</p>
    <p class="userfollwing" id="userdata">Following: ${following}</p>
    <p class="userposts" id="userdata">Posts: ${posts}</p>
    <p class="useremail" id="userdata">${userEmail}</p>
    <button class="follow" type="button" id="follow">Follow</button></div>
    `;
  }
}

getUserData(userUrl);

showMoreButton.addEventListener("click", function () {
  loadedProfiles += perPage;
  getUserData();
});
