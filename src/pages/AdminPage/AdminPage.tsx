import React from 'react';
import { AdminTable } from '../../components';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
  return (
    <main className={styles.adminPage}>
      <h3 className={styles.title}>Admin control</h3>
      <AdminTable />
    </main>
  );
};
