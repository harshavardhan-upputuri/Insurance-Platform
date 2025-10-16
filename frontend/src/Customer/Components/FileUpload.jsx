import React, { useState } from 'react';

function FileUpload({ name, onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // remove 'data:*/*;base64,'
      onFileSelect(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload a {name}</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        required
      />
      {fileName && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>Selected file:</strong> {fileName}
        </div>
      )}
    </div>
  );
}



export default FileUpload;