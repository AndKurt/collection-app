import { Button } from '@mui/material';
import React, { useState } from 'react';
import styles from './PersonalPage.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { Modal, SearchBar } from '../../components';

export const PersonalPage = () => {
  const [isCreateCollectionForm, setIsCollectionForm] = useState(false);

  return (
    <main className={styles.personalPage}>
      <h3 className={styles.title}>Manage your collections</h3>
      <Button variant="contained" onClick={() => setIsCollectionForm(true)}>
        <AddIcon /> New collection
      </Button>
      <Modal open={isCreateCollectionForm} onClose={() => setIsCollectionForm(false)}>
        {<SearchBar />}
      </Modal>
    </main>
  );
};
