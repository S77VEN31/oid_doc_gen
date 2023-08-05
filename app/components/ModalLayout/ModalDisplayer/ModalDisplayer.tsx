// React
import React, {
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  cloneElement,
  useRef,
} from 'react';
// Styles
import './ModalDisplayer.style.css';

interface ModalDisplayerProps {
  children: ReactNode;
  setModal: (open: boolean) => void;
  setSelectedRow: (open: number | null) => void;
}

const ModalDisplayer: React.FC<ModalDisplayerProps> = ({
  children,
  setModal,
  setSelectedRow,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOut = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCloseModal();
    }
  };

  const handleCloseModal = (): void => {
    if (menuRef.current) {
      menuRef.current.classList.add('hide-animation');
      setTimeout(() => {
        setModal(false);
        setSelectedRow(null);
      }, 300);
    }
  };

  const childWithProps = cloneElement(
    children as React.ReactElement<{ handleCloseModal: () => void }>,
    {
      handleCloseModal, // Pass the handleCloseModal function to the child
    },
  );

  return (
    <div
      ref={menuRef}
      className={'modal-displayer render-animation'}
      onClick={handleClickOut}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {childWithProps}
    </div>
  );
};
export default ModalDisplayer;
