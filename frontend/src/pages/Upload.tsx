import React, { useState } from "react";
import axios from "axios";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5050/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
      console.log(res.data);
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Upload failed. Make sure it's a PDF file.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📤 Upload Your Document</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Upload
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Upload;
