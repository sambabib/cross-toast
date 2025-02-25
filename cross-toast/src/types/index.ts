export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
message: string;
type?: ToastType;
duration?: number;
onHide?: () => void;
}