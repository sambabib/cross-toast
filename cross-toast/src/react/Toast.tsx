import React, { useState, useEffect, useRef } from 'react';
import type { ToastProps } from '../types';
import styles from './Toast.module.css';

export const ReactToast: React.FC<ToastProps & { theme?: 'light' | 'dark' | 'auto' }> = ({
  message,
  type = 'success',
  duration = 3000,
  position = 'bottom-right',
  theme = 'auto',
  onHide,
}) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setExiting(true);
      // After the exit animation completes, we fully remove the toast
      setTimeout(() => {
        setVisible(false);
        onHide?.();
      }, 500); // Match the duration of the fadeOut animation
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, onHide]);

  if (!visible) return null;

  // Convert kebab-case position to camelCase for CSS modules
  const positionClass = position.replace(/-([a-z])/g, g => g[1].toUpperCase());

  // Apply theme class if not auto
  const themeClass = theme !== 'auto' ? styles[theme] : '';

  return (
    <div
      className={`${styles.toastContainer} ${styles[positionClass]} ${visible ? styles.visible : ''} ${themeClass}`}
    >
      <div className={`${styles.toastContent} ${styles[type]} ${exiting ? styles.exit : ''}`}>
        {message}
      </div>
    </div>
  );
};