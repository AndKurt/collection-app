import React, { useState } from 'react';
import { NavLinks } from './NavLinks';
import styles from './HeaderMenu.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const MobileNavigation = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const hamburgerIcon = (
    <MenuIcon className={styles.hamburgerIcon} onClick={() => setOpenMenu(!openMenu)} />
  );

  const closeIcon = (
    <CloseIcon className={styles.hamburgerIcon} onClick={() => setOpenMenu(!openMenu)} />
  );

  const closeMobileMenu = () => setOpenMenu(false);

  return (
    <nav className={styles.mobileNavigation}>
      {openMenu ? closeIcon : hamburgerIcon}
      {openMenu && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </nav>
  );
};
