import React from 'react';
import styles from './AdminControls.module.scss';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { Button, ButtonGroup } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { getCurrentUserIdJWT } from '../../../utils/jwt';
import { logoutUserAsync } from '../../../redux/actions/authActions';
import { deleteUserAsync, updateUserAsync } from '../../../redux/actions/usersAction';

interface IAdminControls {
  arrIds: GridRowId[];
}

export const AdminControls = ({ arrIds }: IAdminControls) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const currentUserId = getCurrentUserIdJWT();

  const logOutUser = () => {
    const activeUserId = arrIds.find((id) => id === currentUserId);
    if (activeUserId) {
      dispatch(logoutUserAsync());
      navigation('/login');
    }
  };

  const handleDelete = () => {
    if (arrIds.length > 0) {
      arrIds.forEach((id) => {
        dispatch(deleteUserAsync(id as string));
      });
    }
    logOutUser();
  };

  const handleUnlock = () => {
    if (arrIds.length > 0) {
      arrIds.forEach((id) => {
        dispatch(
          updateUserAsync({
            _id: id as string,
            isLocked: false,
            currentId: currentUserId as string,
          })
        );
      });
    }
  };
  const handleLock = () => {
    if (arrIds.length > 0) {
      arrIds.forEach((id) => {
        dispatch(
          updateUserAsync({
            _id: id as string,
            isLocked: true,
            currentId: currentUserId as string,
          })
        );
      });

      logOutUser();
    }
  };

  const handleAddAdminRole = () => {
    if (arrIds.length > 0) {
      if (arrIds.length > 0) {
        arrIds.forEach((id) => {
          dispatch(
            updateUserAsync({
              _id: id as string,
              isAdmin: true,
              currentId: currentUserId as string,
            })
          );
        });
      }
    }
  };

  const handleRemoveAdminRole = () => {
    if (arrIds.length > 0) {
      arrIds.forEach((id) => {
        dispatch(
          updateUserAsync({
            _id: id as string,
            isAdmin: false,
            currentId: currentUserId as string,
          })
        );
      });
    }
    logOutUser();
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
