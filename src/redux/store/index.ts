import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/authReducer';
import { usersReducer } from '../reducers/usersReducer';
import { collectionReducer } from '../reducers/collectionReducer';

const rootReducer = combineReducers({
  authReducer,
  usersReducer,
  collectionReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
