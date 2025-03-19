import React from 'react';
import { toast } from '../src/react';

/**
 * Example component demonstrating the usage of the toast API
 */
const ToastExample: React.FC = () => {
  const showSuccessToast = () => {
    toast.success('Operation completed successfully!');
  };

  const showErrorToast = () => {
    toast.error('Something went wrong!', {
      position: 'top-right',
      duration: 5000,
    });
  };

  const showInfoToast = () => {
    toast.info('Did you know? This is an info message.', {
      theme: 'dark',
    });
  };

  const showCustomToast = () => {
    toast.show({
      message: 'This is a custom toast with custom options!',
      type: 'success',
      position: 'top-left',
      duration: 4000,
      theme: 'light',
    });
  };

  const dismissAllToasts = () => {
    toast.dismissAll();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Toast Examples</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <button onClick={showSuccessToast}>Show Success Toast</button>
        <button onClick={showErrorToast}>Show Error Toast</button>
        <button onClick={showInfoToast}>Show Info Toast</button>
        <button onClick={showCustomToast}>Show Custom Toast</button>
        <button onClick={dismissAllToasts}>Dismiss All Toasts</button>
      </div>
    </div>
  );
};

export default ToastExample; 