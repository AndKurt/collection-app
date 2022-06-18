import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { RecentlyPost } from '../../components';
import { checkAuthAsync } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/hooks';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync()).unwrap();
    }
  }, []);

  return (
    <main className={styles.homePage}>
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
    </main>
  );
};
