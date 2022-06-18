import React from 'react';
import styles from './AdminControls.module.scss';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { Button, ButtonGroup } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
//import { usersDataSlice } from '../../redux/reducers/usersData';
//import { deleteUserApi } from '../../redux/actions/deleteUser';
//import { updateUserApi } from '../../redux/actions/updateUser';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { getCurrentUserIdJWT } from '../../../utils/jwt';
import { logoutUserAsync } from '../../../redux/actions/authActions';
//import { loginSlice } from '../../redux/reducers/loginSlice';

interface IAdminControls {
  arrIds: GridRowId[];
}

export const AdminControls = ({ arrIds }: IAdminControls) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  //const { setUsersStatusUnlock, setUsersStatusLock, deleteUsers } = usersDataSlice.actions;
  //const { setTokenStatus } = loginSlice.actions;

  const logOutUser = () => {
    const currentUserId = getCurrentUserIdJWT();
    const activeUserId = arrIds.find((id) => id === currentUserId);
    if (activeUserId) {
      dispatch(logoutUserAsync());
      navigation('/login');
    }
  };

  const handleDelete = () => {
    if (arrIds.length > 0) {
      //dispatch(deleteUsers(arrIds));
      //arrIds.forEach((id) => dispatch(deleteUserApi(id as string)));
    }
    logOutUser();
  };
  const handleUnlock = () => {
    if (arrIds.length > 0) {
      //dispatch(setUsersStatusUnlock(arrIds));
      //arrIds.forEach((id) => dispatch(updateUserApi({ id: id as string, isLocked: false })));
    }
  };
  const handleLock = () => {
    if (arrIds.length > 0) {
      //dispatch(setUsersStatusLock(arrIds));
      //arrIds.forEach((id) => dispatch(updateUserApi({ id: id as string, isLocked: true })));
      logOutUser();
    }
  };

  const handleAddAdminRole = () => {
    if (arrIds.length > 0) {
      //dispatch(setUsersStatusLock(arrIds));
      //arrIds.forEach((id) => dispatch(updateUserApi({ id: id as string, isLocked: true })));
    }
  };

  const handleRemoveAdminRole = () => {
    if (arrIds.length > 0) {
      //dispatch(setUsersStatusLock(arrIds));
      //arrIds.forEach((id) => dispatch(updateUserApi({ id: id as string, isLocked: true })));
      logOutUser();
    }
  };

  return (
    <ButtonGroup className={styles.adminControls} variant="outlined" orientation="vertical">
      <Button color="error" size="small" sx={{ width: '200px' }} onClick={handleDelete}>
        <DeleteForeverTwoToneIcon />
        Delete
      </Button>
      <Button color="success" size="small" sx={{ width: '200px' }} onClick={handleUnlock}>
        <LockOpenTwoToneIcon />
        Unblock
      </Button>
      <Button color="warning" size="small" sx={{ width: '200px' }} onClick={handleLock}>
        <LockTwoToneIcon />
        Block
      </Button>
      <Button color="success" size="small" sx={{ width: '200px' }} onClick={handleAddAdminRole}>
        <LockOpenTwoToneIcon />
        Add admin role
      </Button>
      <Button color="warning" size="small" sx={{ width: '200px' }} onClick={handleRemoveAdminRole}>
        <LockTwoToneIcon />
        Remove admin role
      </Button>
    </ButtonGroup>
  );
};
