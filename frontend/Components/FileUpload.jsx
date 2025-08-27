import React, { useState } from 'react';

function FileUpload({name}) {
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];  // Get the selected file
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      alert(`File "${file.name}" is ready to be uploaded`);
    } else {
      alert('No file selected');
    }
  };

  return (
    <div className="max-w-lg   p-6 bg-white   rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload a {name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose a file</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Display file name */}
        {file && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>Selected file:</strong> {file.name}
          </div>
        )}

         
      </form>
    </div>
  );
}

export default FileUpload;