import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage, CollectionPage, HomePage, LogInPage, NotFoundPage } from '../pages';
import { checkAuthAsync } from '../redux/actions/userActions';
import { useAppDispatch } from '../redux/hooks';

export const Router = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
