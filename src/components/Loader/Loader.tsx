import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.blob_1}></span>
      <span className={styles.blob_2}></span>
      <span className={styles.blob_3}></span>
      <span className={styles.text}>Loading...</span>
    </div>
  );
};
