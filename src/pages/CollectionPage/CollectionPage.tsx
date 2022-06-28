import { Grid, Paper, styled, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardForCollection, Loader } from '../../components';
import { checkAuthAsync } from '../../redux/actions/authActions';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './CollectionPage.module.scss';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'auto',
  lineHeight: '60px',
  padding: '10px',
}));

export const CollectionPage = () => {
  const { collectionId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, collections } = useAppSelector((state) => state.collectionReducer);
  const collection = collectionId ? collections.find((e) => e._id === collectionId) : null;

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuthAsync());
    }
    if (!collections.length) {
      dispatch(getCollectionsAsync());
    }
  }, []);

  return (
    <main className={clsx(styles.collectionPage, isLoading && styles.isLoading)}>
      {isLoading && <Loader />}
      {!collectionId && (
        <>
          <h3 className={styles.title}>Collections</h3>
          <Grid container spacing={2} sx={{ padding: '15px' }}>
            {collections.length > 0 &&
              collections.map((collection) => {
                return (
                  <Grid
                    key={collection._id}
                    item
                    xs
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <CardForCollection
                      key={collection._id}
                      _id={collection._id}
                      ownerId={collection.ownerId}
                      ownerName={collection.ownerName}
                      collectionTitle={collection.collectionTitle}
                      collectionDescription={collection.collectionDescription}
                      country={collection.country}
                      city={collection.city}
                      date={collection.date}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
      {collectionId && collection && (
        <>
          <Item elevation={12}>
            <Typography variant="h3">{collection.collectionTitle}</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {collection.collectionDescription}
            </Typography>
            <Typography variant="body2" component="div">
              Country: {collection.country}
              <br />
              City: {collection.city}
              <br />
              Visit dates: {collection.date.join('-')}
              <br />
              Author: {collection.ownerName}
            </Typography>
          </Item>
        </>
      )}
    </main>
  );
};
