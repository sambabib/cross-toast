import { ToastProps, ToastPosition } from '../types.js';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    message: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: () => ToastProps["type"];
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: () => ToastPosition;
        default: string;
    };
    theme: {
        type: () => "light" | "dark" | "auto";
        default: string;
    };
}>, {
    show: import('vue').Ref<boolean, boolean>;
    isVisible: import('vue').Ref<boolean, boolean>;
    exiting: import('vue').Ref<boolean, boolean>;
    onAfterLeave: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "hide"[], "hide", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    message: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: () => ToastProps["type"];
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: () => ToastPosition;
        default: string;
    };
    theme: {
        type: () => "light" | "dark" | "auto";
        default: string;
    };
}>> & Readonly<{
    onHide?: ((...args: any[]) => any) | undefined;
}>, {
    type: import('../types.js').ToastType | undefined;
    duration: number;
    position: ToastPosition;
    theme: "light" | "dark" | "auto";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
