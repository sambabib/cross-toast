import { ToastProps } from '../types.js';

export type ToastOptions = Partial<Omit<ToastProps, 'message' | 'type'>> & {
    theme?: 'light' | 'dark' | 'auto';
};
export interface ToastAPI {
    show: (props: ToastProps & {
        theme?: 'light' | 'dark' | 'auto';
    }) => string;
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
    info: (message: string, options?: ToastOptions) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
export declare const toast: ToastAPI;
