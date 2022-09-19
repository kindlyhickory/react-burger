import React, { FC } from 'react';
import styles from './loader.module.css';

// eslint-disable-next-line react/function-component-definition
const Loader:FC<{text: string}> = ({ text }) => (
  <div className={`${styles.loaderContainer}`}>
    <div className={styles.loader} />
    <p className="text text_type_main-medium">
      {text}
    </p>
  </div>

);

export default Loader;
