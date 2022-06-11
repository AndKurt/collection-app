import React from 'react';
import { SigninForm, SignUpForm } from '../../components';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <SigninForm />
      <SignUpForm />
    </main>
  );
};
