import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactToast } from './Toast.tsx';
import type { ToastProps, ToastType } from '../types';

// Store for tracking active toast roots
interface ToastRoot {
  root: ReturnType<typeof createRoot>;
  element: HTMLElement;
}

// Toast option types
export type ToastOptions = Partial<Omit<ToastProps, 'message' | 'type'>> & {
  theme?: 'light' | 'dark' | 'auto'
};

// Define the toast API interface
export interface ToastAPI {
  show: (props: ToastProps & { theme?: 'light' | 'dark' | 'auto' }) => string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// Keep track of all active toasts
const toastRoots: Record<string, ToastRoot> = {};

// Main toast API implementation
const toastImpl: ToastAPI = {
  /**
   * Shows a toast notification with the given props
   */
  show: (props: ToastProps & { theme?: 'light' | 'dark' | 'auto' }) => {
    // Create mount element for the toast
    const toastElement = document.createElement('div');
    document.body.appendChild(toastElement);

    // Generate unique ID for this toast instance
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create React root
    const root = createRoot(toastElement);

    // Store references for cleanup
    toastRoots[id] = { root, element: toastElement };

    // Create props with onHide handler
    const toastProps = {
      ...props,
      onHide: () => {
        // Chain the original onHide if provided
        if (props.onHide) {
          props.onHide();
        }

        // Clean up this toast
        toastImpl.dismiss(id);
      }
    };

    // Render toast component
    root.render(React.createElement(ReactToast, toastProps));

    return id;
  },

  /**
   * Shows a success toast notification
   */
  success: (
    message: string,
    options?: ToastOptions
  ) => {
    return toastImpl.show({
      message,
      type: 'success' as ToastType,
      position: 'bottom-right',
      duration: 3000,
      ...options
    });
  },

  /**
   * Shows an error toast notification
   */
  error: (
    message: string,
    options?: ToastOptions
  ) => {
    return toastImpl.show({
      message,
      type: 'error' as ToastType,
      position: 'bottom-right',
      duration: 4000,
      ...options
    });
  },

  /**
   * Shows an info toast notification
   */
  info: (
    message: string,
    options?: ToastOptions
  ) => {
    return toastImpl.show({
      message,
      type: 'info' as ToastType,
      position: 'bottom-right',
      duration: 3000,
      ...options
    });
  },

  /**
   * Dismisses a specific toast by ID
   */
  dismiss: (id: string) => {
    const toastRoot = toastRoots[id];
    if (toastRoot) {
      // Unmount React component
      toastRoot.root.unmount();

      // Remove the DOM element with a small delay to allow animations to complete
      setTimeout(() => {
        if (document.body.contains(toastRoot.element)) {
          document.body.removeChild(toastRoot.element);
        }
      }, 100);

      // Remove from tracking object
      delete toastRoots[id];
    }
  },

  /**
   * Dismisses all active toasts
   */
  dismissAll: () => {
    Object.keys(toastRoots).forEach(id => toastImpl.dismiss(id));
  }
};

// Export the toast API
export const toast = toastImpl; 