import React from 'react';
import styles from './SignUpForm.module.scss';
import { Avatar, Button, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  loginValidation,
  passwordValidation,
} from '../../utils/validation';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
//import { registerAPI } from '../../redux/actions/register';
import { useNavigate } from 'react-router-dom';
import { ISignUpForm } from '../../interface/signInUp';

export const SignUpForm = () => {
  const { handleSubmit, control, register, watch, reset } = useForm<ISignUpForm>();
  //const { isLoading, error } = useAppSelector((state) => state.usersDataReducer);
  const { errors } = useFormState({
    control,
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const password = watch('password');

  const onsubmit: SubmitHandler<ISignUpForm> = async (data) => {
    if (data) {
      //await dispatch(
      //  registerAPI({
      //    login: data.login,
      //    email: data.email,
      //    firstName: data.firstName,
      //    lastName: data.lastName,
      //    password: data.password,
      //  })
      //).unwrap();
      navigation('/login');
      reset({
        login: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
      });
    }
    reset();
  };

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit(onsubmit)}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <h4>Sign up</h4>
      <div className={styles.row}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={() => (
            <TextField
              label="Login"
              size="small"
              margin="normal"
              className={styles.field}
              fullWidth
              {...register('login', {
                required: loginValidation.required,
                validate: loginValidation.validate,
              })}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={loginValidation}
          render={() => (
            <TextField
              label="Email"
              size="small"
              margin="normal"
              className={styles.field}
              fullWidth
              {...register('email', {
                required: emailValidation.required,
                validate: emailValidation.validate,
              })}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          control={control}
          name="firstName"
          rules={loginValidation}
          render={() => (
            <TextField
              label="First name"
              size="small"
              margin="normal"
              className={styles.field}
              fullWidth
              {...register('firstName', {
                required: firstNameValidation.required,
                validate: firstNameValidation.validate,
              })}
              error={!!errors.firstName?.message}
              helperText={errors.firstName?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={loginValidation}
          render={() => (
            <TextField
              label="Last name"
              size="small"
              margin="normal"
              className={styles.field}
              fullWidth
              {...register('lastName', {
                required: lastNameValidation.required,
                validate: lastNameValidation.validate,
              })}
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          control={control}
          name="password"
          render={() => (
            <TextField
              type="password"
              label="Password"
              size="small"
              className={styles.field}
              margin="normal"
              fullWidth
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register('password', {
                required: passwordValidation.required,
              })}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="repeatPassword"
          render={() => (
            <TextField
              type="password"
              label="Repeat password"
              size="small"
              className={styles.field}
              margin="normal"
              fullWidth
              error={!!errors.repeatPassword?.message}
              helperText={errors.repeatPassword?.message}
              {...register('repeatPassword', {
                required: 'Required to fill',
                validate: (value) => {
                  return value === password || "The passwords don't match";
                },
              })}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
      </div>
      {/*{error && <p className={styles.error}>{error}</p>}*/}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="success"
        sx={{
          marginTop: 2,
          width: '200px',
        }}
      >
        sign up for free
      </Button>
    </form>
  );
};
