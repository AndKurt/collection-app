import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Header.module.scss';
import AppLogo from '../../assets/img/AppLogo.svg';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUserAsync } from '../../redux/actions/userActions';

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src={AppLogo} alt="App-logo" />
        </Link>
        <SearchBar />
        {!isAuth ? (
          <Link to="/login">
            <Button
              variant="text"
              style={{
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              Log In
            </Button>
          </Link>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <Button
              color="warning"
              variant="text"
              style={{
                fontWeight: 'bold',
              }}
            >
              Log Out
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
