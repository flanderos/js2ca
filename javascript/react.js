document.addEventListener("DOMContentLoaded", () => {
  blogFeed.addEventListener("click", async (event) => {
    if (event.target.classList.contains("thumbsup")) {
      try {
        const postId = event.target.getAttribute("data-post-id");

        if (event.target.classList.contains("liked")) {
          console.log("Already liked this post.");
          return;
        }

        const response = await fetch(`${url}/social/posts/${postId}/react/👍`, {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxNywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTA5MDg5ODl9.gXu4Fd5WLUIQBCtiM8hMNUrHAExW1ONYdqKecL_Z--Y",
          },
        });

        if (!response.ok) {
          throw new Error("Whoopsie! Something went wrong:");
        }

        const likeCounter = event.target
          .closest(".reactions")
          .querySelector(".likecounter");
        if (likeCounter) {
          const currentLikes = parseInt(likeCounter.textContent);
          likeCounter.textContent = currentLikes + 1;
        }

        event.target.classList.add("liked");
      } catch (error) {
        console.error("Whoopsie! Something went wrong:", error);
      }
    }
  });
});
