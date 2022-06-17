import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage, CollectionPage, HomePage, LogInPage, NotFoundPage } from '../pages';

export const Router = () => {
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
