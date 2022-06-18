import React, { MouseEvent, useState } from 'react';
import styles from './LogInPage.module.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Loader, SigninForm, SignUpForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userSlice } from '../../redux/reducers/userReducer';

export const LogInPage = () => {
  const [alignment, setAlignment] = useState('signin');
  const { isLoading } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { clearError } = userSlice.actions;

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
    dispatch(clearError());
  };
  return (
    <main className={styles.loginPage}>
      {isLoading ? (
        <Loader />
      ) : (
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
          {alignment === 'signup' && <SignUpForm setAlignment={setAlignment} />}
        </div>
      )}
    </main>
  );
};
