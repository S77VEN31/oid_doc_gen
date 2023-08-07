'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import './FileInput.style.css';

const FileInput = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file);
    //onFileSelect(file); // Pass the selected file to the parent component
  };

  return (
    <div>
      <label htmlFor="fileInput" className="label-button">
        Choose an MIB File
        <FontAwesomeIcon icon={faFile} />
      </label>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      {selectedFile && (
        <p className="file-name">Selected file: {selectedFile.name}</p>
      )}
    </div>
  );
};
export default FileInput;
