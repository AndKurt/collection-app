import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Header.module.scss';
import AppLogo from '../../assets/img/AppLogo.svg';
import { HeaderMenu } from '..';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src={AppLogo} alt="App-logo" />
        </Link>
        <SearchBar />
        <HeaderMenu />
      </div>
    </header>
  );
};
