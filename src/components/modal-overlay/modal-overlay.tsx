import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClick: () => void
}

// eslint-disable-next-line react/function-component-definition
const ModalOverlay:FC<TModalOverlay> = ({ onClick }) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div onClick={onClick} className={styles.overlay} />
);

export default ModalOverlay;
