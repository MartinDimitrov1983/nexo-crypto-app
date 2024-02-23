import React, { ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { Button, Loading } from '../';
import { CLOSE, MODAL_ROOT } from '../../constants';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    header: string;
    isLoading: boolean;
}

const Modal = ({
    isOpen,
    onClose,
    header,
    isLoading,
    children,
}: ModalProps) => {
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        if (target.classList.contains(styles.modalOverlay)) {
            onClose();
        }
    };

    return isOpen
        ? ReactDOM.createPortal(
              <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                  <div className={styles.modal}>
                      <div className={styles.modalContent}>
                          <p className={styles.modalHeader}>{header}</p>
                          <div className={styles.modalBody}>
                              {isLoading && <Loading />}
                              {children}
                          </div>
                          <div className={styles.modalFooter}>
                              <Button onClick={onClose}>{CLOSE}</Button>
                          </div>
                      </div>
                  </div>
              </div>,
              document.getElementById(MODAL_ROOT) as HTMLElement,
          )
        : null;
};

export default Modal;
