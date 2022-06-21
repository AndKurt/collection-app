import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUserAsync } from '../../redux/actions/authActions';
import { motion } from 'framer-motion';
import useOnclickOutside from 'react-cool-onclickoutside';
import { authSlice } from '../../redux/reducers/authReducer';

interface INavLinks {
  isMobile?: boolean;
  closeMobileMenu: (() => void) | null;
}

export const NavLinks = ({ isMobile, closeMobileMenu }: INavLinks) => {
  const { isAdmin, isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  const closeMobile = () => {
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handleLogout = () => {
    dispatch(authSlice.actions.setIsAuth(false));
    dispatch(logoutUserAsync()).unwrap();
    closeMobile();
  };

  const closeRef = useOnclickOutside(() => {
    closeMobile();
  });

  return (
    <ul ref={closeRef}>
      {isAuth && isAdmin && (
        <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.1 }}>
          <Link to="/admin" onClick={() => closeMobile()}>
            Admin control
          </Link>
        </motion.li>
      )}
      <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.2 }}>
        <Link to="/collection" onClick={() => closeMobile()}>
          Collections
        </Link>
      </motion.li>
      {isAuth && (
        <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.3 }}>
          <Link to="/personal" onClick={() => closeMobile()}>
            Personal
          </Link>
        </motion.li>
      )}
      {!isAuth && (
        <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.4 }}>
          <Link to="/login" onClick={() => closeMobile()}>
            Log In
          </Link>
        </motion.li>
      )}
      {isAuth && (
        <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.5 }}>
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </motion.li>
      )}
    </ul>
  );
};
