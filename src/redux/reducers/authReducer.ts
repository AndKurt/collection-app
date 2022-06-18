import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkAuthAsync,
  loginUserAsync,
  logoutUserAsync,
  registrationUserAsync,
} from '../actions/authActions';

interface IAuthSlice {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: IAuthSlice = {
  isLoading: false,
  error: '',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
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
      state.isAuth = false;
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
    },
  },
});

export const authReducer = authSlice.reducer;
