let userName = document.querySelector("#pname");
const allUsersUrl = url + "/social/profiles";
const userUrl = url + "/social/profiles?limit=10";
const showMoreButton = document.querySelector(".showmorebutton");
const userCounter = document.querySelector(".counter");

// Initial settings for loading user profiles

let loadedProfiles = 10;
let perPage = 10;

const showMoreUrl = userUrl + "&offset=10" + perPage;

// Authorization variable for fetching data

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
  },
};

// Fetch and display user profiles

async function getUserData() {
  const profileCard = document.querySelector(".profile-card");

  const response = await fetch(
    `${userUrl}&per_page=${perPage}&offset=${loadedProfiles}`,
    options
  );
  const results = await response.json();

  console.log(results);

  for (let i = 0; i < results.length; i++) {
    let userName = results[i].name;
    let userImage = results[i].banner;
    let userEmail = results[i].email;
    let userAvatar = results[i].avatar;
    let followers = results[i]._count.followers;
    let following = results[i]._count.following;
    let posts = results[i]._count.posts;

    // Create HTML structure for each user profile

    if (profileCard) {
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
}

// Call the function to fetch and display initial user profiles

getUserData(userUrl);

// Load more user profiles function

if (showMoreButton) {
  showMoreButton.addEventListener("click", function () {
    loadedProfiles += perPage;
    getUserData();
  });
}

async function getAllUsers() {
  const response = await fetch(allUsersUrl, options);
  const results = await response.json();

  const totalUsers = results.length;

  if (userCounter) {
    userCounter.innerHTML = `${totalUsers}`;
  }
}

// Call the function to fetch and display the total number of users

getAllUsers();
