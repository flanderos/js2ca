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
          <input type="text" class="editposttags" id="postags" style ="display: none">
          <button class="editbutton">Edit<i class="fa-regular fa-pen-to-square"></i></button>
        </div>
        <div class="postId">${results[i].id}</div>
        <h2 class="postpreviewheading">${title}</h2>
        <input type="text" class="editposttitle" id="posttitle" style="display: none">
        <div class="postcreator"></div>
        <div class="postdatetime">${date}</div>
        <input type="text" class="editpostmedia" id="postmedia" style="display: none;">
        <div class="postmedia">
          <img class="postmedia" src="${media}" onerror="this.src='/images/mediaplaceholder.png'">
        </div>
        <p class="postpreviewtext">${body}</p>
        <textarea class="editposttext" style="display: none;">${body}</textarea>
        <div class="reactions">
          <div class="likecounter">${reactions}</div>
          <button class="thumbsup" id="posticons" data-post-id="${results[i].id}">
            Like<i class="fa-solid fa-thumbs-up"></i>
          </button>
          <div class="comments">
            <button class="commentbutton" id="posticons" onclick="toggleComments(this)">
              Comment<i class="fa-solid fa-comment"></i>
            </button>
            <button class="deletebutton">
              Delete<i class="fa-solid fa-trash"></i>
            </button>
            
          </div>
        </div>
        <div class="commentsection">
          <textarea class="commentbox" placeholder="Write a comment..."></textarea>
          <button class="commentpostbutton">Post Comment</button>
          <div class="previouscomments"></div>
        </div>
      </div>
    </div>
    `;
    }
  }
}

getBlogPosts();

const toggleComments = (button) => {
  const postBox = button.closest(".postbox");
  const commentSection = postBox.querySelector(".commentsection");

  if (commentSection) {
    commentSection.classList.toggle("show-comments");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const commentButtons = document.querySelectorAll(".commentbutton");

  commentButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleComments(button);
    });
  });
});

const loadMorePosts = async () => {
  currentPage++;
  const nextPageUrl = `${blogPostsUrl}&offset=${
    (currentPage - 1) * postsPerPage
  }&limit=${postsPerPage}`;

  try {
    const response = await fetch(nextPageUrl, options);
    const results = await response.json();

    if (results.length === 0) {
      console.log("No more posts!");
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
        <p class="postpreviewtext">${body}</p>
        <div class="reactions">
          <div class="likecounter">${reactions}</div>
          <button class="thumbsup" id="posticons" data-post-id="${results[i].id}">
            Like<i class="fa-solid fa-thumbs-up"></i>
          </button>
          <div class="comments">
            <button class="commentbutton" id="posticons" onclick="toggleComments(this)">
              Comment<i class="fa-solid fa-comment"></i>
            </button>
            <button class="deletebutton">
              Delete<i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="commentsection" >
          <textarea class="commentbox" placeholder="Write a comment..."></textarea>
          <button class="commentpostbutton">Post Comment</button>
          <div class="previouscomments"></div>
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
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
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    return;
  }

  const searchText = searchInput.value.toLowerCase();
  const postContainers = document.querySelectorAll(".postbox");

  postContainers.forEach((container) => {
    const postId = container.querySelector(".postId").textContent.toLowerCase();
    const postTitle = container
      .querySelector(".postpreviewheading")
      .textContent.toLowerCase();
    const postTags = container.querySelector(".tag").textContent.toLowerCase();

    if (
      postId.includes(searchText) ||
      postTitle.includes(searchText) ||
      postTags.includes(searchText)
    ) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", searchPosts);
  }
});

//togglesize

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("postmedia")) {
      const postbox = event.target.closest(".postbox");
      if (postbox) {
        postbox.classList.toggle("large");
      }
    }
  });
});

//comment

const commentButtons = document.querySelectorAll(".commentpostbutton");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  container.addEventListener("click", async (event) => {
    const target = event.target;

    if (target.classList.contains("commentpostbutton")) {
      const postBox = target.closest(".postbox");
      const postId = postBox.dataset.postId;

      const commentBox = postBox.querySelector(".commentbox");
      const commentBody = commentBox.value;

      if (!commentBody) {
        alert("Please enter a comment.");
        return;
      }

      const commentData = {
        body: commentBody,
      };

      try {
        const response = await fetch(`${url}/social/posts/${postId}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
          },
          body: JSON.stringify(commentData),
        });

        if (response.ok) {
          const comment = await response.json();

          // Clear the textarea
          commentBox.value = "";

          // Update the comments section for the specific post
          const previousComments = postBox.querySelector(".previouscomments");
          previousComments.innerHTML += `<div>${comment.body}</div>`;
        } else {
          console.error(
            "Error creating comment:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  container.addEventListener("click", async (event) => {
    if (event.target.classList.contains("editbutton")) {
      const postBox = event.target.closest(".postbox");

      if (postBox) {
        const postId = postBox.dataset.postId;
        const editPostText = postBox.querySelector(".editposttext");
        const editTitle = postBox.querySelector(".editposttitle");
        const editTags = postBox.querySelector(".editposttags");
        const editMedia = postBox.querySelector(".editpostmedia");

        if (editPostText.style.display === "none") {
          event.target.textContent = "Save";

          const existingTitle = postBox.querySelector(
            ".postpreviewheading"
          ).textContent;
          const existingTags = postBox.querySelector(".tag").textContent;
          const existingMedia = postBox.querySelector(".postmedia img").src;

          editTitle.value = existingTitle;
          editTags.value = existingTags;
          editMedia.value = existingMedia;

          editTitle.style.display = "block";
          editPostText.style.display = "block";
          editTags.style.display = "block";
          editMedia.style.display = "block";
        } else {
          event.target.textContent = "Edit";

          const newTitle = editTitle.value;
          const newText = editPostText.value;
          const newTags = editTags.value;
          const newMedia = editMedia.value;

          const updatedData = {
            title: newTitle,
            body: newText,
            tags: [newTags],
            media: newMedia,
          };

          try {
            const response = await fetch(`${url}/social/posts/${postId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
              },
              body: JSON.stringify(updatedData),
            });

            if (response.ok) {
              postBox.querySelector(".postpreviewheading").textContent =
                newTitle;
              postBox.querySelector(".tag").textContent = newTags;
              postBox.querySelector(".postmedia img").src = newMedia;
              postBox.querySelector(".postpreviewtext").textContent = newText;
            } else {
              console.error(
                "Error updating post:",
                response.status,
                response.statusText
              );
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }

          editTitle.style.display = "none";
          editPostText.style.display = "none";
          editTags.style.display = "none";
          editMedia.style.display = "none";
        }
      }
    }
  });
});
