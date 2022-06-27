import React, { useEffect } from 'react';
import { AdminTable } from '../../components';
import { getUsersAsync } from '../../redux/actions/usersAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersReducer);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsersAsync());
    }
  }, []);

  return (
    <main className={styles.adminPage}>
      <h3 className={styles.title}>Admin control</h3>
      <AdminTable />
    </main>
  );
};
