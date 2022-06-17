import * as React from 'react';
import styles from './AdminTable.module.scss';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { AdminControls } from '..';
import { MOCK_DATA } from '../../mock/mock_data';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: '_id',
    filterable: false,
    hideable: false,
    headerName: 'ID',
    width: 220,
  },
  {
    field: 'admin',
    headerName: 'Privilege',
    filterable: false,
    hideable: false,
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params: GridValueGetterParams) => `${params.row.isAdmin ? 'Admin' : 'User'} `,
    width: 100,
  },
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
  //const { users } = useAppSelector((state) => state.usersDataReducer);
  //const [test] = useState(users);

  return (
    <Box className={styles.wrapper}>
      <AdminControls arrIds={arrIds} />
      <DataGrid
        className={styles.adminTableWrapper}
        rows={MOCK_DATA}
        columns={columns}
        pageSize={MOCK_DATA.length}
        rowsPerPageOptions={[MOCK_DATA.length]}
        getRowId={(MOCK_DATA) => MOCK_DATA.id}
        checkboxSelection
        hideFooter={true}
        scrollbarSize={50}
        onSelectionModelChange={(ids) => setArrIds(ids)}
      />
    </Box>
  );
};
