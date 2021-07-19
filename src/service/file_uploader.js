class FileUploader {
  async upload(file) {
    const url = "https://api.cloudinary.com/v1_1/dpu0cdc9t/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "c9j5liah");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(console.log);
  }
}

export default FileUploader;
