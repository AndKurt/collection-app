import React from 'react';
import styles from './Footer.module.scss';
import githubLogo from '../../assets/img/githubLogo.svg';

const GITHUB_LINK = 'https://github.com/AndKurt/';
const GITHUB_NAME = 'AndKurt';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href={GITHUB_LINK} target="_blank" rel="noreferrer noopener">
          <img className={styles.logo} src={githubLogo} alt="github-logo" />
          {GITHUB_NAME}
        </a>
      </div>
    </footer>
  );
};
