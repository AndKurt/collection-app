import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICollection } from '../../interface/collections';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteCollectionAsync } from '../../redux/actions/collectionActions';
import { CollectionCreateForm, Modal } from '..';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface ICardForCollection extends ICollection {
  isPersonalPage?: boolean;
}

export const CardForCollection = ({
  _id: id,
  ownerId,
  ownerName,
  collectionTitle,
  collectionDescription,
  country,
  city,
  date,
  isPersonalPage,
}: ICardForCollection) => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.authReducer);
  const [isEditCollection, setIsEditCollection] = useState(false);

  const handleEditCollection = () => {
    setIsEditCollection(true);
  };
  const handleDeleteCollection = () => {
    dispatch(deleteCollectionAsync(id as string));
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }} id={id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {collectionTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {collectionDescription}
        </Typography>
        <Typography paragraph component="div" marginBottom={0}>
          Country: {country}
        </Typography>
        <Typography paragraph component="div" marginBottom={0}>
          City: {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visit dates: {date.join('-')}
        </Typography>
        {isAdmin && (
          <Typography variant="body2" color="text.secondary">
            Author: {ownerName}
          </Typography>
        )}
      </CardContent>
      {isPersonalPage && (
        <Button
          size="small"
          variant="contained"
          sx={{ position: 'absolute', top: 10, right: 10 }}
          color="success"
        >
          <AddIcon /> Add item
        </Button>
      )}
      <CardActions>
        <Button size="small" onClick={handleEditCollection}>
          Edit
        </Button>
        <Button size="small" onClick={handleDeleteCollection}>
          Delete
        </Button>
        <Link to={`/collection/${id}`}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
      <Modal open={isEditCollection} onClose={() => setIsEditCollection(false)}>
        {
          <CollectionCreateForm
            setModal={setIsEditCollection}
            id={id}
            ownerId={ownerId}
            collectionTitle={collectionTitle}
            collectionDescription={collectionDescription}
            country={country}
            city={city}
            date={date}
          />
        }
      </Modal>
    </Card>
  );
};
