import React, { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [algorithm, setAlgorithm] = useState("cosine");
  const [result, setResult] = useState("");

  const handleUpload = () => {
    const content = document.getElementById("fileContent").value.trim();
    if (!content) return;

    const newFile = {
      name: `File${files.length + 1}`,
      content,
    };
    setFiles([...files, newFile]);
    document.getElementById("fileContent").value = "";
  };

  const handleCheckboxChange = (index) => {
    const updated = [...selectedFiles];
    if (updated.includes(index)) {
      updated.splice(updated.indexOf(index), 1);
    } else {
      updated.push(index);
    }
    setSelectedFiles(updated);
  };

  const handleCompare = async () => {
    const selected = selectedFiles.map((i) => files[i]);
    if (selected.length < 2) {
      alert("Please select at least 2 files to compare.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/compare", {
        files: selected,
        algorithm,
      });
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("Error comparing files. Please check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          PlagAware
        </h1>

        {/* Upload Box */}
        <div className="mb-8">
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Upload New File
          </label>
          <textarea
            id="fileContent"
            placeholder="Paste your file content here..."
            className="w-full h-40 p-4 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-base"
          ></textarea>
          <button
            onClick={handleUpload}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-base transition"
          >
            Upload
          </button>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Files</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-indigo-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left">Select</th>
                    <th className="px-4 py-3 text-left">File Name</th>
                    <th className="px-4 py-3 text-left">Content Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          className="accent-indigo-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-indigo-700">{file.name}</td>
                      <td className="px-4 py-3 text-gray-700 truncate max-w-xs">
                        {file.content.slice(0, 80)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Algorithm Dropdown */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <label className="text-lg text-gray-700 font-medium">Select Algorithm:</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="cosine">Cosine Similarity</option>
                <option value="lcs">Longest Common Subsequence</option>
              </select>
            </div>

            {/* Compare Button */}
            <div className="mt-6">
              <button
                onClick={handleCompare}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md transition"
              >
                Compare Selected
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-10 bg-gray-100 p-6 rounded-md">
                <h3 className="text-lg font-bold text-green-700 mb-2">Comparison Result</h3>
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
