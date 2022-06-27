import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

interface ISimpleCardCollection {
  ownerName: string;
  collectionTitle: string;
  collectionDescription: string;
  numOfItems: number;
}

export const SimpleCardCollection = ({
  ownerName,
  collectionTitle,
  collectionDescription,
  numOfItems,
}: ISimpleCardCollection) => {
  return (
    <Grid item xs={12} md={6} sx={{ padding: '5px' }}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1, padding: '5px' }}>
            <Typography component="h2" variant="h6">
              Collection: {collectionTitle}
            </Typography>
            <Typography paragraph marginBottom={0}>
              Description: {collectionDescription}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Owner: {ownerName}
            </Typography>
            <Typography marginBottom={0} variant="subtitle1" color="text.secondary">
              Items: {numOfItems}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
