export type ToastType = 'success' | 'error' | 'info';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ToastTheme = 'light' | 'dark' | 'auto';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  theme?: ToastTheme;
  onHide?: () => void;
} 