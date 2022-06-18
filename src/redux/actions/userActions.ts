import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import $api from '../../api';
import { BASE_URL } from '../../constants';
import { ILogin, IRegister } from '../../interface/signInUp';

export const registrationUserAsync = createAsyncThunk(
  'user/registration',
  async (data: IRegister, thunkApi) => {
    try {
      const response = await $api.post(`${BASE_URL}/registration`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk('user/login', async (data: ILogin, thunkApi) => {
  try {
    const response = await $api.post(`${BASE_URL}/login`, data);

    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});

export const logoutUserAsync = createAsyncThunk('user/logout', async () => {
  await $api.post(`${BASE_URL}/logout`);
  localStorage.removeItem('accessToken');
});

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL}/refresh`, {
      withCredentials: true,
    });

    console.log(response);

    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});
