import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../api';
import { BASE_URL } from '../../constants';
import { IUser } from '../../interface/users';
import { getCurrentUserIdJWT } from '../../utils/jwt';

export const getUsersAsync = createAsyncThunk('user/getUsers', async (_, thunkApi) => {
  try {
    const response = await $api.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});

export const deleteUserAsync = createAsyncThunk('user/deleteUser', async (id: string, thunkApi) => {
  try {
    const response = await $api.delete(`${BASE_URL}/users`, { data: { id: id } });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});

export interface IUpdateUserAsync {
  _id: string;
  login?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  isLocked?: boolean;
  isAdmin?: boolean;
  currentId?: string;
}

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (data: IUpdateUserAsync, thunkApi) => {
    try {
      const response = await $api.put(`${BASE_URL}/users`, {
        id: data._id,
        login: data.login,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        isLocked: data.isLocked,
        isAdmin: data.isAdmin,
        currentId: data.currentId,
      });

      if (data._id === getCurrentUserIdJWT()) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);
