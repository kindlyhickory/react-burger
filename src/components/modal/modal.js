import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Modal = ({ closeAllModals, children, title }) => {

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pt-15 pl-10 pr-10 pb-15`}>
        <div className={`${title ? styles.closeContainer_type_titled : styles.closeContainer_type_untitled}`}>
          {title &&
            <h3 className="text text_type_main-large">
              {title}
            </h3>
          }
          <div className={styles.close}>
            <CloseIcon type="primary" onClick={closeAllModals} />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={closeAllModals}></ModalOverlay>
    </>
    ,
    document.getElementById('modals'))
}

Modal.propTypes = {
  closeAllModals: PropTypes.func.isRequired,
  children: PropTypes.element,
  title: PropTypes.string,
}

export default Modal;