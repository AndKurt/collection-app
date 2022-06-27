import React from 'react';
import styles from './AdminTable.module.scss';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { AdminControls, Loader } from '..';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: '_id',
    filterable: false,
    hideable: false,
    headerName: 'ID',
    width: 210,
  },
  {
    field: 'admin',
    headerName: 'Privilege',
    filterable: false,
    hideable: false,
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params: GridValueGetterParams) => `${params.row.isAdmin ? 'Admin' : 'User'} `,
    width: 70,
  },
  { field: 'login', hideable: false, headerName: 'Login name', width: 90 },
  { field: 'firstName', hideable: false, headerName: 'First name', width: 90 },
  { field: 'lastName', hideable: false, headerName: 'Last name', width: 90 },
  { field: 'email', sortable: false, headerName: 'E-mail', width: 220 },
  {
    field: 'fullName',
    hideable: false,
    headerName: 'Full name',
    width: 220,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    filterable: false,
    hideable: false,
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.isLocked ? 'Blocked' : 'Unblocked'} `,
    width: 100,
  },
];

export const AdminTable = () => {
  const [arrIds, setArrIds] = useState<GridRowId[]>([]);
  const { isLoading, users } = useAppSelector((state) => state.usersReducer);

  return (
    <Box className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AdminControls arrIds={arrIds} />
          <DataGrid
            className={styles.adminTableWrapper}
            rows={users}
            columns={columns}
            pageSize={users.length}
            rowsPerPageOptions={[users.length]}
            getRowId={(users) => users._id}
            checkboxSelection
            hideFooter={true}
            scrollbarSize={50}
            onSelectionModelChange={(ids) => setArrIds(ids)}
          />
        </>
      )}
    </Box>
  );
};
