import React, { useEffect } from 'react';
import styles from './SigninForm.module.scss';
import { Avatar, Button, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginValidation, passwordValidation } from '../../utils/validation';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
//import { loginApi } from '../../redux/actions/login';
import { useNavigate } from 'react-router-dom';
//import { loginSlice } from '../../redux/reducers/loginSlice';
import { ISignInForm } from '../../interface/signInUp';

export const SigninForm = () => {
  const { handleSubmit, control, reset, register } = useForm<ISignInForm>();
  const dispatch = useAppDispatch();
  const { errors } = useFormState({
    control,
  });
  //const { error, isLoading } = useAppSelector((state) => state.loginReducer);
  const navigation = useNavigate();
  //const { clearError } = loginSlice.actions;

  useEffect(() => {
    //dispatch(clearError());
    localStorage.clear();
  }, []);

  const onsubmit: SubmitHandler<ISignInForm> = async (data) => {
    if (data) {
      //await dispatch(
      //  loginApi({
      //    login: data.login,
      //    password: data.password,
      //  })
      //).unwrap();
      reset({
        login: '',
        password: '',
      });
      navigation('/main');
    }
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onsubmit)}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <h4>Sign in</h4>
      <Controller
        control={control}
        name="login"
        rules={loginValidation}
        render={() => (
          <TextField
            label="Login"
            size="small"
            margin="normal"
            sx={{ maxWidth: '300px', width: '100%' }}
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
        name="password"
        rules={passwordValidation}
        render={() => (
          <TextField
            type="password"
            label="Password"
            size="small"
            sx={{ maxWidth: '300px', width: '100%' }}
            margin="normal"
            fullWidth
            {...register('password', {
              required: passwordValidation.required,
            })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            FormHelperTextProps={{
              style: {
                position: 'absolute',
                top: '35px',
              },
            }}
          />
        )}
      />
      {/*{error && <p className={styles.error}>{error}</p>}*/}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="success"
        sx={{
          marginTop: 2,
          width: '120px',
        }}
      >
        Login
      </Button>
    </form>
  );
};
