import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { checkAuthAsync } from '../../redux/actions/authActions';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './CollectionPage.module.scss';

export const CollectionPage = () => {
  const { collectionId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, collections } = useAppSelector((state) => state.collectionReducer);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync()).unwrap();
    }
    if (!collections.length) {
      dispatch(getCollectionsAsync());
    }
  }, []);

  return (
    <main className={styles.collectionPage}>
      <h3 className={styles.title}>Collections</h3>
      {isLoading && <Loader />}
    </main>
  );
};
