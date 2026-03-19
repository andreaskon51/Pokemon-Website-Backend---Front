import{c as h,j as a,w as n}from"./index-O-pIiQh3.js";/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=h("StarHalf",[["path",{d:"M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2",key:"nare05"}]]);function p({rating:l,totalReviews:m,size:s="sm",showCount:x=!0}){const t=s==="lg"?"w-5 h-5":s==="md"?"w-4 h-4":"w-3.5 h-3.5",e=Math.floor(l),c=l-e>=.5,o=5-e-(c?1:0);return a.jsxs("div",{className:"flex items-center gap-1",children:[a.jsxs("div",{className:"flex",children:[Array.from({length:e}).map((f,r)=>a.jsx(n,{className:`${t} fill-amber-400 text-amber-400`},`f${r}`)),c&&a.jsx(i,{className:`${t} fill-amber-400 text-amber-400`}),Array.from({length:o}).map((f,r)=>a.jsx(n,{className:`${t} text-gray-600`},`e${r}`))]}),x&&m!==void 0&&a.jsxs("span",{className:`text-gray-400 ${s==="lg"?"text-sm":"text-xs"}`,children:["(",m,")"]})]})}export{p as S};
