import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './PersonalPage.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { CardForCollection, CollectionCreateForm, Loader, Modal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';

export const PersonalPage = () => {
  const [isCreateCollectionForm, setIsCreateCollectionForm] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, collections } = useAppSelector((state) => state.collectionReducer);

  useEffect(() => {
    dispatch(getCollectionsAsync());
  }, []);

  return (
    <main className={styles.personalPage}>
      <h3 className={styles.title}>Manage your collections</h3>
      <Button variant="contained" onClick={() => setIsCreateCollectionForm(true)}>
        <AddIcon /> New collection
      </Button>
      <Modal open={isCreateCollectionForm} onClose={() => setIsCreateCollectionForm(false)}>
        {<CollectionCreateForm setModal={setIsCreateCollectionForm} />}
      </Modal>
      {isLoading && <Loader />}
      <Grid container spacing={2} sx={{ padding: '15px' }}>
        {collections.length > 0 &&
          collections.map((collection) => (
            <Grid key={collection._id} item xs sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardForCollection
                _id={collection._id}
                ownerId={collection.ownerId}
                collectionTitle={collection.collectionTitle}
                collectionDescription={collection.collectionDescription}
                country={collection.country}
                city={collection.city}
                date={collection.date}
              />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};
