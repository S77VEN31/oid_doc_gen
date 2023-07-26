import React, { ReactNode } from 'react';
import './StandardModal.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../Buttons/IconButton/IconButton';
interface StandardModalProps {
  children?: ReactNode;
  handleCloseModal?: () => void;
}

const StandardModal: React.FC<StandardModalProps> = ({
  children,
  handleCloseModal,
}) => {
  const handleCloseModalButton = (): void => {
    handleCloseModal && handleCloseModal();
  };
  return (
    <div className="content-container">
      <div className="close-button">
        <IconButton
          handleOnClick={() => handleCloseModalButton()}
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
      </div>
      {children}
    </div>
  );
};

export default StandardModal;
