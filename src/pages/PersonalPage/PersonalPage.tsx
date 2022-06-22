import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './PersonalPage.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { CollectionCreateForm, Loader, Modal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCollectionsAsync } from '../../redux/actions/collectionActions';
import { getCurrentUserIdJWT } from '../../utils/jwt';

export const PersonalPage = () => {
  const [isCreateCollectionForm, setIsCollectionForm] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, collections } = useAppSelector((state) => state.collectionReducer);

  useEffect(() => {
    dispatch(getCollectionsAsync());
  }, []);

  console.log(collections.filter((collection) => collection.ownerId === getCurrentUserIdJWT()));

  return (
    <main className={styles.personalPage}>
      <h3 className={styles.title}>Manage your collections</h3>
      <Button variant="contained" onClick={() => setIsCollectionForm(true)}>
        <AddIcon /> New collection
      </Button>
      <Modal open={isCreateCollectionForm} onClose={() => setIsCollectionForm(false)}>
        {<CollectionCreateForm setIsCollectionForm={setIsCollectionForm} />}
      </Modal>
      {isLoading && <Loader />}
    </main>
  );
};
