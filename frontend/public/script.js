document.getElementById("upload-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const video = document.getElementById("video").files[0];
    const formData = new FormData();
    formData.append("file", video);

    const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    alert(JSON.stringify(result));
});
