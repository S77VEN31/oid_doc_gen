import React, {
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  cloneElement,
  useRef,
} from 'react';
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
      onKeyDown={handleKeyDown} // Add the keydown event listener
      role="button" // Add the role attribute to indicate that it's an interactive element
      tabIndex={0} // Add the tabIndex to make the element focusable
    >
      {childWithProps}
    </div>
  );
};

export default ModalDisplayer;
