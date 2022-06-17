import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface IRecentlyPost {
  title: string;
  nameCollection: string;
  author: string;
  image: string;
  imageLabel: string;
}

export const RecentlyPost = ({
  title,
  nameCollection,
  author,
  image,
  imageLabel,
}: IRecentlyPost) => {
  return (
    <Grid item xs={12} md={6} sx={{ padding: '5px' }}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1, padding: '5px' }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Collection: {nameCollection}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Author: {author}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={image}
            alt={imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};
