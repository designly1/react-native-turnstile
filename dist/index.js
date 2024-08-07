// react-native-turnstile by Jay Simons (@designly1)
"use strict";var q=Object.create;var d=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var u=(e,r)=>d(e,"name",{value:r,configurable:!0});var X=(e,r)=>{for(var n in r)d(e,n,{get:r[n],enumerable:!0})},U=(e,r,n,p)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of H(r))!Q.call(e,a)&&a!==n&&d(e,a,{get:()=>r[a],enumerable:!(p=G(r,a))||p.enumerable});return e};var Y=(e,r,n)=>(n=e!=null?q(K(e)):{},U(r||!e||!e.__esModule?d(n,"default",{value:e,enumerable:!0}):n,e)),Z=e=>U(d({},"__esModule",{value:!0}),e);var ne={};X(ne,{default:()=>re,resetTurnstile:()=>M});module.exports=Z(ne);var o=Y(require("react")),B=require("react-native-webview"),s=require("react-native"),C=require("react");var A="https://d.designly.biz";var ee={normal:{width:300,height:65},compact:{width:130,height:120}};function m(e){let{sitekey:r,onVerify:n,onLoad:p,onError:a,onExpire:v,onTimeout:y,onAfterInteractive:g,onBeforeInteractive:b,onUnsupported:w,action:x,cData:h,theme:S,language:T,tabIndex:I,responseField:E,responseFieldName:k,size:l,fixedSize:R,retry:D,retryInterval:N,refreshExpired:V,appearance:P,execution:z,id:L,resetRef:c,style:O,webviewStyle:W}=e,f=(0,C.useRef)(null);(0,o.useEffect)(()=>{c&&(c.current=()=>{f.current&&f.current.reload()})},[c]);let t=new URLSearchParams;r&&t.append("sitekey",r),x&&t.append("action",x),h&&t.append("cData",h),S&&t.append("theme",S),T&&t.append("language",T),I&&t.append("tabIndex",I.toString()),E&&t.append("responseField",E.toString()),k&&t.append("responseFieldName",k),l&&t.append("size",l),R&&t.append("fixedSize",R.toString()),D&&t.append("retry",D),N&&t.append("retryInterval",N.toString()),V&&t.append("refreshExpired",V),P&&t.append("appearance",P),z&&t.append("execution",z),L&&t.append("id",L);let j=`${A}/turnstile?${t.toString()}`,F=ee[l||"normal"],_=s.StyleSheet.flatten([{height:F.height,width:F.width},O]),$=s.StyleSheet.flatten([te.webview,W]);return o.default.createElement(o.default.Fragment,null,o.default.createElement(s.View,{style:_},o.default.createElement(B.WebView,{ref:f,source:{uri:j},onMessage:J=>{try{let i=JSON.parse(J.nativeEvent.data);if(!i.event)throw new Error("Invalid event received from Turnstile endpoint");switch(i.event){case"verify":n&&i.data&&n(i.data);break;case"load":p&&i.data&&p(i.data);break;case"error":a&&a(new Error(i.data||"An error occurred"));break;case"expire":v&&i.data&&v(i.data);break;case"timeout":y&&y();break;case"afterInteractive":g&&g();break;case"beforeInteractive":b&&b();break;case"unsupported":w&&w();break;default:console.error("Unsupported event received from Turnstile endpoint")}}catch(i){console.error(i)}},javaScriptEnabled:!0,style:$,originWhitelist:["*"]})))}u(m,"ReactNativeTurnstile");var te=s.StyleSheet.create({webview:{flex:1}});function M(e){e.current&&typeof e.current=="function"&&e.current()}u(M,"resetTurnstile");var re=m;0&&(module.exports={resetTurnstile});
//# sourceMappingURL=index.js.map