'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import './FileInput.style.css';
import IconButton from '../../Buttons/IconButton/IconButton';
const FileInput = ({}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcesed, setIsProcesed] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file);
  };

  async function submitHandler() {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://127.0.0.1:5000/upload_mib', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setIsProcesed(true);
      console.log('File uploaded successfully');
    } else {
      console.log('Error uploading file');
    }
  }

  async function downloadPDF(name) {
    try {
      // Remove file extension
      const fileNameWithoutExtension = name.replace(/\..+$/, '');
      const response = await fetch(
        `http://127.0.0.1:5000/pdf/${fileNameWithoutExtension}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }

  return (
    <div>
      <label htmlFor="fileInput" className="label-button">
        {selectedFile
          ? `Selected file: ${selectedFile.name}`
          : 'Select an MIB File'}
        <FontAwesomeIcon icon={faFile} />
      </label>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      {selectedFile && (
        <IconButton
          buttonClassname="button-render-animation"
          buttonText="Submit"
          handleOnClick={submitHandler}
        ></IconButton>
      )}
      {isProcesed && (
        <IconButton
          buttonClassname="button-render-animation "
          buttonText="Download"
          handleOnClick={() => downloadPDF(selectedFile.name)}
        ></IconButton>
      )}
    </div>
  );
};

export default FileInput;
