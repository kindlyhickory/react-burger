import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { HIDE_MODAL_INGREDIENT } from "../../services/actions/ingredients";
import { HIDE_ORDER_MODAL } from "../../services/actions/index";
const Modal = ({ children, title }) => {

<<<<<<< HEAD
  const dispatch = useDispatch();

  function handleEsc(e) {
    if (e.key === "Escape") {
      dispatch({ type: HIDE_MODAL_INGREDIENT })
      dispatch({ type: HIDE_ORDER_MODAL });
    }
  }

  function closeModal() {
    dispatch({ type: HIDE_MODAL_INGREDIENT });
    dispatch({ type: HIDE_ORDER_MODAL });
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
=======
const Modal = ({ closeAllModals, children, title }) => {

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    }

    document.addEventListener('keydown', handleEscClose);
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
    return () => {
      document.removeEventListener('keydown', handleEsc)
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
<<<<<<< HEAD
            <div className={styles.close}>
              <CloseIcon type="primary" onClick={closeModal} />
            </div>
          </div>
          :
          <div className={`${styles.closeContainer_type_untitled}`}>
            <div className={styles.close}>
              <CloseIcon type="primary" onClick={closeModal} />
            </div>
=======
          }
          <div className={styles.close}>
            <CloseIcon type="primary" onClick={closeAllModals} />
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={closeModal}></ModalOverlay>
    </>
    ,
    document.getElementById('modals'))
}

Modal.propTypes = {
<<<<<<< HEAD
=======
  closeAllModals: PropTypes.func.isRequired,
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
  children: PropTypes.element,
  title: PropTypes.string,
}

export default Modal;