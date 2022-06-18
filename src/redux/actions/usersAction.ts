import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../api';
import { BASE_URL } from '../../constants';

export const getUsersAsync = createAsyncThunk('user/getUsers', async (data, thunkApi) => {
  try {
    const response = await $api.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});
