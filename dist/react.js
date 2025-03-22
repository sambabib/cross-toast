import { R as d } from "./Toast-CJl_eDpI.js";
import u from "react";
import l from "react-dom";
var i, n = l;
if (process.env.NODE_ENV === "production")
  i = n.createRoot, n.hydrateRoot;
else {
  var m = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  i = function(t, o) {
    m.usingClientEntryPoint = !0;
    try {
      return n.createRoot(t, o);
    } finally {
      m.usingClientEntryPoint = !1;
    }
  };
}
const r = {}, e = {
  /**
   * Shows a toast notification with the given props
   */
  show: (t) => {
    const o = document.createElement("div");
    document.body.appendChild(o);
    const s = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, a = i(o);
    r[s] = { root: a, element: o };
    const c = {
      ...t,
      onHide: () => {
        t.onHide && t.onHide(), e.dismiss(s);
      }
    };
    return a.render(u.createElement(d, c)), s;
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
    const o = r[t];
    o && (o.root.unmount(), setTimeout(() => {
      document.body.contains(o.element) && document.body.removeChild(o.element);
    }, 100), delete r[t]);
  },
  /**
   * Dismisses all active toasts
   */
  dismissAll: () => {
    Object.keys(r).forEach((t) => e.dismiss(t));
  }
}, p = e;
export {
  d as ReactToast,
  p as toast
};
//# sourceMappingURL=react.js.map
