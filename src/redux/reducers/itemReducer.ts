import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem, IResponseApiItem } from '../../interface/items';
import {
  createItemAsync,
  deleteItemAsync,
  getItemsAsync,
  updateItemAsync,
} from '../actions/itemActions';

interface IItemSlice {
  isLoading: boolean;
  error: string;
  items: IItem[];
}

const initialState: IItemSlice = {
  isLoading: false,
  error: '',
  items: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: {
    [createItemAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [createItemAsync.fulfilled.type]: (state, action: PayloadAction<IResponseApiItem>) => {
      state.isLoading = false;
      state.error = '';
      state.items = [...state.items, action.payload.item];
    },
    [createItemAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
    [getItemsAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getItemsAsync.fulfilled.type]: (state, action: PayloadAction<IItem[]>) => {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    [getItemsAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
    [deleteItemAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteItemAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
      state.items = [...state.items].filter((item) => item._id !== action.payload);
    },
    [deleteItemAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
    [updateItemAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [updateItemAsync.fulfilled.type]: (state, action: PayloadAction<IResponseApiItem>) => {
      state.isLoading = false;
      state.error = '';
      state.items = [
        ...state.items.filter((item) => item._id !== action.payload.item._id),
        action.payload.item,
      ].sort((a, b) => (a._id as string).localeCompare(b._id as string));
    },
    [updateItemAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
});

export const collectionReducer = itemSlice.reducer;
