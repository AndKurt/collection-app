import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
}

const initialState: IUserSlice = {
  isLoading: false,
  error: '',
  isAuth: false,
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
    [loginUserAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
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
    },
    [logoutUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkAuthAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [checkAuthAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
    },
    [checkAuthAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
  },
});

export const authReducer = authSlice.reducer;
