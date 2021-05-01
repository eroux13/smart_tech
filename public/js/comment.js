const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector("textarea[name='comment-body']").value.trim();
    const postID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (comment) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({comment, postID}),
            headers: {"Content-Type": "application/json"}
        });
        if (response.ok){
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
}
document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);