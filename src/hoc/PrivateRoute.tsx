import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthAsync } from '../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface IPrivateRoute {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const [load, setLoad] = useState(true);

  const verify = async () => {
    if (localStorage.getItem('accessToken')) {
      await dispatch(checkAuthAsync());
      setLoad(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (!load) {
    if (isAuth) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }

  return null;
};
