// React
import React, { ReactNode } from 'react';
// Styles
import './StandardModal.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// Components
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
          icon={<FontAwesomeIcon icon={faTimes} />}
        />
      </div>
      {children}
    </div>
  );
};
export default StandardModal;
