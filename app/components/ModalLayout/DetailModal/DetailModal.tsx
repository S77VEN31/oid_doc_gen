'use client';

// Styles
import './DetailModal.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
  const handleCloseModalButton = (): void => {
    handleCloseModal && handleCloseModal();
  };
  return (
    <div className="content-container">
      <IconButton
        handleOnClick={() => handleCloseModalButton()}
        icon={<FontAwesomeIcon icon={faTimes} />}
      />
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};
export default DetailModal;
