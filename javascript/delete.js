const deleteButton = document.querySelector(".deletebutton");

document.addEventListener("click", async (event) => {
  // Check if the clicked element has the "deletebutton" class
  if (event.target.classList.contains("deletebutton")) {
    // Find the closest ancestor with the class "postbox"
    const postElement = event.target.closest(".postbox");
    if (postElement) {
      // Get the postId from the dataset
      const postId = postElement.dataset.postId;

      try {
        // Send a DELETE request to delete the post
        const deleteResponse = await fetch(`${createPostUrl}/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
          },
        });

        // Check if the deletion was successful

        if (!deleteResponse.ok) {
          throw new Error("Error deleting post");
        }

        postElement.remove();
      } catch (error) {
        alert("you can only delete your own posts");
      }
    }
  }
});
