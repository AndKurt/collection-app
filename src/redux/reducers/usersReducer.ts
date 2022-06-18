import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interface/users';
import { getUsersAsync } from '../actions/usersAction';

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
  },
});

export const usersReducer = usersSlice.reducer;
