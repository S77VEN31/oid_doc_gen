'use client';
// React
import React, { ReactNode, useState, useEffect } from 'react';
// Styles
import './FileInput.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';
import NodeTree from '../../NodeTree/NodeTree';
import DropdownTable from '../../Tables/DropdownTable/DropdownTable';
import ModalDisplayer from '../../ModalLayout/ModalDisplayer/ModalDisplayer';
import StandardModal from '../../ModalLayout/StandardModal/StandardModal';
// API
import uploadMib from '../../../utils/upload';
import downloadMibDocs from '../../../utils/download';

interface ModalContent {
  name: string;
  component: ReactNode;
}

const FileInput = (): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcesed, setIsProcesed] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent[] | null>(null);
  useEffect(() => {
    if (data) {
      setModalContent([
        { name: 'NodeTree', component: <NodeTree treeData={data.tree} /> },
        {
          name: 'DropdownTable',
          component: <DropdownTable treeData={[data.tree]} />,
        },
      ]);
    }
  }, [data]);

  const uploadFile = (file: File): void => {
    uploadMib(file)
      .then(async (response) => {
        setIsProcesed(true);
        const data = await response.json();
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadFile = (fileName: string): void => {
    downloadMibDocs(fileName)
      .then((response) => {})
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

  const handleFileDownload = (): void => {
    const fileName: string = selectedFile!.name;
    if (fileName) {
      downloadFile(fileName);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput" className="label-button">
        {selectedFile
          ? `Selected file: ${selectedFile.name}`
          : 'Select an MIB File'}
        <FontAwesomeIcon icon={faFile} />
      </label>
      <input
        accept=".my,.mib,.zip"
        type="file"
        id="fileInput"
        onChange={handleFileChange}
      />
      {isProcesed && (
        <IconButton
          buttonClassname="button-render-animation"
          buttonText="Download"
          handleOnClick={handleFileDownload}
        ></IconButton>
      )}
      {data && (
        <IconButton
          buttonClassname="button-render-animation"
          buttonText="Show Tree"
          handleOnClick={() => {
            setModal(true);
          }}
        ></IconButton>
      )}
      {modal && (
        <ModalDisplayer setModal={setModal}>
          <StandardModal>{modalContent}</StandardModal>
        </ModalDisplayer>
      )}
    </div>
  );
};

export default FileInput;
