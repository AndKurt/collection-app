import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Header.module.scss';
import AppLogo from '../../assets/img/AppLogo.svg';
import { Button } from '@mui/material';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src={AppLogo} alt="App-logo" />
        </Link>
        <SearchBar />
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
      </div>
    </header>
  );
};
