import React from 'react';
import { AdminTable } from '../../components';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
  return (
    <main className={styles.adminPage}>
      <h2>Admin control</h2>
      <AdminTable />
    </main>
  );
};
