class FileUploader {
  async upload(file) {
    const url = "https://api.cloudinary.com/v1_1/dpu0cdc9t/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "c9j5liah");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  }
}

export default FileUploader;
