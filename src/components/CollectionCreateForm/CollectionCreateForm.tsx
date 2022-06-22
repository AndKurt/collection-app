import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './CollectionCreateForm.module.scss';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ICollectForm {
  collectionTitle: string;
  collectionDescription: string;
  country: string;
  city: string;
  date: string;
}

export const CollectionCreateForm = () => {
  const { register, handleSubmit, control } = useForm<ICollectForm>({
    defaultValues: {
      collectionTitle: '',
      collectionDescription: '',
      country: '',
      city: '',
      date: '',
    },
  });

  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState<Date | null>(null);
  //const onChangeDate = (dates: [Date, Date | null]) => {
  //  const [start, end] = dates;
  //  setStartDate(start);
  //  setEndDate(end);
  //};
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), null]);
  const [startDate, endDate] = dateRange;

  const handleCreateCollection = (data: ICollectForm) => {
    console.log(data);
  };

  return (
    <div>
      <h4 className={styles.title}>Create new collection</h4>
      <form onSubmit={handleSubmit(handleCreateCollection)}>
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12}>
            <TextField
              {...register('collectionTitle')}
              required
              id="collectionTitle"
              name="collectionTitle"
              label="Collection title"
              fullWidth
              autoComplete="Input title..."
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('collectionDescription')}
              required
              id="collectionDescription"
              name="collectionDescription"
              label="Collection description"
              multiline
              rows={3}
              fullWidth
              autoComplete="Input description..."
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('country')}
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city')}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="filled"
            />
          </Grid>
          {/*<Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>*/}
          <div className={styles.helper}>
            <h5 className={styles.title}>Date of your journey</h5>
            <Controller
              name={'date'}
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    selected={startDate}
                    onChange={(e) => {
                      setDateRange(e);
                      field.onChange(e);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    selectsRange
                    wrapperClassName={styles.dataPicker}
                  />
                );
              }}
            ></Controller>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};
