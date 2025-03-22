import React, { useState, useEffect, useRef } from 'react';
import type { ToastProps } from '../types.js';
import styles from './Toast.module.css';

export const ReactToast: React.FC<ToastProps & { theme?: 'light' | 'dark' | 'auto' }> = ({
  message,
  type = 'success',
  duration = 3000,
  position = 'bottom-right',
  theme = 'auto',
  onHide,
}) => {
  // Initialize as not visible to allow for entry animation
  const [isVisible, setIsVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Trigger the entry animation after a brief delay to ensure the initial state is set
    const entryTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Set up exit timer
    timerRef.current = setTimeout(() => {
      setExiting(true);
      // After the exit animation completes, we fully remove the toast
      setTimeout(() => {
        setMounted(false);
        onHide?.();
      }, 350); // Match the duration of the exit animation
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(entryTimer);
    };
  }, [duration, onHide]);

  if (!mounted) return null;

  // Convert kebab-case position to camelCase for CSS modules
  const positionClass = position.replace(/-([a-z])/g, g => g[1].toUpperCase());

  // Apply theme class if not auto
  const themeClass = theme !== 'auto' ? styles[theme] : '';

  return (
    <div
      className={`${styles.toastContainer} ${styles[positionClass]} ${isVisible ? styles.visible : ''} ${themeClass}`}
    >
      <div className={`${styles.toastContent} ${styles[type]} ${exiting ? styles.exit : ''}`}>
        {message}
      </div>
    </div>
  );
};