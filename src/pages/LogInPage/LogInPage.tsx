import React, { MouseEvent, useState } from 'react';
import styles from './LogInPage.module.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { SigninForm, SignUpForm } from '../../components';

export const LogInPage = () => {
  const [alignment, setAlignment] = useState('signin');

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  return (
    <main className={styles.loginPage}>
      <div className={styles.wrapperForm}>
        <ToggleButtonGroup
          color="secondary"
          size="small"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="signin">Sign in</ToggleButton>
          <ToggleButton value="signup">Sign up</ToggleButton>
        </ToggleButtonGroup>
        {alignment === 'signin' && <SigninForm />}
        {alignment === 'signup' && <SignUpForm />}
      </div>
    </main>
  );
};
