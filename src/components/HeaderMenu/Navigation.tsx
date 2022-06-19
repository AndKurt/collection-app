import React from 'react';
import { NavLinks } from './NavLinks';
import styles from './HeaderMenu.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLinks closeMobileMenu={null} />
    </nav>
  );
};
