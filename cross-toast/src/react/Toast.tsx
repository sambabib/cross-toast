import { useState, useEffect } from 'react';
import type { ToastProps } from '../types';
import styles from './Toast.module.css';

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onHide,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onHide]);

  return (
    <div className={[styles.toastContainer, visible ? styles.visible : ''].join(' ')}>
      <div className={[styles.toastContent, styles[type]].join(' ')}>{message}</div>
    </div>
  );
};