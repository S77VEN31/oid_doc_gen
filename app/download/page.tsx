'use client';
// React
import React, { ReactNode, useState, useEffect } from 'react';
// Styles
import './Download.style.css';
// Components
import FileInput from '../components/Inputs/FileInput/FileInput';
import IconButton from '../components/Buttons/IconButton/IconButton';
import ModalDisplayer from '../components/ModalLayout/ModalDisplayer/ModalDisplayer';
import StandardModal from '../components/ModalLayout/StandardModal/StandardModal';
import NodeTree from '../components/NodeTree/NodeTree';
import DropdownTable from '../components/Tables/DropdownTable/DropdownTable';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// API
import downloadMibDocs from '../utils/download';

interface ModalContent {
  name: string;
  component: ReactNode;
}

export default function Download(): JSX.Element {
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

  const downloadFile = async (): Promise<void> => {
    try {
      const response = await downloadMibDocs();
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'filename.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
      } else {
        console.log('Response error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDownload = (): void => {
    downloadFile();
  };

  return (
    <div className="DOWNLOAD-PAGE">
      <FileInput
        setData={setData}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        setIsProcesed={setIsProcesed}
      />
      {data && (
        <IconButton
          icon={<FontAwesomeIcon icon={faSitemap} />}
          buttonClassname="button-render-animation graphics-button"
          buttonText="Show graphics"
          handleOnClick={() => {
            setModal(true);
          }}
        ></IconButton>
      )}
      {isProcesed && (
        <IconButton
          icon={<FontAwesomeIcon icon={faDownload} />}
          buttonClassname="button-render-animation download-button"
          buttonText="Download"
          handleOnClick={handleFileDownload}
        ></IconButton>
      )}
      {modal && (
        <ModalDisplayer setModal={setModal}>
          <StandardModal>{modalContent}</StandardModal>
        </ModalDisplayer>
      )}
    </div>
  );
}
