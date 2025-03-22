import { createApp as r, h as m } from "vue";
import { V as d } from "./Toast-DOn1agdy.js";
const s = {}, e = {
  /**
   * Shows a toast notification with the given props
   */
  show: (t) => {
    const o = document.createElement("div");
    document.body.appendChild(o);
    const n = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, i = r({
      render() {
        return m(d, {
          ...t,
          onHide: () => {
            t.onHide && t.onHide(), e.dismiss(n);
          }
        });
      }
    });
    return s[n] = { app: i, element: o }, i.mount(o), n;
  },
  /**
   * Shows a success toast notification
   */
  success: (t, o) => e.show({
    message: t,
    type: "success",
    position: "bottom-right",
    duration: 3e3,
    ...o
  }),
  /**
   * Shows an error toast notification
   */
  error: (t, o) => e.show({
    message: t,
    type: "error",
    position: "bottom-right",
    duration: 4e3,
    ...o
  }),
  /**
   * Shows an info toast notification
   */
  info: (t, o) => e.show({
    message: t,
    type: "info",
    position: "bottom-right",
    duration: 3e3,
    ...o
  }),
  /**
   * Dismisses a specific toast by ID
   */
  dismiss: (t) => {
    const o = s[t];
    o && (o.app.unmount(), setTimeout(() => {
      document.body.contains(o.element) && document.body.removeChild(o.element);
    }, 100), delete s[t]);
  },
  /**
   * Dismisses all active toasts
   */
  dismissAll: () => {
    Object.keys(s).forEach((t) => e.dismiss(t));
  }
};
export {
  d as VueToast,
  e as toast
};
//# sourceMappingURL=vue.js.map
