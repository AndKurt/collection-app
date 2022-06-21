import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

interface IModal {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: IModal) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};
