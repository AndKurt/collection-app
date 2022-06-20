import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import {
  checkAuthAsync,
  loginUserAsync,
  logoutUserAsync,
  registrationUserAsync,
} from '../actions/authActions';

interface IUserSlice {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  isAdmin: boolean;
}

const initialState: IUserSlice = {
  isLoading: false,
  error: '',
  isAuth: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      localStorage.removeItem('accessToken');
      document.cookie = 'refreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
  },
  extraReducers: {
    [registrationUserAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [registrationUserAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [registrationUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUserAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [loginUserAsync.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
      state.isAdmin = action.payload;
    },
    [loginUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    [logoutUserAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [logoutUserAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isAuth = false;
      state.isAdmin = false;
    },
    [logoutUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkAuthAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [checkAuthAsync.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
      state.isAdmin = action.payload;
    },
    [checkAuthAsync.rejected.type]: (state) => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const authReducer = authSlice.reducer;
