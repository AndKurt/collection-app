import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../api';
import { BASE_URL } from '../../constants';
import { IItem } from '../../interface/items';
import { getCurrentUserIdJWT } from '../../utils/jwt';

export const getItemsAsync = createAsyncThunk('item/getItems', async (_, thunkApi) => {
  try {
    const response = await $api.get(`${BASE_URL}/item`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});

//interface ICreateCollection {
//  ownerId: string;
//  ownerName?: string;
//  collectionTitle: string;
//  collectionDescription: string;
//  country: string;
//  city: string;
//  date: [Date | string, Date | string | null];
//}

export const createItemAsync = createAsyncThunk(
  'item/createItem',
  async (data: IItem, thunkApi) => {
    try {
      const response = await $api.post(`${BASE_URL}/item`, {
        ownerId: data.ownerId,
        collectionId: data.collectionId,
        ownerName: data.ownerName,
        itemTitle: data.itemTitle,
        itemDescription: data.itemDescription,
        imgLink: data.imgLink,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const errMessage = JSON.parse(err.request.response);
      return thunkApi.rejectWithValue(errMessage.message);
    }
  }
);

export const deleteItemAsync = createAsyncThunk('item/deleteItem', async (id: string, thunkApi) => {
  try {
    const response = await $api.delete(`${BASE_URL}/item`, {
      data: { id: id },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = JSON.parse(err.request.response);
    return thunkApi.rejectWithValue(errMessage.message);
  }
});

//interface IUpdateCollection {
//  _id?: string;
//  ownerId: string;
//  ownerName?: string;
//  collectionTitle?: string;
//  collectionDescription?: string;
//  country?: string;
//  city?: string;
//  date?: [Date | string, Date | string | null];
//}

export const updateItemAsync = createAsyncThunk(
  'item/updateItem',
  async (data: IItem, thunkApi) => {
    try {
      const response = await $api.put(`${BASE_URL}/item`, {
        id: data._id,
        ownerId: data.ownerId,
        collectionId: data.collectionId,
        ownerName: data.ownerName,
        itemTitle: data.itemTitle,
        itemDescription: data.itemDescription,
        imgLink: data.imgLink,
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
