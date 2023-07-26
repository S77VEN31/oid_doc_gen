import React, { ReactNode, MouseEvent, cloneElement } from 'react';
import './ModalDisplayer.style.css';

interface ModalDisplayerProps {
  children: ReactNode;
  setModal: (open: boolean) => void;
}

import { useRef } from 'react';
const ModalDisplayer: React.FC<ModalDisplayerProps> = ({
  children,
  setModal,
}) => {
  const menuRef = useRef(null);

  const handleClickOut = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = (): void => {
    menuRef.current.classList.add('hide-animation');
    setTimeout(() => {
      setModal(false);
    }, 300);
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
    >
      {childWithProps}
    </div>
  );
};

export default ModalDisplayer;
