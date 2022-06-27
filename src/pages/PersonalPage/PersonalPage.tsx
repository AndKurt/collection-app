import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './PersonalPage.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { CardForCollection, CollectionCreateForm, Loader, Modal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';
import { getCurrentUserIdJWT } from '../../utils/jwt';

export const PersonalPage = () => {
  const [isCreateCollectionForm, setIsCreateCollectionForm] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, collections } = useAppSelector((state) => state.collectionReducer);
  const { isAdmin } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (!collections.length) {
      dispatch(getCollectionsAsync());
    }
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
          collections
            .filter((collection) => {
              if (isAdmin) {
                return collection;
              } else {
                return collection.ownerId === getCurrentUserIdJWT();
              }
            })
            .map((collection) => (
              <Grid key={collection._id} item xs sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardForCollection
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
            ))}
      </Grid>
    </main>
  );
};
