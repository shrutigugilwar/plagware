import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = ({ onUpload }) => {
  const [fileContent, setFileContent] = useState("");

  const handleUpload = async () => {
    if (!fileContent.trim()) return alert("Content cannot be empty");

    const res = await axios.post("http://localhost:8080/api/files/upload", {
      content: fileContent,
    });

    alert("File uploaded successfully!");
    onUpload(); // Refresh file list
    setFileContent("");
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Upload New File</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows="6"
        placeholder="Paste your file content here..."
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
      ></textarea>
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUploadForm;
