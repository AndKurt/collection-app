import React, { useEffect } from 'react';
import { checkAuthAsync } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/hooks';
import styles from './CollectionPage.module.scss';

export const CollectionPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync()).unwrap();
    }
  }, []);

  return <main className={styles.collectionPage}>CollectionPage</main>;
};
