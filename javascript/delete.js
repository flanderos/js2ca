const deleteButton = document.querySelector(".deletebutton");

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("deletebutton")) {
    const postElement = event.target.closest(".postbox");
    if (postElement) {
      const postId = postElement.dataset.postId;

      try {
        const deleteResponse = await fetch(`${createPostUrl}/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxNywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTA5MDg5ODl9.gXu4Fd5WLUIQBCtiM8hMNUrHAExW1ONYdqKecL_Z--Y",
          },
        });

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
