import React from 'react';
import styles from './HeaderMenu.module.scss';
import { MobileNavigation } from './MobileNavigation';
import { Navigation } from './Navigation';

export const HeaderMenu = () => {
  return (
    <div className={styles.headerMenu}>
      <Navigation />
      <MobileNavigation />
    </div>
  );
};
