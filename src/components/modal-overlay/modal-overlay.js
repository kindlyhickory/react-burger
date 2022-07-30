import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.overlay}></div>
  )
}

export default ModalOverlay;