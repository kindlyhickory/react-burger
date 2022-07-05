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
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pt-15 pl-10 pr-10 pb-15`}>
        <div className={`${title ? styles.closeContainer_type_titled : styles.closeContainer_type_untitled}`}>
          {title ?
            <div>
              <h3 className="text text_type_main-large">
                {title}
              </h3>
              <div className={styles.close}>
                <CloseIcon type="primary" onClick={closeModal} />
              </div>
            </div>
            :
            <div className={`${styles.closeContainer_type_untitled}`}>
              <div className={styles.close}>
                <CloseIcon type="primary" onClick={closeModal} />
              </div>
            </div>
          }
        </div>


        {children}
      </div>
      <ModalOverlay onClick={closeModal}></ModalOverlay>
    </>
    ,
    document.getElementById('modals'))
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
}

export default Modal;