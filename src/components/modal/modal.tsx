import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModal = {
  title?: string
  onClose: () => void
  titleStyles?: string
}

const Modal:FC<TModal> = ({
  children, title, onClose, titleStyles,
}) => {
  function handleEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pt-15 pl-10 pr-10 pb-15`}>
        <div className={`${title ? styles.closeContainer_type_titled : styles.closeContainer_type_untitled}`}>
          {title
            && (
            <h3 className={titleStyles}>
              {title}
            </h3>
            )}
          <div className={`${styles.closeContainer_type_untitled}`}>
            <div className={styles.close}>
              <CloseIcon
                type="primary"
                onClick={() => {
                  onClose();
                }}
              />
            </div>
          </div>
        </div>

        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    document.getElementById('modals')!,
  );
};
export default Modal;
