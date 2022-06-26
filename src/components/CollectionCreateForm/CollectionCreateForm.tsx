import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './CollectionCreateForm.module.scss';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createCollectionAsync } from '../../redux/actions/collectionActions';
import { ICollection } from '../../interface/collections';
import { getCurrentUserIdJWT } from '../../utils/jwt';
import { convertDate } from '../../utils/convertDate';

interface ICollectForm {
  collectionTitle: string;
  collectionDescription: string;
  country: string;
  city: string;
  date: [Date | string, Date | null | string];
}

type CollectionCreateFormType = {
  setModal: (value: boolean) => void;
  id?: string;
  ownerId?: string;
  collectionTitle?: string;
  collectionDescription?: string;
  country?: string;
  city?: string;
  date?: [string | Date, string | Date | null];
};

export const CollectionCreateForm = ({
  setModal,
  id,
  ownerId,
  collectionTitle,
  collectionDescription,
  country,
  city,
  date,
}: CollectionCreateFormType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICollectForm>({
    defaultValues: {
      collectionTitle: '',
      collectionDescription: '',
      country: '',
      city: '',
    },
  });
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), null]);
  const [startDate, endDate] = dateRange;

  const handleCreateCollection = (data: ICollectForm) => {
    const createData: ICollection = {
      ownerId: getCurrentUserIdJWT() as string,
      collectionTitle: data.collectionTitle,
      collectionDescription: data.collectionDescription,
      country: data.country,
      city: data.city,
      date: [convertDate(data.date[0]), convertDate(data.date[1])],
    };
    dispatch(createCollectionAsync(createData));
    setModal(false);
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
              value={collectionTitle}
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
              value={collectionDescription}
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
              value={country}
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
              value={city}
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
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
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
                    {errors.date && (
                      <div className={styles.error_msg}>Please fill date of your journey</div>
                    )}
                  </>
                );
              }}
            ></Controller>
            <Button variant="contained" type="submit">
              {id ? 'Edit' : 'Create'}
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};
