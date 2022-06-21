import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../hoc/PrivateRoute';
import {
  AdminPage,
  CollectionPage,
  HomePage,
  LogInPage,
  NotFoundPage,
  PersonalPage,
} from '../pages';
import { useAppSelector } from '../redux/hooks';

export const Router = () => {
  const { isAdmin } = useAppSelector((state) => state.authReducer);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route
        path="/admin"
        element={<PrivateRoute>{isAdmin ? <AdminPage /> : <Navigate to="/" />}</PrivateRoute>}
      />
      <Route
        path="/personal"
        element={
          <PrivateRoute>
            <PersonalPage />
          </PrivateRoute>
        }
      />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
