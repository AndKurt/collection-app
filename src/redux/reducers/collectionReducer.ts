import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection, IResponseApiCollection } from '../../interface/collections';
import {
  createCollectionAsync,
  deleteCollectionAsync,
  getCollectionsAsync,
  updateCollectionAsync,
} from '../actions/collectionActions';

interface ICollectionSlice {
  isLoading: boolean;
  error: string;
  collections: ICollection[];
}

const initialState: ICollectionSlice = {
  isLoading: false,
  error: '',
  collections: [],
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: {
    [createCollectionAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [createCollectionAsync.fulfilled.type]: (
      state,
      action: PayloadAction<IResponseApiCollection>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.collections = [...state.collections, action.payload.collection];
    },
    [createCollectionAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.collections = [];
    },
    [getCollectionsAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getCollectionsAsync.fulfilled.type]: (state, action: PayloadAction<ICollection[]>) => {
      state.isLoading = false;
      state.error = '';
      state.collections = action.payload;
    },
    [getCollectionsAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.collections = [];
    },
    [deleteCollectionAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteCollectionAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
      state.collections = [...state.collections].filter(
        (collection) => collection._id !== action.payload
      );
    },
    [deleteCollectionAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.collections = [];
    },
    [updateCollectionAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [updateCollectionAsync.fulfilled.type]: (
      state,
      action: PayloadAction<IResponseApiCollection>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.collections = [
        ...state.collections.filter(
          (collection) => collection._id !== action.payload.collection._id
        ),
        action.payload.collection,
      ].sort((a, b) => (a._id as string).localeCompare(b._id as string));
    },
    [updateCollectionAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.collections = [];
    },
  },
});

export const collectionReducer = collectionSlice.reducer;
