"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("./Toast-tyPzIZbL.cjs"),m=require("react"),l=require("react-dom");var i,n=l;if(process.env.NODE_ENV==="production")i=n.createRoot,n.hydrateRoot;else{var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;i=function(t,e){c.usingClientEntryPoint=!0;try{return n.createRoot(t,e)}finally{c.usingClientEntryPoint=!1}}}const s={},o={show:t=>{const e=document.createElement("div");document.body.appendChild(e);const r=`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,a=i(e);s[r]={root:a,element:e};const d={...t,onHide:()=>{t.onHide&&t.onHide(),o.dismiss(r)}};return a.render(m.createElement(u.ReactToast,d)),r},success:(t,e)=>o.show({message:t,type:"success",position:"bottom-right",duration:3e3,...e}),error:(t,e)=>o.show({message:t,type:"error",position:"bottom-right",duration:4e3,...e}),info:(t,e)=>o.show({message:t,type:"info",position:"bottom-right",duration:3e3,...e}),dismiss:t=>{const e=s[t];e&&(e.root.unmount(),setTimeout(()=>{document.body.contains(e.element)&&document.body.removeChild(e.element)},100),delete s[t])},dismissAll:()=>{Object.keys(s).forEach(t=>o.dismiss(t))}},y=o;exports.ReactToast=u.ReactToast;exports.toast=y;
//# sourceMappingURL=react.cjs.map
