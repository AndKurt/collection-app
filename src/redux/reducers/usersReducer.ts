import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseApiUser, IUser } from '../../interface/users';
import { deleteUserAsync, getUsersAsync, updateUserAsync } from '../actions/usersAction';

interface IUsersSlice {
  isLoading: boolean;
  error: string;
  users: IUser[] | [];
}

const initialState: IUsersSlice = {
  isLoading: false,
  error: '',
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsersAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getUsersAsync.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [getUsersAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.users = [];
    },
    [deleteUserAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteUserAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
      state.users = [...state.users].filter((user) => user._id !== action.payload);
    },
    [deleteUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.users = [];
    },
    [updateUserAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [updateUserAsync.fulfilled.type]: (state, action: PayloadAction<IResponseApiUser>) => {
      state.isLoading = false;
      state.error = '';
      state.users = [
        ...state.users.filter((user) => user._id !== action.payload.user._id),
        action.payload.user,
      ].sort((a, b) => a._id.localeCompare(b._id));
    },
    [updateUserAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.users = [];
    },
  },
});

export const usersReducer = usersSlice.reducer;
