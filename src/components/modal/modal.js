import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";


const Modal = ({ children, title, onClose, titleStyles}) => {


  const location = useLocation();


  function handleEsc(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pt-15 pl-10 pr-10 pb-15`}>
        <div className={`${title ? styles.closeContainer_type_titled : styles.closeContainer_type_untitled}`}>
          {title &&
            <h3 className={titleStyles}>
              {title}
            </h3>
          }
          <div className={`${styles.closeContainer_type_untitled}`}>
            <div className={styles.close}>
              <CloseIcon type="primary" onClick={() => {
                  onClose()
              }} />
            </div>
          </div>
        </div>


        {children}
      </div>
      <ModalOverlay onClick={onClose}></ModalOverlay>
    </>
    ,
    document.getElementById('modals'))
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default Modal;