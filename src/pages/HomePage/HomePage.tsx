import { Box, Grid } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Loader, RecentlyPost, SimpleCardCollection } from '../../components';
import { checkAuthAsync } from '../../redux/actions/authActions';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';
import { getUsersAsync } from '../../redux/actions/usersAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { collections, isLoading: isLodingCollections } = useAppSelector(
    (state) => state.collectionReducer
  );
  const { isLoading: isLoadingUsers } = useAppSelector((state) => state.usersReducer);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync()).unwrap();
    }
  }, []);

  useEffect(() => {
    dispatch(getCollectionsAsync());
    dispatch(getUsersAsync());
  }, []);

  return (
    <main
      className={clsx(styles.homePage, (isLoadingUsers || isLodingCollections) && styles.isLoading)}
    >
      {isLodingCollections || isLoadingUsers ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '5px',
              padding: '5px',
              marginBottom: '20px',
            }}
          >
            <h3 className={styles.title}>Recently added places</h3>
            <Grid container spacing={0.5} columns={{ md: 30 }} justifyContent="center">
              <RecentlyPost
                title={'Nemiga'}
                nameCollection={'Minsk'}
                author={'Andrei'}
                image={''}
                imageLabel={'nemiga'}
              />
              <RecentlyPost
                title={'Nemiga'}
                nameCollection={'Minsk'}
                author={'Andrei'}
                image={''}
                imageLabel={'nemiga'}
              />
              <RecentlyPost
                title={'Nemiga'}
                nameCollection={'Minsk'}
                author={'Andrei'}
                image={''}
                imageLabel={'nemiga'}
              />
              <RecentlyPost
                title={'Nemiga'}
                nameCollection={'Minsk'}
                author={'Andrei'}
                image={''}
                imageLabel={'nemiga'}
              />
              <RecentlyPost
                title={'Nemiga'}
                nameCollection={'Minsk'}
                author={'Andrei'}
                image={''}
                imageLabel={'nemiga'}
              />
            </Grid>
          </Box>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '5px',
              padding: '5px',
              marginBottom: '20px',
            }}
          >
            <h3 className={styles.title}>Most popular collections</h3>
            <Grid container spacing={1} columns={{ md: 0 }} justifyContent="center">
              {collections.length > 0 &&
                collections.slice(0, 5).map((collection, index) => {
                  return (
                    <SimpleCardCollection
                      key={collection.collectionDescription + index}
                      ownerName={collection.ownerName as string}
                      collectionTitle={collection.collectionTitle}
                      collectionDescription={collection.collectionDescription}
                      numOfItems={0}
                    />
                  );
                })}
            </Grid>
          </Box>
        </>
      )}
    </main>
  );
};
