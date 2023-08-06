'use client';
// React
import React, { ReactNode, useState } from 'react';
// Styles
import './StandardModal.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';

interface ModalContent {
  name: string;
  component: ReactNode;
}

interface StandardModalProps {
  children: ModalContent[];
  handleCloseModal?: () => void;
}

const StandardModal: React.FC<StandardModalProps> = ({
  children,
  handleCloseModal,
}) => {
  const [child, setChild] = useState(0);

  const handleCloseModalButton = (): void => {
    handleCloseModal && handleCloseModal();
  };

  return (
    <div className="content-container">
      <div className="buttons-container">
        <IconButton
          handleOnClick={() => handleCloseModalButton()}
          icon={<FontAwesomeIcon icon={faTimes} />}
        />
        {children.map((content, index) => (
          <IconButton
            buttonText={content.name}
            key={index}
            handleOnClick={() => {
              setChild(index);
            }}
          />
        ))}
      </div>
      <div className="child-container">{children[child].component}</div>
    </div>
  );
};
export default StandardModal;
