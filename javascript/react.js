// Wait for the DOM to be fully loaded

document.addEventListener("DOMContentLoaded", () =>
  // Attach a click event listener to the blogFeed element
  {
    blogFeed.addEventListener("click", async (event) =>
      // Check if the clicked element has the "thumbsup" class
      {
        if (event.target.classList.contains("thumbsup")) {
          try {
            // Get the post ID from the clicked element's data attribute
            const postId = event.target.getAttribute("data-post-id");

            // Check if the post has already been liked

            if (event.target.classList.contains("liked")) {
              console.log("Already liked this post.");
              return;
            }

            // Send a PUT request to like the post

            const response = await fetch(
              `${url}/social/posts/${postId}/react/👍`,
              {
                method: "PUT",
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
                },
              }
            );

            // Handle response errors

            if (!response.ok) {
              throw new Error("Whoopsie! Something went wrong:");
            }

            // Update the like counter if present

            const likeCounter = event.target
              .closest(".reactions")
              .querySelector(".likecounter");
            if (likeCounter) {
              const currentLikes = parseInt(likeCounter.textContent);
              likeCounter.textContent = currentLikes + 1;
            }

            // Mark the element as liked

            event.target.classList.add("liked");
          } catch (error) {
            console.error("Whoopsie! Something went wrong:", error);
          }
        }
      }
    );
  }
);
