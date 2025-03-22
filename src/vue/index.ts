import { createApp, h } from 'vue';
import VueToast from './Toast.vue';
import type { ToastProps } from '../types.js';

// Store for tracking active toast apps
interface ToastApp {
  app: ReturnType<typeof createApp>;
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
const toastApps: Record<string, ToastApp> = {};

// Main toast API object
const toast: ToastAPI = {
  /**
   * Shows a toast notification with the given props
   */
  show: (props: ToastProps & { theme?: 'light' | 'dark' | 'auto' }) => {
    // Create mount element for the toast
    const toastElement = document.createElement('div');
    document.body.appendChild(toastElement);

    // Generate unique ID for this toast instance
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create Vue app
    const app = createApp({
      render() {
        return h(VueToast, {
          ...props,
          onHide: () => {
            // Chain the original onHide if provided
            if (props.onHide) {
              props.onHide();
            }

            // Clean up this toast
            toast.dismiss(id);
          }
        });
      }
    });

    // Store references for cleanup
    toastApps[id] = { app, element: toastElement };

    // Mount Vue app
    app.mount(toastElement);

    return id;
  },

  /**
   * Shows a success toast notification
   */
  success: (
    message: string,
    options?: ToastOptions
  ) => {
    return toast.show({
      message,
      type: 'success',
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
    return toast.show({
      message,
      type: 'error',
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
    return toast.show({
      message,
      type: 'info',
      position: 'bottom-right',
      duration: 3000,
      ...options
    });
  },

  /**
   * Dismisses a specific toast by ID
   */
  dismiss: (id: string) => {
    const toastApp = toastApps[id];
    if (toastApp) {
      // Unmount Vue app
      toastApp.app.unmount();

      // Remove the DOM element with a small delay to allow animations to complete
      setTimeout(() => {
        if (document.body.contains(toastApp.element)) {
          document.body.removeChild(toastApp.element);
        }
      }, 100);

      // Remove from tracking object
      delete toastApps[id];
    }
  },

  /**
   * Dismisses all active toasts
   */
  dismissAll: () => {
    Object.keys(toastApps).forEach(id => toast.dismiss(id));
  }
};

export { VueToast, toast };
export type { ToastProps };