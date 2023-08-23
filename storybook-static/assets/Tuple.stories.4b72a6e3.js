import{r as m}from"./index.b461da8a.js";import{a as ee}from"./DropZoneSides.4db44d78.js";import{j as i,a as R,F as qe}from"./jsx-runtime.3c5536b9.js";import{_ as Be}from"./styles.module.6d7c69b6.js";import{S as Re}from"./index.8b918fca.js";import{S as Le}from"./index.e62c7fbf.js";import{D as Xe}from"./index.4c66f3ac.js";import{D as et}from"./DropZoneCenter.640d5182.js";const W=()=>tt()+Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),tt=()=>{const e=["apple","zebra","lion","pancho","lioness","tough","weak","pretty","monkey","monster","imp","sloth","dragon","house","door","window","air","park","tree","chipmunk","monk","priestess","elephant"],t=e.length-1,n=0,r=Math.floor(Math.random()*(t-n+1)+n);return e[r]},nt=e=>typeof e=="object"&&!Array.isArray(e)&&e!==null;globalThis&&globalThis.__awaiter;function rt(e){const t=m.exports.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return He(()=>{t.current=e},[e]),m.exports.useCallback((...n)=>t.current(...n),[t])}function Ae(e,t,n,r){const o=m.exports.useRef(t);He(()=>{o.current=t},[t]),m.exports.useEffect(()=>{var a;const s=(a=n==null?void 0:n.current)!==null&&a!==void 0?a:window;if(!(s&&s.addEventListener))return;const l=c=>o.current(c);return s.addEventListener(e,l,r),()=>{s.removeEventListener(e,l,r)}},[e,n,r])}globalThis&&globalThis.__awaiter;const He=typeof window!="undefined"?m.exports.useLayoutEffect:m.exports.useEffect;function z(e,t){const n=m.exports.useCallback(()=>{if(typeof window=="undefined")return t;try{const l=window.localStorage.getItem(e);return l?at(l):t}catch(l){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,l),t}},[t,e]),[r,o]=m.exports.useState(n),a=rt(l=>{typeof window=="undefined"&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{const c=l instanceof Function?l(r):l;window.localStorage.setItem(e,JSON.stringify(c)),o(c),window.dispatchEvent(new Event("local-storage"))}catch(c){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,c)}});m.exports.useEffect(()=>{o(n())},[]);const s=m.exports.useCallback(l=>{(l==null?void 0:l.key)&&l.key!==e||o(n())},[e,n]);return Ae("storage",s),Ae("local-storage",s),[r,a]}function at(e){try{return e==="undefined"?void 0:JSON.parse(e!=null?e:"")}catch{console.log("parsing error on",{value:e});return}}const ot="_draggable_1uxtm_1";var it={draggable:ot};const $e="DRAG_QUEEN_STORY_HOUR_LMAOOOOO",Ve=(e,t="Dragging",n="",r=null)=>{const o=document.createElement("div");if(o.id=$e,o.innerText=t,o.className=`${it.draggable} ${n}`,r)for(const a in r)o.style[a]=r[a];document.body.appendChild(o),e.dataTransfer.setDragImage(o,40,12)},U=()=>{const e=document.getElementById($e);e!=null&&e.parentNode&&e.parentNode.removeChild(e)},ve=e=>!!(e.dataTransfer&&e.dataTransfer.getData("pageId")),ke=(e,t)=>e<0||e>window.outerWidth||t<0||t>window.outerHeight,H="ports",Me="dragged_to_tuple",je="p",_e="dragging",G=()=>{const e=localStorage.getItem(H);return e?JSON.parse(e):null},Ye=e=>{const t=JSON.parse(localStorage.getItem(H));return t&&t[e]?t[e]:null},ge=(e,t,n,r)=>{const o=G()||{};o[e]={open:r,ports:t,rootId:n},localStorage.setItem(H,JSON.stringify(o))},st=e=>{const t=G();t&&delete t[e],localStorage.setItem(H,JSON.stringify(t))},dt=(e,t)=>{const n=G();if(n[e]){const{ports:r,rootId:o,open:a}=n[e];if(a)return alert("Please close this viewport before renaming"),!1;if(r)return ge(t,r,o,!1),st(e),!0}return!1},We=e=>{const t=W(),n=W(),r=G()||{},o={parentId:null,isSplitView:!1,pageIds:[e],activePageId:e,direction:null,headId:null,tailId:null,isHead:null},a={[n]:o};return r[t]={open:!1,ports:a,rootId:n},localStorage.setItem(H,JSON.stringify(r)),t},we=(e,t=!0)=>{const n=G()||{};if(e in n)n[e]={...n[e],open:t},localStorage.setItem(H,JSON.stringify(n));else throw new Error(`Could not find id "${e}" in storage.`)},fe=e=>{if(Ye(e).open)return;const n=new URL(window.location.href);n.searchParams.set(je,e.toString()),window.open(n,"",`height=${600}, width=${800}`)},xe=()=>new URLSearchParams(location.search).get(je)||"",Ke=async(e=0)=>{let t=!1;const n=JSON.parse(localStorage.getItem(Me));return K(!1),n&&(t=!!n),new Promise((r,o)=>setTimeout(()=>{r(t)},e))},K=e=>{localStorage.setItem(Me,JSON.stringify(e))};var B=(e=>(e.HEAD="HEAD",e.TAIL="TAIL",e.NULL="NULL",e))(B||{}),N=(e=>(e.ADD_TAB="ADD_TAB",e.REMOVE_TAB="REMOVE_TAB",e.ADD_NEW_VIEW="ADD_NEW_VIEW",e.ADD_VIEW="ADD_VIEW",e.REMOVE_VIEW="REMOVE_VIEW",e.CHANGE_ACTIVE_VIEW="CHANGE_ACTIVE_VIEW",e))(N||{});const he=(e,t,n,r,o=0)=>{const a={type:N.ADD_TAB,payload:{portId:t,pageId:r,dragPortId:n,index:o}};e(a)},ct=(e,t,n)=>{const r={type:N.REMOVE_TAB,payload:{portId:t,index:n}};e(r)},Ce=(e,t)=>{const n={pageId:t},r={type:N.ADD_NEW_VIEW,payload:n};e(r)},lt=(e,t,n,r,o)=>{const a={dragPortId:n,portId:t,pageId:r,side:B.NULL,direction:"none"};switch(o){case ee.TOP:a.side=B.HEAD,a.direction="vertical";break;case ee.RIGHT:a.side=B.TAIL,a.direction="horizontal";break;case ee.BOTTOM:a.side=B.TAIL,a.direction="vertical";break;case ee.LEFT:a.side=B.HEAD,a.direction="horizontal";break;default:throw Error("Unknown side.")}const s={type:N.ADD_VIEW,payload:a};e(s)},pt=(e,t)=>{const n={type:N.REMOVE_VIEW,payload:{portId:t}};e(n)},ut=(e,t,n)=>{const r={type:N.CHANGE_ACTIVE_VIEW,payload:{portId:t,pageId:n}};e(r)},mt="_treeContainer_13e5e_7",gt="_tree_13e5e_7",ft="_branch_13e5e_24",vt="_branchDragOver_13e5e_37",_t="_branches_13e5e_41",ht="_branchButtonContainer_13e5e_46",bt="_branchButton_13e5e_46",It="_leaf_13e5e_82",Tt="_leafDragOver_13e5e_108",wt="_root_13e5e_113",yt="_rootlets_13e5e_123",St="_rootlet_13e5e_123",Ct="_rootletTextBox_13e5e_140",Vt="_symbolContainer_13e5e_162",xt="_trashcan_13e5e_167",Pt="_trashcanHover_13e5e_183";var g={treeContainer:mt,tree:gt,branch:ft,branchDragOver:vt,branches:_t,branchButtonContainer:ht,branchButton:bt,leaf:It,leafDragOver:Tt,root:wt,rootlets:yt,rootlet:St,rootletTextBox:Ct,symbolContainer:Vt,trashcan:xt,trashcanHover:Pt};const ne=({text:e,pageId:t,path:n,isDynamicTree:r})=>{const{dispatch:o,state:{pages:a,viewport:s,classes:l,styles:c,events:d}}=m.exports.useContext(E),[p,u]=m.exports.useState(!1),[b,C]=z(_e,!1),O=`
        ${(g==null?void 0:g.leaf)||""}
        ${(l==null?void 0:l.leaf)||""}
        ${p?`${g==null?void 0:g.leafDragOver} ${l==null?void 0:l.leafDragOver}`:""}`,I=(l==null?void 0:l.draggable)||"",V=(f,v)=>{const q=f[v];return q?f[v].isSplitView?V(f,q.headId):v:null},P=()=>{const{root:f,ports:v}=s;return V(v,f)},A=f=>{Ve(f,e,I,c.draggable),f.dataTransfer.setData("pageId",t),C(!0)},T=async f=>{U(),C(!1);const{clientX:v,clientY:q}=f;if(ke(v,q)&&!await Ke()){const $=We(t);fe($)}},w=f=>{if(d!=null&&d.onTreeDrop){const v=f.dataTransfer&&f.dataTransfer.getData("pageId"),q=a[v].name,Q=f.dataTransfer&&f.dataTransfer.getData("portId")?"viewport":"tree";d.onTreeDrop(f,e,n,q,Q,"leaf")}},h=()=>{Object.keys(a).length<=0&&Ce(o,t);const f=P();f?he(o,f,"",t):Ce(o,t)},S=f=>{f.stopPropagation(),r&&u(!0)},D=f=>{f.stopPropagation(),u(!1)};return i("div",{style:c.leaf,className:O,draggable:!0,onDragStart:A,onDragEnd:T,onDragOver:S,onDragLeave:D,onDrop:w,onClick:h,children:e})};try{ne.displayName="Leaf",ne.__docgenInfo={description:"",displayName:"Leaf",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},pageId:{defaultValue:null,description:"",name:"pageId",required:!0,type:{name:"ID"}},path:{defaultValue:null,description:"",name:"path",required:!0,type:{name:"string[]"}},isDynamicTree:{defaultValue:null,description:"",name:"isDynamicTree",required:!0,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Leaf.tsx#Leaf"]={docgenInfo:ne.__docgenInfo,name:"Leaf",path:"src/components/Tuple/Tree/Leaf.tsx#Leaf"})}catch{}const Z=({text:e,children:t,open:n=!1,isDynamicTree:r,branchClassName:o,branchesClassName:a,branchDragOverClassName:s,branchStyle:l={},branchDragOverStyle:c={},branchesStyle:d={},path:p=[]})=>{const{state:{pages:u,events:b}}=m.exports.useContext(E),[C,O]=m.exports.useState(!1),[I,V]=m.exports.useState(n),P=`
        ${Be.noHighlight}
        ${o||""}
        ${C?s:""}`,A={...l,...C?c:{}},T=()=>{m.exports.Children.count(t)&&V(v=>!v)},w=v=>{v.stopPropagation(),r&&O(!0)},h=v=>{v.stopPropagation(),O(!1)},S=v=>{if(b!=null&&b.onTreeDrop){const q=v.dataTransfer&&v.dataTransfer.getData("pageId"),$=u[q].name,X=v.dataTransfer&&v.dataTransfer.getData("portId")?"viewport":"tree";b.onTreeDrop(v,e,p,$,X,"branch")}},D=v=>{v.stopPropagation()},f=v=>{v.stopPropagation()};return R("div",{children:[R("div",{className:P,style:A,onClick:T,onDragOver:w,onDragLeave:h,onDrop:S,children:[e,r&&R("div",{className:g.branchButtonContainer,children:[i("div",{className:g.branchButton,onClick:D,children:"\u271A"}),i("div",{className:g.branchButton,onClick:f,children:"\u2716"})]})]}),I&&i("div",{className:a,style:d,children:t})]})};try{Z.displayName="Branch",Z.__docgenInfo={description:"",displayName:"Branch",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},open:{defaultValue:{value:"false"},description:"",name:"open",required:!1,type:{name:"boolean"}},isDynamicTree:{defaultValue:null,description:"",name:"isDynamicTree",required:!0,type:{name:"boolean"}},branchClassName:{defaultValue:null,description:"",name:"branchClassName",required:!1,type:{name:"string"}},branchDragOverClassName:{defaultValue:null,description:"",name:"branchDragOverClassName",required:!1,type:{name:"string"}},branchesClassName:{defaultValue:null,description:"",name:"branchesClassName",required:!1,type:{name:"string"}},branchStyle:{defaultValue:{value:"{}"},description:"",name:"branchStyle",required:!1,type:{name:"CSSProperties"}},branchDragOverStyle:{defaultValue:{value:"{}"},description:"",name:"branchDragOverStyle",required:!1,type:{name:"CSSProperties"}},branchesStyle:{defaultValue:{value:"{}"},description:"",name:"branchesStyle",required:!1,type:{name:"CSSProperties"}},path:{defaultValue:{value:"[]"},description:"",name:"path",required:!1,type:{name:"string[]"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Branch.tsx#Branch"]={docgenInfo:Z.__docgenInfo,name:"Branch",path:"src/components/Tuple/Tree/Branch.tsx#Branch"})}catch{}const re=({text:e,open:t,closeSymbol:n="\u25CB",openSymbol:r="\u25CF",hoverSymbol:o="\u25C9"})=>{const[a,s]=m.exports.useState(e),[l,c]=m.exports.useState(!1),d=m.exports.useRef(),p=t?r:l?o:n,{state:{classes:u,styles:b}}=m.exports.useContext(E),C=`
        ${(g==null?void 0:g.rootlet)||""}
        ${(u==null?void 0:u.rootlet)||""}`,O=`
        ${g==null?void 0:g.symbolContainer}
        ${(u==null?void 0:u.symbolContainer)||""}`,I=`
        ${g==null?void 0:g.rootletTextBox}

        ${(u==null?void 0:u.rootletTextBox)||""}`,V=(u==null?void 0:u.draggable)||"",P=()=>c(!0),A=()=>c(!1),T=()=>fe(a),w=f=>f.stopPropagation(),h=f=>{const{value:v}=f.target;dt(a,v)&&s(v)},S=f=>{Ve(f,a,V,b.draggable)},D=()=>{U(),fe(a)};return i("div",{draggable:!0,className:C,style:b.rootlet,onDoubleClick:T,onDragStart:S,onDragEnd:D,onMouseEnter:P,onMouseLeave:A,children:R(qe,{children:[i("div",{className:O,style:b.symbolContainer,children:p}),i("input",{type:"text",ref:d,id:a,name:a,value:a,className:I,style:b.rootletTextBox,onDoubleClick:w,onChange:h})]})})};try{re.displayName="Rootlet",re.__docgenInfo={description:"",displayName:"Rootlet",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},openSymbol:{defaultValue:{value:"\u25CF"},description:"",name:"openSymbol",required:!1,type:{name:"ReactNode"}},closeSymbol:{defaultValue:{value:"\u25CB"},description:"",name:"closeSymbol",required:!1,type:{name:"ReactNode"}},hoverSymbol:{defaultValue:{value:"\u25C9"},description:"",name:"hoverSymbol",required:!1,type:{name:"ReactNode"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Rootlet.tsx#Rootlet"]={docgenInfo:re.__docgenInfo,name:"Rootlet",path:"src/components/Tuple/Tree/Rootlet.tsx#Rootlet"})}catch{}const ae=({rootName:e})=>{const{state:{classes:t,styles:n}}=m.exports.useContext(E),r=`
        ${(g==null?void 0:g.root)||""}
        ${(t==null?void 0:t.root)||""}`,o=`
        ${(g==null?void 0:g.rootlets)||""}
        ${(t==null?void 0:t.rootlets)||""}`;let s=(()=>{const[l,c]=z(H,null);return l?Object.entries(l).map(d=>({text:d[0],open:d[1].open})):[]})();return s=s.filter(l=>l.text!=="root"),i(Z,{text:e,branchClassName:r,branchesClassName:o,branchStyle:n.rootlets,branchesStyle:n.rootlets,children:s.map(l=>i(re,{text:l.text,open:l.open}))})};try{ae.displayName="Root",ae.__docgenInfo={description:"",displayName:"Root",props:{rootName:{defaultValue:null,description:"",name:"rootName",required:!0,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Root.tsx#Root"]={docgenInfo:ae.__docgenInfo,name:"Root",path:"src/components/Tuple/Tree/Root.tsx#Root"})}catch{}const Dt=e=>!!(e!=null&&e.pageId),oe=({symbol:e="\u267B",dragOverSymbol:t="\u267B"})=>{const[n,r]=m.exports.useState(!1),[o,a]=z(_e,!1);if(!o)return null;const{state:{classes:s,styles:l}}=m.exports.useContext(E),c=`
        ${(g==null?void 0:g.trashcan)||""}
        ${(s==null?void 0:s.trashcan)||""}
        ${n?g.trashcanHover:""}`,d=b=>{b.preventDefault(),r(!0)},p=()=>r(!1),u=()=>{a(!1),r(!1)};return i("div",{className:c,style:l.trashcan,onDragEnter:()=>{},onDragOver:d,onDragLeave:p,onDrop:u,children:n?t:e})};try{oe.displayName="Trashcan",oe.__docgenInfo={description:"",displayName:"Trashcan",props:{symbol:{defaultValue:{value:"\u267B"},description:"",name:"symbol",required:!1,type:{name:"string"}},dragOverSymbol:{defaultValue:{value:"\u267B"},description:"",name:"dragOverSymbol",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Trashcan.tsx#Trashcan"]={docgenInfo:oe.__docgenInfo,name:"Trashcan",path:"src/components/Tuple/Tree/Trashcan.tsx#Trashcan"})}catch{}const Ge=({node:e,path:t,isDynamicTree:n})=>{const{state:{pages:r,classes:o,styles:a}}=m.exports.useContext(E);if(Dt(e)){const p=e,u=r[p.pageId];if(!u)throw`Page ID not found within "pages": [${p.pageId}]`;return i(ne,{text:u.name,pageId:p.pageId,path:t,isDynamicTree:n})}const s=e,l=`${(g==null?void 0:g.branch)||""} ${(o==null?void 0:o.branch)||""}`,c=`${(g==null?void 0:g.branchDragOver)||""} ${(o==null?void 0:o.branchDragOver)||""}`,d=`${(g==null?void 0:g.branches)||""} ${(o==null?void 0:o.branches)||""}`;return i(Z,{text:s.label,branchClassName:l,branchDragOverClassName:c,branchesClassName:d,branchStyle:a.branch,branchDragOverStyle:a.branchDragOver,branchesStyle:a.branches,isDynamicTree:n,children:s.branches.map(p=>i(Ge,{node:p,path:t.concat(`/${s.label}`),isDynamicTree:n},p.id))})},ie=({enableTrashcan:e,isDynamicTree:t})=>{const n=m.exports.useRef(),r=m.exports.useRef(),{state:{tree:o,classes:a,styles:s}}=m.exports.useContext(E),[l,c]=m.exports.useState(0);m.exports.useEffect(()=>{const b=n.current.clientHeight,C=r.current.clientHeight;c(b-C)},[n,r,c]);const d=`${(g==null?void 0:g.tree)||""} ${(a==null?void 0:a.tree)||""}`,p=`${g.contentContainer} ${a.scrollPane}`,u={...s==null?void 0:s.scrollPane,height:l};return i("div",{className:g.treeContainer,children:R("div",{ref:n,className:d,style:s.tree,children:[i("div",{ref:r,children:i(ae,{rootName:"Tuple"})}),i(Re,{className:p,style:u,children:i(qe,{children:o.map(b=>i(Ge,{node:b,path:[],isDynamicTree:t},b.id))})}),e&&i(oe,{symbol:"",dragOverSymbol:""})]})})};try{ie.displayName="Tree",ie.__docgenInfo={description:"",displayName:"Tree",props:{enableTrashcan:{defaultValue:null,description:"",name:"enableTrashcan",required:!0,type:{name:"boolean"}},isDynamicTree:{defaultValue:null,description:"",name:"isDynamicTree",required:!0,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Tree.tsx#Tree"]={docgenInfo:ie.__docgenInfo,name:"Tree",path:"src/components/Tuple/Tree/Tree.tsx#Tree"})}catch{}const Et="_tabBar_7qrlt_6",Ot="_tab_7qrlt_6",At="_tabLabel_7qrlt_35",Nt="_tabCloseContainer_7qrlt_41",qt="_tabClose_7qrlt_41",Bt="_tabActive_7qrlt_66";var x={tabBar:Et,tab:Ot,tabLabel:At,tabCloseContainer:Nt,tabClose:qt,tabActive:Bt};const se=({portId:e,index:t,pageId:n})=>{const{dispatch:r,state:{pages:o,classes:a,styles:s,viewport:l,viewportId:c}}=m.exports.useContext(E);m.exports.useEffect(()=>{U()},[U]);const d=m.exports.useRef(),[p,u]=m.exports.useState(!1),[b,C]=z(_e,!1),O=o[n].name,I=l.ports[e],V=n===I.activePageId,P=`
        ${(x==null?void 0:x.tab)||""}
        ${(a==null?void 0:a.tab)||""}`,A=`
        ${P}
        ${(x==null?void 0:x.tabActive)||""}
        ${(a==null?void 0:a.tabActive)||""}`,T=V?A:P,w=`
        ${(x==null?void 0:x.tabLabel)||""}
        ${(a==null?void 0:a.tabLabel)||""}`,h=`
        ${(x==null?void 0:x.tabClose)||""}
        ${(a==null?void 0:a.tabClose)||""}`,S=(a==null?void 0:a.draggable)||"",D=V?{...s.tab,...s.tabActive}:s.tab;m.exports.useEffect(()=>{var k;const _=document.querySelector(":root"),F=(k=d.current)==null?void 0:k.clientHeight;_.style.setProperty("--TAB-HEIGHT",`${F.toString()}px`)},[d]);const f=()=>u(!0),v=()=>u(!1),q=()=>ut(r,e,n),$=_=>{u(!1),Ve(_,O,S,s.draggable),C(!0),_.dataTransfer&&_.dataTransfer.setData("pageId",n.toString()),_.dataTransfer&&_.dataTransfer.setData("portId",e.toString()),_.dataTransfer&&_.dataTransfer.setData("viewportId",c.toString())},Q=_=>{if(_.preventDefault(),_.stopPropagation(),d.current&&(d.current.style.opacity="1"),!ve(_))return;const F=_.dataTransfer&&_.dataTransfer.getData("pageId"),k=_.dataTransfer&&_.dataTransfer.getData("portId");(_.dataTransfer&&_.dataTransfer.getData("viewportId"))!==c&&K(!0),he(r,e,k,F,t+1)},X=_=>{_.preventDefault(),_.stopPropagation(),d.current&&(d.current.style.opacity="0.7")},ze=_=>{_.preventDefault(),_.stopPropagation(),d.current&&(d.current.style.opacity="1")},Je=async _=>{C(!1),U(),Ee();const{clientX:F,clientY:k}=_;if(ke(F,k)&&!await Ke()){const Oe=We(n);fe(Oe)}},Qe=_=>{_.stopPropagation(),Ee()},Ee=()=>ct(r,e,t);return R("div",{ref:d,draggable:!0,style:D,className:T,onDragStart:$,onDragEnd:Je,onDragEnter:X,onDragOver:X,onDragLeave:ze,onDrop:Q,onMouseOver:f,onMouseLeave:v,onClick:q,children:[i("div",{style:s.tabLabel,className:w,children:O}),i("div",{className:x.tabCloseContainer,children:p&&i("div",{style:s.tabClose,className:h,onClick:Qe,children:"\u2716"})})]})};try{se.displayName="Tab",se.__docgenInfo={description:"",displayName:"Tab",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},pageId:{defaultValue:null,description:"",name:"pageId",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/TabBar/Tab.tsx#Tab"]={docgenInfo:se.__docgenInfo,name:"Tab",path:"src/components/Tuple/Viewport/View/TabBar/Tab.tsx#Tab"})}catch{}const de=({portId:e,pageIds:t})=>{const{dispatch:n,state:{classes:r,styles:o,viewportId:a}}=m.exports.useContext(E),s=`
        ${Be.noScrollbar}
        ${(x==null?void 0:x.tabBar)||""}
        ${(r==null?void 0:r.tabBar)||""}`,l=d=>{d.preventDefault(),d.stopPropagation()},c=d=>{if(d.preventDefault(),d.stopPropagation(),!ve(d))return;const p=d.dataTransfer&&d.dataTransfer.getData("pageId"),u=d.dataTransfer&&d.dataTransfer.getData("portId");(d.dataTransfer&&d.dataTransfer.getData("viewportId"))!==a&&K(!0),he(n,e,u,p,t.length)};return i("div",{className:s,style:o==null?void 0:o.tabBar,onDragOver:l,onDrop:c,children:t.map((d,p)=>i(se,{portId:e,index:p,pageId:d},d))})};try{de.displayName="TabBar",de.__docgenInfo={description:"",displayName:"TabBar",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},pageIds:{defaultValue:null,description:"",name:"pageIds",required:!0,type:{name:"ID[]"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/TabBar/TabBar.tsx#TabBar"]={docgenInfo:de.__docgenInfo,name:"TabBar",path:"src/components/Tuple/Viewport/View/TabBar/TabBar.tsx#TabBar"})}catch{}const Rt="_view_ik9is_1",Lt="_contentContainer_ik9is_8";var te={view:Rt,contentContainer:Lt};const ce=({portId:e,pageIds:t,activePageId:n})=>{if(t&&t.length<=0)return null;const{dispatch:r,state:{pages:o,styles:a,classes:s,viewportId:l}}=m.exports.useContext(E),c=o[n],[d,p]=z(_e,!1),u=`
        ${(te==null?void 0:te.view)||""}
        ${(s==null?void 0:s.view)||""}`,b=`
        ${te.contentContainer}
        ${s.scrollPane}`,C=(I,V)=>{const P=I.dataTransfer&&I.dataTransfer.getData("pageId"),A=I.dataTransfer&&I.dataTransfer.getData("portId"),T=I.dataTransfer&&I.dataTransfer.getData("viewportId");p(!1),T!==l&&K(!0),lt(r,e,A,P,V)},O=I=>{const V=I.dataTransfer&&I.dataTransfer.getData("pageId"),P=I.dataTransfer&&I.dataTransfer.getData("portId"),A=I.dataTransfer&&I.dataTransfer.getData("viewportId");p(!1),A!==l&&K(!0),he(r,e,P,V)};return R("div",{className:u,style:a==null?void 0:a.view,children:[i(de,{portId:e,pageIds:t}),i(Xe,{dropZoneRootStyle:a.pane,centerDropZoneStyle:a.dropZoneCenter,sidesDropZoneStyle:a.dropZoneSide,dropZoneRootClassName:s.pane,centerDropZoneClassName:s.dropZoneCenter,sidesDropZoneClassName:s.dropZoneSide,dropCenterCb:O,dropSidesCb:C,validateDraggable:ve,children:i(Re,{className:b,style:(a==null?void 0:a.scrollPane)||null,children:i(c.component,{...c.props})})})]})};try{ce.displayName="View",ce.__docgenInfo={description:"",displayName:"View",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},pageIds:{defaultValue:null,description:"",name:"pageIds",required:!0,type:{name:"ID[]"}},activePageId:{defaultValue:null,description:"",name:"activePageId",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/View.tsx#View"]={docgenInfo:ce.__docgenInfo,name:"View",path:"src/components/Tuple/Viewport/View/View.tsx#View"})}catch{}const Y=({id:e})=>{const{dispatch:t,state:{viewport:n}}=m.exports.useContext(E),r=(n==null?void 0:n.ports)&&(n==null?void 0:n.ports[e]);if(m.exports.useEffect(()=>{r&&r.pageIds&&r.pageIds.length<=0&&pt(t,e)},[r]),r&&!r.headId)return i(ce,{portId:e,pageIds:r.pageIds,activePageId:r.activePageId});if(r&&(r==null?void 0:r.headId)){const o=i(Y,{id:r.headId}),a=i(Y,{id:r.tailId});return R(Le,{dir:r.direction,resizerPos:"50%",children:[r.headId&&o,r.tailId&&a]})}throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT')};try{Y.displayName="Port",Y.__docgenInfo={description:"",displayName:"Port",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/Port.tsx#Port"]={docgenInfo:Y.__docgenInfo,name:"Port",path:"src/components/Tuple/Viewport/Port.tsx#Port"})}catch{}const le=({})=>{const{dispatch:e,state:{styles:t,classes:n,viewportId:r}}=m.exports.useContext(E),o=a=>{const s=a.dataTransfer&&a.dataTransfer.getData("pageId");(a.dataTransfer&&a.dataTransfer.getData("viewportId"))!==r&&K(!0),Ce(e,s)};return i(et,{style:t.dropZoneCenter,className:n.dropZoneCenter,onDropCB:o,validateDraggable:ve,children:i("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:"Welcome to Tuple!"})})};try{le.displayName="DefaultView",le.__docgenInfo={description:"",displayName:"DefaultView",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/DefaultView.tsx#DefaultView"]={docgenInfo:le.__docgenInfo,name:"DefaultView",path:"src/components/Tuple/Viewport/View/DefaultView.tsx#DefaultView"})}catch{}const Ht="_viewport_3ceyg_1";var ye={viewport:Ht};const Ne=()=>{const{state:{viewport:e,styles:t,classes:n}}=m.exports.useContext(E),r=`
        ${(ye==null?void 0:ye.viewport)||""}
        ${(n==null?void 0:n.viewport)||""}`;return e.root?i("div",{className:r,style:t.viewport,children:i(Y,{id:e.root})}):i(le,{})},$t="_tuple_v556q_1";var Se={tuple:$t};const pe=({enableTrashcan:e,enableDynamicTree:t})=>{const{state:{styles:n,classes:r}}=m.exports.useContext(E),o=xe()==="",a=`
        ${(Se==null?void 0:Se.tuple)||""}
        ${(r==null?void 0:r.tuple)||""}`;return o?i("div",{className:a,style:n.tuple,children:R(Le,{resizerPos:"25%",children:[i(ie,{enableTrashcan:e,isDynamicTree:t}),i(Ne,{})]})}):i(Ne,{})};try{pe.displayName="TupleInner",pe.__docgenInfo={description:"",displayName:"TupleInner",props:{enableTrashcan:{defaultValue:null,description:"",name:"enableTrashcan",required:!0,type:{name:"boolean"}},enableDynamicTree:{defaultValue:null,description:"",name:"enableDynamicTree",required:!0,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/TupleInner.tsx#TupleInner"]={docgenInfo:pe.__docgenInfo,name:"TupleInner",path:"src/components/Tuple/TupleInner.tsx#TupleInner"})}catch{}const J=(e,t,n)=>{console.log(`----- ${e} -----`),console.log("state",t),console.log("payload",n)},L=(e,t)=>({...e[t]}||null),kt=(e,t)=>{const n=e.ports[t];if(!n||n.parentId==null)return null;const o=e.ports[n.parentId];if(!o)return null;const a=n.isHead?o.tailId:o.headId,s=L(e.ports,a);return{id:a,port:s}},Mt=(e,t)=>{if(J("Add Tab",e,t),t.portId===t.dragPortId){const s={...e.viewport.ports,[t.portId]:{...e.viewport.ports[t.portId],activePageId:t.pageId}};return{...e,viewport:{...e.viewport,skipTabRemoval:!0,ports:s}}}const n=L(e.viewport.ports,t.portId),r=n.pageIds;if(!r)throw Error("Page ids is null. Was this action called on a Splitview port?");if(r.includes(t.pageId)){const s={...e.viewport.ports,[t.portId]:{...n,activePageId:t.pageId}};return{...e,viewport:{...e.viewport,ports:s}}}const o=[...r==null?void 0:r.slice(0,t.index),t.pageId,...r==null?void 0:r.slice(t.index)],a={...e.viewport.ports,[`${t.portId}`]:{...n,activePageId:t.pageId,pageIds:o}};return{...e,viewport:{...e.viewport,ports:a}}},jt=(e,t)=>{if(J("Remove Tab",e,t),e.viewport.skipTabRemoval)return{...e,viewport:{...e.viewport,skipTabRemoval:!1}};const n=L(e.viewport.ports,t.portId),r=n.pageIds;if(!r)throw Error("Page ids is null. Was this action called on a Splitview port?");const o=r.filter((l,c)=>c!==t.index),a=r[t.index]!=n.activePageId?n.activePageId:r[t.index+1]||r[t.index-1],s={...e.viewport.ports,[`${t.portId}`]:{...n,pageIds:o,activePageId:a}};return{...e,viewport:{...e.viewport,ports:s}}},Yt=(e,t)=>{if(Object.keys(e.viewport.ports).length!==0)throw Error("_add_new_view() should only be called on an empty viewport. Otherwise call _add_view()");const n=W(),r={[`${n}`]:{parentId:null,isSplitView:!1,pageIds:[t.pageId],activePageId:t.pageId,direction:null,headId:null,tailId:null,isHead:null}};return{...e,viewport:{root:n,ports:r}}},Wt=(e,t)=>{var d;J("Add View",e,t);const n=W(),r=W(),o=L(e.viewport.ports,t.portId),a=!o.parentId;t.dragPortId===t.portId&&(o.pageIds=(d=o.pageIds)==null?void 0:d.filter(p=>p!==t.pageId));const s={parentId:n,isSplitView:!1,pageIds:[t.pageId],activePageId:t.pageId,direction:null,headId:null,tailId:null,isHead:t.side===B.HEAD},l={parentId:o.parentId,isSplitView:!0,pageIds:null,activePageId:null,direction:t.direction,headId:t.side===B.HEAD?r:t.portId,tailId:t.side===B.TAIL?r:t.portId,isHead:o.isHead},c={...e.viewport.ports,[`${n}`]:l,[`${r}`]:s};if(!a){const p=L(e.viewport.ports,o.parentId);o.isHead&&(p.headId=n),o.isHead!==null&&!o.isHead&&(p.tailId=n),c[o.parentId]=p}return o.parentId=n,o.isHead=t.side===B.TAIL,o.activePageId=o.activePageId===t.pageId?o.pageIds&&o.pageIds[0]:o.activePageId,c[t.portId]=o,{...e,viewport:{root:a?n:e.viewport.root,ports:c}}},Kt=(e,t)=>{if(J("Remove View",e,t),!Object.keys(e.viewport.ports).includes(t.portId.toString()))return e;let r=e.viewport.root,o=L(e.viewport.ports,t.portId);if(!o.parentId)return{...e,viewport:Pe};const s=L(e.viewport.ports,o.parentId),l=!s.parentId,c=kt(e.viewport,t.portId),d={...e.viewport.ports};if(l)c&&(r=c.id,c.port.parentId=null,c.port.isHead=null,d[c.id]=c.port);else{const p=s.parentId,u=L(e.viewport.ports,p);s.isHead?u.headId=c==null?void 0:c.id:u.tailId=c==null?void 0:c.id,c&&(c.port.parentId=p,c.port.isHead=s.isHead,d[c.id]=c.port),d[p]=u}return delete d[t.portId],delete d[o.parentId],{...e,viewport:{root:r,ports:d}}},Gt=(e,t)=>{J("Change Active View",e,t);const n=L(e.viewport.ports,t.portId),r={...e.viewport.ports,[`${t.portId}`]:{...n,activePageId:t.pageId}};return{...e,viewport:{...e.viewport,ports:r}}},Pe={root:"",ports:{},skipTabRemoval:!1},M=e=>{const t=xe()||j,{ports:n,root:r}=e==null?void 0:e.viewport;return ge(t,n,r,!0),e},Ft=(e,t)=>{switch(t.type){case N.ADD_TAB:return M(Mt(e,t.payload));case N.REMOVE_TAB:return M(jt(e,t.payload));case N.ADD_NEW_VIEW:return M(Yt(e,t.payload));case N.ADD_VIEW:return M(Wt(e,t.payload));case N.REMOVE_VIEW:return M(Kt(e,t.payload));case N.CHANGE_ACTIVE_VIEW:return M(Gt(e,t.payload));default:return e}},Fe=e=>e.pageIds!==void 0,Ue=e=>e.head!==void 0,j="root",E=m.exports.createContext({state:{pages:{},viewport:Pe,viewportId:"",tree:{},styles:{},classes:{},events:{}}}),Ut=({pages:e,tree:t,views:n})=>{if(!nt(e))throw Error('"pages" props should be of the form, PagesT.');if(!Array.isArray(t))throw Error('"tree" prop must be an array.');if(n&&!(Fe(n)||Ue(n)))throw Error('"views" props should be of type - ViewT or SplitViewT.')},ue=({pages:e,views:t,tree:n,styles:r,classes:o,events:a,enableTrashcan:s=!1,enableDynamicTree:l=!1})=>{Ut({pages:e,views:t,tree:n});const c=xe();window.addEventListener("beforeunload",()=>{we(c||"root",!1)},!1);const d=(T,w,h=null,S=null)=>{const D=W();if(Fe(T)){const f=T;w[D]={parentId:h,isSplitView:!1,pageIds:f.pageIds,activePageId:f.activePageId,direction:null,headId:null,tailId:null,isHead:S}}else if(Ue(T)){const f=T;w[D]={parentId:h,isSplitView:!0,pageIds:null,activePageId:null,direction:f.direction,headId:d(f.head,w,D,!0),tailId:d(f.tail,w,D,!1),isHead:S}}else throw new Error("All viewport values must be of type ViewT or SplitViewT");return D},p=T=>{const w={},h=m.exports.useMemo(()=>d(T,w),[]);return{ports:w,rootId:h}},u=()=>{const T={ports:{},rootId:""};if(c){const h=Ye(c);if((h==null?void 0:h.ports)&&(h==null?void 0:h.rootId)){we(c);const{ports:S,rootId:D}=h;return{ports:S,rootId:D}}return T}const w=G();if(w&&w[j]){we(j);const{ports:h,rootId:S}=w[j];return{ports:h,rootId:S}}if(t){const{ports:h,rootId:S}=p(t);return ge(j,h,S,!0),{ports:h,rootId:S}}return ge(j,{},null,!0),T},{ports:b,rootId:C}=u(),O={...Pe,root:C,ports:b},I={pages:e,viewport:O,viewportId:c,tree:n,styles:r||{},classes:o||{},events:a||{}},[V,P]=m.exports.useReducer(Ft,I),A=m.exports.useMemo(()=>({state:V,dispatch:P}),[V,P]);return i(E.Provider,{value:A,children:i(pe,{enableTrashcan:s,enableDynamicTree:l})})};var Ze=ue;try{ue.displayName="Tuple",ue.__docgenInfo={description:"",displayName:"Tuple",props:{pages:{defaultValue:null,description:"",name:"pages",required:!0,type:{name:"PagesT"}},tree:{defaultValue:null,description:"",name:"tree",required:!0,type:{name:"TreeT"}},views:{defaultValue:null,description:"",name:"views",required:!1,type:{name:"ViewportT"}},styles:{defaultValue:null,description:"",name:"styles",required:!1,type:{name:"TupleStylesT"}},classes:{defaultValue:null,description:"",name:"classes",required:!1,type:{name:"TupleClassesT"}},events:{defaultValue:null,description:"",name:"events",required:!1,type:{name:"EventsT"}},enableTrashcan:{defaultValue:{value:"false"},description:"",name:"enableTrashcan",required:!1,type:{name:"boolean"}},enableDynamicTree:{defaultValue:{value:"false"},description:"",name:"enableDynamicTree",required:!1,type:{name:"boolean"}},onTreeUpdate:{defaultValue:null,description:"",name:"onTreeUpdate",required:!1,type:{name:"(tree: TreeT) => void"}},onViewportUpdate:{defaultValue:null,description:"",name:"onViewportUpdate",required:!1,type:{name:"(viewport: ViewportT) => void"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/index.tsx#Tuple"]={docgenInfo:ue.__docgenInfo,name:"Tuple",path:"src/components/Tuple/index.tsx#Tuple"})}catch{}const me=e=>i("div",{...e,children:e.children});var y=m.exports.memo(me);try{me.displayName="Page",me.__docgenInfo={description:"",displayName:"Page",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Page/index.tsx#Page"]={docgenInfo:me.__docgenInfo,name:"Page",path:"src/components/Page/index.tsx#Page"})}catch{}const Zt="_view_1v79r_1",zt="_tabBar_1v79r_7",Jt="_tab_1v79r_7",Qt="_tabActive_1v79r_16",Xt="_tabClose_1v79r_20",en="_tree_1v79r_24",tn="_branch_1v79r_29",nn="_branches_1v79r_40";var rn={view:Zt,tabBar:zt,tab:Jt,tabActive:Qt,tabClose:Xt,tree:en,branch:tn,branches:nn};const an="_tuple_yvf0f_13",on="_viewport_yvf0f_13",sn="_draggable_yvf0f_17",dn="_tree_yvf0f_27",cn="_branch_yvf0f_33",ln="_branches_yvf0f_46",pn="_leaf_yvf0f_51",un="_rootlets_yvf0f_62",mn="_rootletTextBox_yvf0f_69",gn="_view_yvf0f_13",fn="_tabBar_yvf0f_91",vn="_tabClose_yvf0f_96",_n="_tab_yvf0f_91",hn="_tabActive_yvf0f_108";var bn={tuple:an,viewport:on,draggable:sn,tree:dn,branch:cn,branches:ln,leaf:pn,rootlets:un,rootletTextBox:mn,view:gn,tabBar:fn,tabClose:vn,tab:_n,tabActive:hn};const In="_tuple_p6d3d_16",Tn="_viewport_p6d3d_16",wn="_draggable_p6d3d_21",yn="_tree_p6d3d_31",Sn="_scrollpane_p6d3d_43",Cn="_branch_p6d3d_48",Vn="_branches_p6d3d_60",xn="_leaf_p6d3d_65",Pn="_root_p6d3d_77",Dn="_rootlets_p6d3d_87",En="_rootletTextBox_p6d3d_95",On="_view_p6d3d_16",An="_page_p6d3d_119",Nn="_tabBar_p6d3d_126",qn="_tabClose_p6d3d_133",Bn="_tab_p6d3d_126",Rn="_tabActive_p6d3d_155";var Ln={tuple:In,viewport:Tn,draggable:wn,tree:yn,scrollpane:Sn,branch:Cn,branches:Vn,leaf:xn,root:Pn,rootlets:Dn,rootletTextBox:En,view:On,page:An,tabBar:Nn,tabClose:qn,tab:Bn,tabActive:Rn},Sr={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import Tuple, { TupleProps } from '.';

import { TreeT } from "./Tree/TreeTypes";
import { SplitViewT, ViewT } from "./Viewport/ViewportTypes";
import { PagesT } from "./TupleTypes";
import Page from "../Page";

import classes from './tuple.stories.module.css';
import LannisterCss from './templates/lannister.module.css';
import BaratheonCss from './templates/baratheon.module.css';

export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// PAGES
//----------------------------------------------------------------------------------------------------------------------

const lorem = <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus viverra accumsan in nisl nisi. Egestas dui id ornare arcu odio ut sem nulla pharetra. Duis tristique sollicitudin nibh sit amet. Adipiscing at in tellus integer feugiat. Ultrices eros in cursus turpis massa tincidunt dui ut. Massa tincidunt dui ut ornare. Enim neque volutpat ac tincidunt vitae semper quis. Rhoncus dolor purus non enim. Aenean et tortor at risus viverra adipiscing at in. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Felis bibendum ut tristique et egestas. At volutpat diam ut venenatis tellus. Scelerisque varius morbi enim nunc faucibus a pellentesque. Tristique senectus et netus et malesuada fames.

Et netus et malesuada fames ac turpis egestas integer eget. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac turpis egestas sed tempus urna et pharetra. Bibendum enim facilisis gravida neque convallis a cras. Tempus egestas sed sed risus pretium. Diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc sed. Eget arcu dictum varius duis at consectetur lorem. Morbi tristique senectus et netus et malesuada. Gravida cum sociis natoque penatibus. In hac habitasse platea dictumst quisque sagittis purus sit amet. Cursus sit amet dictum sit amet justo donec enim.

Blandit libero volutpat sed cras ornare arcu dui vivamus. Adipiscing bibendum est ultricies integer quis auctor elit sed. Est placerat in egestas erat imperdiet sed euismod nisi. Tincidunt praesent semper feugiat nibh sed pulvinar. Nunc sed id semper risus in hendrerit gravida. Non arcu risus quis varius quam quisque id diam. Morbi tincidunt ornare massa eget egestas purus. Eget nunc scelerisque viverra mauris in aliquam sem. At consectetur lorem donec massa sapien. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Sit amet tellus cras adipiscing enim eu turpis egestas. Pellentesque habitant morbi tristique senectus. Ac turpis egestas sed tempus urna et pharetra. Augue neque gravida in fermentum et sollicitudin ac.

Integer enim neque volutpat ac tincidunt vitae semper quis. Nisl purus in mollis nunc sed. Sit amet venenatis urna cursus. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Nunc mattis enim ut tellus elementum sagittis vitae et. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Faucibus scelerisque eleifend donec pretium. At auctor urna nunc id cursus metus aliquam eleifend. Id aliquet risus feugiat in ante metus dictum at. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Semper feugiat nibh sed pulvinar proin gravida. Mauris sit amet massa vitae tortor. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.

Posuere ac ut consequat semper viverra. Nullam vehicula ipsum a arcu cursus vitae congue. Curabitur gravida arcu ac tortor dignissim convallis. Amet dictum sit amet justo. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Elementum eu facilisis sed odio morbi quis. Lacus laoreet non curabitur gravida arcu ac tortor. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Maecenas pharetra convallis posuere morbi. Vitae nunc sed velit dignissim sodales ut eu sem. Sit amet purus gravida quis blandit turpis. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Diam sollicitudin tempor id eu nisl nunc mi. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Suspendisse ultrices gravida dictum fusce ut placerat orci. Praesent elementum facilisis leo vel fringilla.</div>;
const world = <div>world</div>;
const ford = <div>ford</div>;
const jeep = <div>jeep</div>;
const chrysler = <div>chrysler</div>;
const ferrari = <div>ferrari</div>;
const gm = <div>gm</div>;
const honda = <div>honda</div>;
const carpe = <div>carpe</div>;
const diem = <div>diem</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;
const apple = <div>apple</div>;
const banana = <div>banana</div>;
const carrot = <div>carrot</div>;
const brocoli = <div>brocoli</div>;
const tomato = <div>tomato</div>;
const orange = <div>orange</div>;

const pages: PagesT = {
    'lorem':    { id: 10, name: 'lorem'     , component: () => <Page>{lorem}</Page> },
    'world':    { id: 11, name: 'world'     , component: () => <Page>{world}</Page> },
    'ford':     { id: 12, name: 'ford'      , component: () => <Page>{ford}</Page> },
    'jeep':     { id: 13, name: 'jeep'      , component: () => <Page>{jeep}</Page> },
    'chrysler': { id: 14, name: 'chrysler'  , component: () => <Page>{chrysler}</Page> },
    'ferrari':  { id: 15, name: 'ferrari'   , component: () => <Page>{ferrari}</Page> },
    'gm':       { id: 16, name: 'gm'        , component: () => <Page>{gm}</Page> },
    'honda':    { id: 17, name: 'honda'     , component: () => <Page>{honda}</Page> },
    'carpe':    { id: 18, name: 'carpe'     , component: () => <Page>{carpe}</Page> },
    'diem':     { id: 19, name: 'diem'      , component: () => <Page>{diem}</Page> },
    'monkey':   { id: 20, name: 'monkey'    , component: () => <Page>{monkey}</Page> },
    'pox':      { id: 21, name: 'pox'       , component: () => <Page>{pox}</Page> },
    'apple':    { id: 22, name: 'apple'     , component: () => <Page>{apple}</Page> },
    'banana':   { id: 23, name: 'banana'    , component: () => <Page>{banana}</Page> },
    'carrot':   { id: 24, name: 'carrot'    , component: () => <Page>{carrot}</Page> },
    'brocoli':  { id: 25, name: 'brocoli'   , component: () => <Page>{brocoli}</Page> },
    'tomato':   { id: 26, name: 'tomato'    , component: () => <Page>{tomato}</Page> },
    'orange':   { id: 27, name: 'orange'    , component: () => <Page>{orange}</Page> },
};

//----------------------------------------------------------------------------------------------------------------------
// TREE
//----------------------------------------------------------------------------------------------------------------------
const tree: TreeT = [
    { id: 10, pageId: 'lorem' },
    { id: 11, pageId: 'world' },
    { id: 1, label: 'yolo', branches: [
        { id: 12, pageId: 'carpe' },
        { id: 13, pageId: 'diem' },
        { id: 2, label: 'hello again', branches: [
            { id: 14, pageId: 'world' },
            { id: 3, label: 'cars', branches: [
                { id: 15, pageId: 'ford' },
                { id: 16, pageId: 'jeep' },
                { id: 17, pageId: 'chrysler' },
                { id: 18, pageId: 'ferrari' } ,
                { id: 19, pageId: 'gm' },
                { id: 20, pageId: 'honda' },
                { id: 4, label: 'cars', branches: [
                    { id: 21, pageId: 'ford' },
                    { id: 22, pageId: 'jeep' },
                    { id: 23, pageId: 'chrysler' },
                    { id: 24, pageId: 'ferrari' },
                    { id: 25, pageId: 'gm' },
                    { id: 26, pageId: 'honda' },
                    { id: 5, label: 'cars', branches: [
                        { id: 27, pageId: 'ford' },
                        { id: 28, pageId: 'jeep' },
                        { id: 29, pageId: 'chrysler' },
                        { id: 30, pageId: 'ferrari' },
                        { id: 31, pageId: 'gm' },
                        { id: 32, pageId: 'honda' },
                        { id: 5, label: 'cars', branches: [
                            { id: 33, pageId: 'ford' },
                            { id: 34, pageId: 'jeep' },
                            { id: 35, pageId: 'chrysler' },
                            { id: 36, pageId: 'ferrari' },
                            { id: 37, pageId: 'gm' },
                            { id: 38, pageId: 'honda' },
                        ]},
                    ]}
                ]}
            ]}
        ]}
    ]},
    { id: 39, pageId: 'monkey' },
    { id: 40, pageId: 'pox' },
];


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<TupleProps> = (args: any) => {
    return (
        <div style={{
            height: 900,
            width: 1500,
            border: '1px solid lightgrey',
        }}>
            <Tuple {...args} />
        </div>
    );
}


//----------------------------------------------------------------------------------------------------------------------
// Views
//----------------------------------------------------------------------------------------------------------------------
const HelloWorld: ViewT = {
    pageIds: ['hello', 'world'],
    activePageId: 'hello',
};

const Cars: ViewT = {
    pageIds: ['ford', 'jeep', 'chrysler', 'ferrari', 'gm', 'honda'],
    activePageId: 'jeep',
};

const Carpe: ViewT = {
    pageIds: ['carpe'],
    activePageId: 'carpe',
};

const Diem: ViewT = {
    pageIds: ['diem'],
    activePageId: 'diem',
};

const MonkeyPox: ViewT = {
    pageIds: ['monkey', 'pox'],
    activePageId: 'monkey',
};

const Apple: ViewT = {
    pageIds: ['apple'],
    activePageId: 'apple',
};

const Banana: ViewT = {
    pageIds: ['banana'],
    activePageId: 'banana',
};

const Carrot: ViewT = {
    pageIds: ['carrot'],
    activePageId: 'carrot',
};

const Brocoli: ViewT = {
    pageIds: ['brocoli'],
    activePageId: 'brocoli',
};

const Tomato: ViewT = {
    pageIds: ['tomato'],
    activePageId: 'tomato',
};

const Orange: ViewT = {
    pageIds: ['orange'],
    activePageId: 'orange',
};


//----------------------------------------------------------------------------------------------------------------------
// No Views
export const NoViews = Template.bind({});
NoViews.args = {
    pages,
    tree,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// Six Views - No Template
const _SixViewsTopRight: SplitViewT = { head: Cars, tail: Carpe, direction: 'vertical' };
const _SixViewsTop: SplitViewT = { head: HelloWorld, tail: _SixViewsTopRight, direction: 'horizontal' };
const _SixViewsBottomLeft: SplitViewT = { head: Apple, tail: Banana, direction: 'horizontal' };
const _SixViewsBottom: SplitViewT = { head: _SixViewsBottomLeft, tail: Diem, direction: 'horizontal' };
const __SixViews: SplitViewT = { head: _SixViewsTop, tail: _SixViewsBottom, direction: 'vertical' };

export const SixViewsNoStyles = Template.bind({});
SixViewsNoStyles.args = {
    pages,
    views: __SixViews,
    tree,
    enableDynamicTree: true,
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Lannister
export const Lannister = Template.bind({});
Lannister.args = {
    pages,
    views: __SixViews,
    tree,
    classes: LannisterCss,
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Baratheon
export const Baratheon = Template.bind({});
Baratheon.args = {
    pages,
    views: __SixViews,
    tree,
    classes: BaratheonCss,
};
`,locationsMap:{"no-views":{startLoc:{col:36,line:126},endLoc:{col:1,line:136},startBody:{col:36,line:126},endBody:{col:1,line:136}},"six-views-no-styles":{startLoc:{col:36,line:126},endLoc:{col:1,line:136},startBody:{col:36,line:126},endBody:{col:1,line:136}},lannister:{startLoc:{col:36,line:126},endLoc:{col:1,line:136},startBody:{col:36,line:126},endBody:{col:1,line:136}},baratheon:{startLoc:{col:36,line:126},endLoc:{col:1,line:136},startBody:{col:36,line:126},endBody:{col:1,line:136}}}}},title:"Components/Tuple",component:Ze,argTypes:{handleClick:{action:"handleClick"}}};const Hn=i("div",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus viverra accumsan in nisl nisi. Egestas dui id ornare arcu odio ut sem nulla pharetra. Duis tristique sollicitudin nibh sit amet. Adipiscing at in tellus integer feugiat. Ultrices eros in cursus turpis massa tincidunt dui ut. Massa tincidunt dui ut ornare. Enim neque volutpat ac tincidunt vitae semper quis. Rhoncus dolor purus non enim. Aenean et tortor at risus viverra adipiscing at in. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Felis bibendum ut tristique et egestas. At volutpat diam ut venenatis tellus. Scelerisque varius morbi enim nunc faucibus a pellentesque. Tristique senectus et netus et malesuada fames. Et netus et malesuada fames ac turpis egestas integer eget. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac turpis egestas sed tempus urna et pharetra. Bibendum enim facilisis gravida neque convallis a cras. Tempus egestas sed sed risus pretium. Diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc sed. Eget arcu dictum varius duis at consectetur lorem. Morbi tristique senectus et netus et malesuada. Gravida cum sociis natoque penatibus. In hac habitasse platea dictumst quisque sagittis purus sit amet. Cursus sit amet dictum sit amet justo donec enim. Blandit libero volutpat sed cras ornare arcu dui vivamus. Adipiscing bibendum est ultricies integer quis auctor elit sed. Est placerat in egestas erat imperdiet sed euismod nisi. Tincidunt praesent semper feugiat nibh sed pulvinar. Nunc sed id semper risus in hendrerit gravida. Non arcu risus quis varius quam quisque id diam. Morbi tincidunt ornare massa eget egestas purus. Eget nunc scelerisque viverra mauris in aliquam sem. At consectetur lorem donec massa sapien. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Sit amet tellus cras adipiscing enim eu turpis egestas. Pellentesque habitant morbi tristique senectus. Ac turpis egestas sed tempus urna et pharetra. Augue neque gravida in fermentum et sollicitudin ac. Integer enim neque volutpat ac tincidunt vitae semper quis. Nisl purus in mollis nunc sed. Sit amet venenatis urna cursus. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Nunc mattis enim ut tellus elementum sagittis vitae et. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Faucibus scelerisque eleifend donec pretium. At auctor urna nunc id cursus metus aliquam eleifend. Id aliquet risus feugiat in ante metus dictum at. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Semper feugiat nibh sed pulvinar proin gravida. Mauris sit amet massa vitae tortor. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Posuere ac ut consequat semper viverra. Nullam vehicula ipsum a arcu cursus vitae congue. Curabitur gravida arcu ac tortor dignissim convallis. Amet dictum sit amet justo. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Elementum eu facilisis sed odio morbi quis. Lacus laoreet non curabitur gravida arcu ac tortor. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Maecenas pharetra convallis posuere morbi. Vitae nunc sed velit dignissim sodales ut eu sem. Sit amet purus gravida quis blandit turpis. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Diam sollicitudin tempor id eu nisl nunc mi. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Suspendisse ultrices gravida dictum fusce ut placerat orci. Praesent elementum facilisis leo vel fringilla."}),$n=i("div",{children:"world"}),kn=i("div",{children:"ford"}),Mn=i("div",{children:"jeep"}),jn=i("div",{children:"chrysler"}),Yn=i("div",{children:"ferrari"}),Wn=i("div",{children:"gm"}),Kn=i("div",{children:"honda"}),Gn=i("div",{children:"carpe"}),Fn=i("div",{children:"diem"}),Un=i("div",{children:"monkey"}),Zn=i("div",{children:"pox"}),zn=i("div",{children:"apple"}),Jn=i("div",{children:"banana"}),Qn=i("div",{children:"carrot"}),Xn=i("div",{children:"brocoli"}),er=i("div",{children:"tomato"}),tr=i("div",{children:"orange"}),be={lorem:{id:10,name:"lorem",component:()=>i(y,{children:Hn})},world:{id:11,name:"world",component:()=>i(y,{children:$n})},ford:{id:12,name:"ford",component:()=>i(y,{children:kn})},jeep:{id:13,name:"jeep",component:()=>i(y,{children:Mn})},chrysler:{id:14,name:"chrysler",component:()=>i(y,{children:jn})},ferrari:{id:15,name:"ferrari",component:()=>i(y,{children:Yn})},gm:{id:16,name:"gm",component:()=>i(y,{children:Wn})},honda:{id:17,name:"honda",component:()=>i(y,{children:Kn})},carpe:{id:18,name:"carpe",component:()=>i(y,{children:Gn})},diem:{id:19,name:"diem",component:()=>i(y,{children:Fn})},monkey:{id:20,name:"monkey",component:()=>i(y,{children:Un})},pox:{id:21,name:"pox",component:()=>i(y,{children:Zn})},apple:{id:22,name:"apple",component:()=>i(y,{children:zn})},banana:{id:23,name:"banana",component:()=>i(y,{children:Jn})},carrot:{id:24,name:"carrot",component:()=>i(y,{children:Qn})},brocoli:{id:25,name:"brocoli",component:()=>i(y,{children:Xn})},tomato:{id:26,name:"tomato",component:()=>i(y,{children:er})},orange:{id:27,name:"orange",component:()=>i(y,{children:tr})}},Ie=[{id:10,pageId:"lorem"},{id:11,pageId:"world"},{id:1,label:"yolo",branches:[{id:12,pageId:"carpe"},{id:13,pageId:"diem"},{id:2,label:"hello again",branches:[{id:14,pageId:"world"},{id:3,label:"cars",branches:[{id:15,pageId:"ford"},{id:16,pageId:"jeep"},{id:17,pageId:"chrysler"},{id:18,pageId:"ferrari"},{id:19,pageId:"gm"},{id:20,pageId:"honda"},{id:4,label:"cars",branches:[{id:21,pageId:"ford"},{id:22,pageId:"jeep"},{id:23,pageId:"chrysler"},{id:24,pageId:"ferrari"},{id:25,pageId:"gm"},{id:26,pageId:"honda"},{id:5,label:"cars",branches:[{id:27,pageId:"ford"},{id:28,pageId:"jeep"},{id:29,pageId:"chrysler"},{id:30,pageId:"ferrari"},{id:31,pageId:"gm"},{id:32,pageId:"honda"},{id:5,label:"cars",branches:[{id:33,pageId:"ford"},{id:34,pageId:"jeep"},{id:35,pageId:"chrysler"},{id:36,pageId:"ferrari"},{id:37,pageId:"gm"},{id:38,pageId:"honda"}]}]}]}]}]}]},{id:39,pageId:"monkey"},{id:40,pageId:"pox"}],Te=e=>i("div",{style:{height:900,width:1500,border:"1px solid lightgrey"},children:i(Ze,{...e})}),nr={pageIds:["hello","world"],activePageId:"hello"},rr={pageIds:["ford","jeep","chrysler","ferrari","gm","honda"],activePageId:"jeep"},ar={pageIds:["carpe"],activePageId:"carpe"},or={pageIds:["diem"],activePageId:"diem"},ir={pageIds:["apple"],activePageId:"apple"},sr={pageIds:["banana"],activePageId:"banana"},dr=Te.bind({});dr.args={pages:be,tree:Ie,classes:rn};const cr={head:rr,tail:ar,direction:"vertical"},lr={head:nr,tail:cr,direction:"horizontal"},pr={head:ir,tail:sr,direction:"horizontal"},ur={head:pr,tail:or,direction:"horizontal"},De={head:lr,tail:ur,direction:"vertical"},mr=Te.bind({});mr.args={pages:be,views:De,tree:Ie,enableDynamicTree:!0};const gr=Te.bind({});gr.args={pages:be,views:De,tree:Ie,classes:bn};const fr=Te.bind({});fr.args={pages:be,views:De,tree:Ie,classes:Ln};const Cr=["NoViews","SixViewsNoStyles","Lannister","Baratheon"];export{fr as Baratheon,gr as Lannister,dr as NoViews,mr as SixViewsNoStyles,Cr as __namedExportsOrder,Sr as default};
//# sourceMappingURL=Tuple.stories.4b72a6e3.js.map
