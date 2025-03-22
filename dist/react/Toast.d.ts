import { default as React } from 'react';
import { ToastProps } from '../types.js';

export declare const ReactToast: React.FC<ToastProps & {
    theme?: 'light' | 'dark' | 'auto';
}>;
