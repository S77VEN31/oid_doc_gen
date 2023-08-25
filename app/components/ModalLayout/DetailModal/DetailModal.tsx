'use client';
// React
import React, { useState } from 'react';
// Styles
import './DetailModal.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';

interface StandardModalProps {
  handleCloseModal?: () => void;
  data: any;
}

const DetailModal: React.FC<StandardModalProps> = ({
  handleCloseModal,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyData = (): void => {
    const formattedData = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(formattedData).then(() => {
      setCopied(true);
    });
  };

  const handleCloseModalButton = (): void => {
    handleCloseModal && handleCloseModal();
  };
  return (
    <div className="detail-content-container">
      <div className="detail-buttons-container">
        <IconButton
          handleOnClick={() => handleCloseModalButton()}
          icon={<FontAwesomeIcon icon={faTimes} />}
        />
        <IconButton
          handleOnClick={() => handleCopyData()}
          icon={<FontAwesomeIcon icon={faCopy} />}
        />
      </div>

      {Object.entries(data).map(([key, value]) => (
        <div className="info-container" key={key}>
          <div className="key">{key + ':'}</div>
          <div className="value">
            {Array.isArray(value) ? value.length : value}
          </div>
        </div>
      ))}
    </div>
  );
};
export default DetailModal;
