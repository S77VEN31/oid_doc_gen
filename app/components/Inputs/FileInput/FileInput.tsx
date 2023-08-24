'use client';
// Styles
import './FileInput.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
// API
import uploadMib from '../../../utils/upload';

const FileInput = ({
  setSelectedFile,
  selectedFile,
  setIsProcesed,
  setData,
}): JSX.Element => {
  const uploadFile = async (file: File): Promise<void> => {
    return uploadMib(file)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsProcesed(true);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file: File = event.target.files![0];
    if (file) {
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setSelectedFile(droppedFile);
      uploadFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault();
  };

  return (
    <label
      htmlFor="fileInput"
      className="label-button"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      {selectedFile
        ? `Selected file: ${selectedFile.name}`
        : 'Select an MIB File using the button or drag and drop it here'}
      <FontAwesomeIcon icon={faFile} />
      <input
        accept=".my,.mib,.zip"
        type="file"
        id="fileInput"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default FileInput;
