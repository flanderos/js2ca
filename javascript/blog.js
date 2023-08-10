const blogFeed = document.querySelector(".container");
const blogPost = document.querySelector(".postbox");
const postTags = document.querySelector(".posttags");
const postTitle = document.querySelector(".postpreviewheading");
const postCreator = document.querySelector(".postcreator");
const postDate = document.querySelector(".postdatetime");
const postContent = document.querySelector(".postpreviewtext");
const likeCounter = document.querySelector(".likecounter");
const dislikeCounter = document.querySelector(".dislikecounter");
const dislikeButton = document.querySelector(".thumbsdown");
const loadMorePostsButton = document.querySelector(".loadmorebutton");

let currentPage = 1;
const postsPerPage = 10;

const blogPostsUrl = url + "/social/posts?limit=10";

const allPostsUrl = url + "/social/posts";

async function getBlogPosts() {
  const response = await fetch(blogPostsUrl, options);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let postId = results[i].id;
    let tags = results[i].tags;
    let title = results[i].title;
    let date = results[i].created;
    let body = results[i].body;
    let media = results[i].media;
    let reactions = results[i]._count.reactions;
    let comments = results[i]._count.comments;

    if (blogFeed) {
      blogFeed.innerHTML += `
    <div class="container">
  <div class="postbox" data-post-id="${results[i].id}">
    <div class="posttags">
      <div class="tag">${tags}</div>
    </div>
    <div class="postId">${results[i].id}</div>
    <h2 class="postpreviewheading">${title}</h2>
    <div class="postcreator"></div>
    <div class="postdatetime">${date}</div>
    <div class="postmedia">
      <img class="postmedia" src="${media}" onerror="this.src='/images/mediaplaceholder.png'">
    </div>
    <p class="postpreviewtext">
      ${body}
    </p>
    <div class="reactions">
      <div class="likecounter">${reactions}</div>
      <button class="thumbsup" id="posticons" data-post-id="${results[i].id}">
        Like<i class="fa-solid fa-thumbs-up"></i>
      </button>
      <div class="comments">
        <button class="commentbutton" id="posticons">
          Comment<i class="fa-solid fa-comment"></i>
        </button>
      </div>
      <button class="deletebutton">
        Delete<i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</div>`;
    }
  }
}

getBlogPosts();

const loadMorePosts = async () => {
  currentPage++;
  const nextPageUrl = `${blogPostsUrl}&offset=${
    (currentPage - 1) * postsPerPage
  }&limit=${postsPerPage}`;

  try {
    const response = await fetch(nextPageUrl, options);
    const results = await response.json();

    if (results.length === 0) {
      console.log("Ingen flere innlegg å laste.");
      return;
    }

    for (let i = 0; i < results.length; i++) {
      let tags = results[i].tags;
      let title = results[i].title;
      let date = results[i].created;
      let body = results[i].body;
      let media = results[i].media;
      let reactions = results[i]._count.reactions;
      let comments = results[i]._count.comments;

      blogFeed.innerHTML += `
      <div class="container">
  <div class="postbox" data-post-id="${results[i].id}">
    <div class="posttags">
      <div class="tag">${tags}</div>
    </div>
    <div class="postId">${results[i].id}</div>
    <h2 class="postpreviewheading">${title}</h2>
    <div class="postcreator"></div>
    <div class="postdatetime">${date}</div>
    <div class="postmedia">
      <img class="postmedia" src="${media}" onerror="this.src='/images/mediaplaceholder.png'">
    </div>
    <p class="postpreviewtext">
      ${body}
    </p>
    <div class="reactions">
      <div class="likecounter">${reactions}</div>
      <button class="thumbsup" id="posticons" data-post-id="${results[i].id}">
        Like<i class="fa-solid fa-thumbs-up"></i>
      </button>
      <div class="comments">
        <button class="commentbutton" id="posticons">
          Comment<i class="fa-solid fa-comment"></i>
        </button>
      </div>
      <button class="deletebutton">
        Delete<i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</div>`;
    }
  } catch (error) {
    console.error("Woops! Somehting Went Wrong:", error);
  }
};

if (loadMorePostsButton) {
  loadMorePostsButton.addEventListener("click", loadMorePosts);
}

async function deletePost(postId) {
  const deleteUrl = `${createPostUrl}/${postId}`;

  try {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxNywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTA5MDg5ODl9.gXu4Fd5WLUIQBCtiM8hMNUrHAExW1ONYdqKecL_Z--Y",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting post");
    }

    console.log("Post deleted successfully");

    updatePostView();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

//filterfunction

document.addEventListener("DOMContentLoaded", function () {
  const applyFilterButton = document.getElementById("applyFilter");

  if (applyFilterButton) {
    applyFilterButton.addEventListener("click", applyFilter);
  }
});

function applyFilter() {
  const dateFilter = document.getElementById("dateFilter").value;

  const postContainers = document.querySelectorAll(".postbox");

  postContainers.forEach((postContainer) => {
    const postDateElement = postContainer.querySelector(".postdatetime");
    const apiDate = postDateElement.textContent;
    const postDate = apiDate.split("T")[0];

    if (dateFilter === "" || dateFilter === postDate) {
      postContainer.style.display = "block";
    } else {
      postContainer.style.display = "none";
    }
  });
}

//Search function

const searchPosts = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const postContainers = document.querySelectorAll(".postbox");

  postContainers.forEach((container) => {
    const postId = container.querySelector(".postId").textContent.toLowerCase();
    const postTitle = container
      .querySelector(".postpreviewheading")
      .textContent.toLowerCase();
    const postTags = container.querySelector(".tag").textContent.toLowerCase();

    if (
      postId.includes(searchInput) ||
      postTitle.includes(searchInput) ||
      postTags.includes(searchInput)
    ) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
};

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchPosts);
