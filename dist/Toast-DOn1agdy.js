import { defineComponent as l, ref as r, onMounted as p, onBeforeUnmount as m, createElementBlock as c, createCommentVNode as d, openBlock as f, normalizeClass as u, createElementVNode as g, toDisplayString as y } from "vue";
const v = l({
  name: "VueToast",
  props: {
    message: {
      type: String,
      required: !0
    },
    type: {
      type: String,
      default: "success"
    },
    duration: {
      type: Number,
      default: 3e3
    },
    position: {
      type: String,
      default: "bottom-right"
    },
    theme: {
      type: String,
      default: "auto"
    }
  },
  emits: ["hide"],
  setup(e, { emit: n }) {
    const t = r(!0), o = r(!1), s = r(!1);
    let i = null;
    const a = () => {
      n("hide");
    };
    return p(() => {
      setTimeout(() => {
        o.value = !0;
      }, 10), i = setTimeout(() => {
        s.value = !0, setTimeout(() => {
          t.value = !1, a();
        }, 350);
      }, e.duration);
    }), m(() => {
      i && clearTimeout(i);
    }), {
      show: t,
      isVisible: o,
      exiting: s,
      onAfterLeave: a
    };
  }
}), h = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, s] of n)
    t[o] = s;
  return t;
};
function V(e, n, t, o, s, i) {
  return e.show ? (f(), c("div", {
    key: 0,
    class: u(["toast-container", e.position, e.type, e.theme, e.isVisible ? "visible" : ""])
  }, [
    g("div", {
      class: u(["toast-content", e.type, e.exiting ? "exit" : ""])
    }, y(e.message), 3)
  ], 2)) : d("", !0);
}
const T = /* @__PURE__ */ h(v, [["render", V], ["__scopeId", "data-v-3b423778"]]);
export {
  T as V
};
//# sourceMappingURL=Toast-DOn1agdy.js.map
