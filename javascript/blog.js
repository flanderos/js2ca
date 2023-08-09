const blogFeed = document.querySelector(".container");
const blogPost = document.querySelector(".postbox");
const postTags = document.querySelector(".posttags");
const postTitle = document.querySelector(".postpreviewheading");
const postCreator = document.querySelector(".postcreator");
const postDate = document.querySelector(".postdatetime");
const postContent = document.querySelector(".postpreviewtext");
const likeCounter = document.querySelector(".likecounter");
const likeButton = document.querySelector(".thumbsup");
const dislikeCounter = document.querySelector(".dislikecounter");
const dislikeButton = document.querySelector(".thumbsdown");
const loadMorePostsButton = document.querySelector(".loadmorebutton");

let currentPage = 1;
const postsPerPage = 10;

const blogPostsUrl = url + "/social/posts?limit=10";

async function getBlogPosts() {
  const response = await fetch(blogPostsUrl, options);
  const results = await response.json();

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
    <div class="postbox">
      <div class="posttags">
        <div class="tag">${tags}</div>
      </div>
      <h2 class="postpreviewheading">${title}</h2>
      <div class="postcreator"></div>
      <div class="postdatetime">${date}</div>
      <div class="postmedia"><img class="postmedia" src="${media}" onerror="this.src='/images/mediaplaceholder.png'"></div>
      <p class="postpreviewtext">
        ${body}
      </p>
      <div class="reactions">
        <div class="likecounter">${reactions}</div>
        <div class="thumbsup" id="posticons">
          Like<i class="fa-solid fa-thumbs-up"></i>
        </div>
        <div class="comments"><div class="commentbutton" id="posticons">Comment<i class="fa-solid fa-comment"></i></i></div></div>
      </div>
    </div>
  </div>`;
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
      <div class="postbox">
        <div class="posttags">
          <div class="tag">${tags}</div>
        </div>
        <h2 class="postpreviewheading">${title}</h2>
        <div class="postcreator"></div>
        <div class="postdatetime">${date}</div>
        <div class="postmedia"><img class="postmedia" src="${media}" onerror="this.src='/images/mediaplaceholder.png'"></div>
        <p class="postpreviewtext">
          ${body}
        </p>
        <div class="reactions">
          <div class="likecounter">${reactions}</div>
          <div class="thumbsup" id="posticons">
            Like<i class="fa-solid fa-thumbs-up"></i>
          </div>
          <div class="comments"><div class="commentbutton" id="posticons">Comment<i class="fa-solid fa-comment"></i></i></div></div>
        </div>
      </div>
    </div>`;
    }
  } catch (error) {
    console.error("Feil under lasting av innlegg:", error);
  }
};

loadMorePostsButton.addEventListener("click", loadMorePosts);
