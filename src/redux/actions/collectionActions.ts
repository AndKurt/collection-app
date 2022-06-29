import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../api';
import { BASE_URL } from '../../constants';
import { getCurrentUserIdJWT } from '../../utils/jwt';

export const getCollectionsAsync = createAsyncThunk(
  'collection/getCollections',
  async (_, thunkApi) => {
    try {
      const response = await $api.get(`${BASE_URL}/collection`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);

interface ICreateCollection {
  ownerId: string;
  ownerName?: string;
  collectionTitle: string;
  collectionDescription: string;
  country: string;
  city: string;
  date: [Date | string, Date | string | null];
}

export const createCollectionAsync = createAsyncThunk(
  'collection/createCollection',
  async (data: ICreateCollection, thunkApi) => {
    try {
      const response = await $api.post(`${BASE_URL}/collection`, {
        ownerId: data.ownerId,
        ownerName: data.ownerName,
        collectionTitle: data.collectionTitle,
        collectionDescription: data.collectionDescription,
        country: data.country,
        city: data.city,
        date: data.date,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);

export const deleteCollectionAsync = createAsyncThunk(
  'collection/deleteCollection',
  async (id: string, thunkApi) => {
    try {
      const response = await $api.delete(`${BASE_URL}/collection`, {
        data: { id: id },
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);

interface IUpdateCollection {
  _id?: string;
  ownerId: string;
  ownerName?: string;
  collectionTitle?: string;
  collectionDescription?: string;
  country?: string;
  city?: string;
  date?: [Date | string, Date | string | null];
}

export const updateCollectionAsync = createAsyncThunk(
  'collection/updateCollection',
  async (data: IUpdateCollection, thunkApi) => {
    try {
      const response = await $api.put(`${BASE_URL}/collection`, {
        id: data._id,
        ownerId: data.ownerId,
        ownerName: data.ownerName,
        collectionTitle: data.collectionTitle,
        collectionDescription: data.collectionDescription,
        country: data.country,
        city: data.city,
        date: data.date,
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
