import React, { useState, useEffect } from 'react';
import type { ToastProps } from '../types';
import styles from './Toast.module.css';

export const ReactToast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  position = 'bottom-right',
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

  if (!visible) return null;

  // Convert kebab-case position to camelCase for CSS modules
  const positionClass = position.replace(/-([a-z])/g, g => g[1].toUpperCase());

  return (
    <div
      className={`${styles.toastContainer} ${styles[positionClass]} ${visible ? styles.visible : ''}`}
    >
      <div className={`${styles.toastContent} ${styles[type]}`}>{message}</div>
    </div>
  );
};