const titleInput = document.querySelector("#posttitle");
const textInput = document.querySelector("#posttext");
const tagInput = document.querySelector("#tags");
const mediaInput = document.querySelector("#postmedia");
const titleError = document.querySelector(".titleerror");
const textError = document.querySelector(".texterror");
const tagError = document.querySelector(".tagerror");
const mediaError = document.querySelector(".mediaerror");
const createPostButton = document.querySelector(".createpostlink");
const createPostUrl = url + "/social/posts";

const validatePosting = (event) => {
  if (event) {
    event.preventDefault();

    if (
      titleInput.value.trim().length >= 2 &&
      titleInput.value.trim().length <= 25
    ) {
      titleError.style.display = "none";
    } else {
      titleError.style.display = "block";
    }

    if (
      textInput.value.trim().length >= 2 &&
      textInput.value.trim().length <= 250
    ) {
      textError.style.display = "none";
    } else {
      textError.style.display = "block";
    }

    if (
      tagInput.value.trim().length >= 2 &&
      tagInput.value.trim().length <= 25
    ) {
      tagError.style.display = "none";
    } else {
      tagError.style.display = "block";
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlPattern.test(mediaInput.value.trim())) {
      mediaError.style.display = "none";
    } else {
      mediaError.style.display = "block";
    }

    if (
      titleInput.value.trim().length >= 2 &&
      titleInput.value.trim().length <= 25 &&
      textInput.value.trim().length >= 2 &&
      textInput.value.trim().length <= 250 &&
      tagInput.value.trim().length >= 2 &&
      tagInput.value.trim().length <= 25 &&
      urlPattern.test(mediaInput.value.trim())
    ) {
      (async () => {
        try {
          const postData = {
            title: titleInput.value.trim(),
            body: textInput.value.trim(),
            tags: tagInput.value.split(",").map((tag) => tag.trim()),
            media: mediaInput.value.trim(),
          };

          const response = await fetch(createPostUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImFuZGVyc3RvIiwiZW1haWwiOiJhbmRlcnN0b0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTE4Njk1Mjl9.Pnuapd1TL6qKQfp6wpNoxv4jHgupQXYQO0FO8YQ_2fM",
            },
            body: JSON.stringify(postData),
          });

          titleInput.value = "";
          textInput.value = "";
          tagInput.value = "";
          mediaInput.value = "";

          if (!response.ok) {
            throw new Error("Error creating post");
          }

          const result = await response.json();
          console.log("Post created:", result);
        } catch (error) {
          console.error("Error creating post:", error);
        }

        async function updatePostView() {
          blogFeed.innerHTML = "";
          await getBlogPosts();
        }

        updatePostView();
      })();
    } else {
      alert(
        "Validation failed. Please fill out all fields correctly. See what is missing below the fields."
      );
    }
  }
};

createPostButton.addEventListener("click", validatePosting);
