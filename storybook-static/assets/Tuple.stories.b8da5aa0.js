import{r as g}from"./index.b461da8a.js";import{a as z}from"./DropZoneSides.4db44d78.js";import{j as i,a as R,F as Oe}from"./jsx-runtime.3c5536b9.js";import{_ as qe}from"./styles.module.6d7c69b6.js";import{S as Ne}from"./index.8b918fca.js";import{S as Re}from"./index.e62c7fbf.js";import{D as Xe}from"./index.4c66f3ac.js";import{D as et}from"./DropZoneCenter.640d5182.js";const M=()=>tt()+Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),tt=()=>{const e=["apple","zebra","lion","pancho","lioness","tough","weak","pretty","monkey","monster","imp","sloth","dragon","house","door","window","air","park","tree","chipmunk","monk","priestess","elephant"],t=e.length-1,n=0,r=Math.floor(Math.random()*(t-n+1)+n);return e[r]},nt=e=>typeof e=="object"&&!Array.isArray(e)&&e!==null;globalThis&&globalThis.__awaiter;function rt(e){const t=g.exports.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return Be(()=>{t.current=e},[e]),g.exports.useCallback((...n)=>t.current(...n),[t])}function Ae(e,t,n,r){const o=g.exports.useRef(t);Be(()=>{o.current=t},[t]),g.exports.useEffect(()=>{var a;const s=(a=n==null?void 0:n.current)!==null&&a!==void 0?a:window;if(!(s&&s.addEventListener))return;const l=d=>o.current(d);return s.addEventListener(e,l,r),()=>{s.removeEventListener(e,l,r)}},[e,n,r])}globalThis&&globalThis.__awaiter;const Be=typeof window!="undefined"?g.exports.useLayoutEffect:g.exports.useEffect;function F(e,t){const n=g.exports.useCallback(()=>{if(typeof window=="undefined")return t;try{const l=window.localStorage.getItem(e);return l?at(l):t}catch(l){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,l),t}},[t,e]),[r,o]=g.exports.useState(n),a=rt(l=>{typeof window=="undefined"&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{const d=l instanceof Function?l(r):l;window.localStorage.setItem(e,JSON.stringify(d)),o(d),window.dispatchEvent(new Event("local-storage"))}catch(d){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,d)}});g.exports.useEffect(()=>{o(n())},[]);const s=g.exports.useCallback(l=>{(l==null?void 0:l.key)&&l.key!==e||o(n())},[e,n]);return Ae("storage",s),Ae("local-storage",s),[r,a]}function at(e){try{return e==="undefined"?void 0:JSON.parse(e!=null?e:"")}catch{console.log("parsing error on",{value:e});return}}const ot="_draggable_1uxtm_1";var it={draggable:ot};const Le="DRAG_QUEEN_STORY_HOUR_LMAOOOOO",Te=(e,t="Dragging",n="",r=null)=>{const o=document.createElement("div");if(o.id=Le,o.innerText=t,o.className=`${it.draggable} ${n}`,r)for(const a in r)o.style[a]=r[a];document.body.appendChild(o),e.dataTransfer.setDragImage(o,40,12)},K=()=>{const e=document.getElementById(Le);e!=null&&e.parentNode&&e.parentNode.removeChild(e)},ue=e=>!!(e.dataTransfer&&e.dataTransfer.getData("pageId")),He=(e,t)=>e<0||e>window.outerWidth||t<0||t>window.outerHeight,B="ports",$e="dragged_to_tuple",ke="p",me="dragging",Y=()=>{const e=localStorage.getItem(B);return e?JSON.parse(e):null},Me=e=>{const t=JSON.parse(localStorage.getItem(B));return t&&t[e]?t[e]:null},le=(e,t,n,r)=>{const o=Y()||{};o[e]={open:r,ports:t,rootId:n},localStorage.setItem(B,JSON.stringify(o))},st=e=>{const t=Y();t&&delete t[e],localStorage.setItem(B,JSON.stringify(t))},dt=(e,t)=>{const n=Y();if(n[e]){const{ports:r,rootId:o,open:a}=n[e];if(a)return alert("Please close this viewport before renaming"),!1;if(r)return le(t,r,o,!1),st(e),!0}return!1},je=e=>{const t=M(),n=M(),r=Y()||{},o={parentId:null,isSplitView:!1,pageIds:[e],activePageId:e,direction:null,headId:null,tailId:null,isHead:null},a={[n]:o};return r[t]={open:!1,ports:a,rootId:n},localStorage.setItem(B,JSON.stringify(r)),t},he=(e,t=!0)=>{const n=Y()||{};if(e in n)n[e]={...n[e],open:t},localStorage.setItem(B,JSON.stringify(n));else throw new Error(`Could not find id "${e}" in storage.`)},pe=e=>{if(Me(e).open)return;const n=new URL(window.location.href);n.searchParams.set(ke,e.toString()),window.open(n,"",`height=${600}, width=${800}`)},ye=()=>new URLSearchParams(location.search).get(ke)||"",Ye=async(e=0)=>{let t=!1;const n=JSON.parse(localStorage.getItem($e));return j(!1),n&&(t=!!n),new Promise((r,o)=>setTimeout(()=>{r(t)},e))},j=e=>{localStorage.setItem($e,JSON.stringify(e))};var O=(e=>(e.HEAD="HEAD",e.TAIL="TAIL",e.NULL="NULL",e))(O||{}),E=(e=>(e.ADD_TAB="ADD_TAB",e.REMOVE_TAB="REMOVE_TAB",e.ADD_NEW_VIEW="ADD_NEW_VIEW",e.ADD_VIEW="ADD_VIEW",e.REMOVE_VIEW="REMOVE_VIEW",e.CHANGE_ACTIVE_VIEW="CHANGE_ACTIVE_VIEW",e))(E||{});const ge=(e,t,n,r,o=0)=>{const a={type:E.ADD_TAB,payload:{portId:t,pageId:r,dragPortId:n,index:o}};e(a)},ct=(e,t,n)=>{const r={type:E.REMOVE_TAB,payload:{portId:t,index:n}};e(r)},we=(e,t)=>{const n={pageId:t},r={type:E.ADD_NEW_VIEW,payload:n};e(r)},lt=(e,t,n,r,o)=>{const a={dragPortId:n,portId:t,pageId:r,side:O.NULL,direction:"none"};switch(o){case z.TOP:a.side=O.HEAD,a.direction="vertical";break;case z.RIGHT:a.side=O.TAIL,a.direction="horizontal";break;case z.BOTTOM:a.side=O.TAIL,a.direction="vertical";break;case z.LEFT:a.side=O.HEAD,a.direction="horizontal";break;default:throw Error("Unknown side.")}const s={type:E.ADD_VIEW,payload:a};e(s)},pt=(e,t)=>{const n={type:E.REMOVE_VIEW,payload:{portId:t}};e(n)},ut=(e,t,n)=>{const r={type:E.CHANGE_ACTIVE_VIEW,payload:{portId:t,pageId:n}};e(r)},mt="_tree_aetui_7",gt="_branch_aetui_15",ft="_branches_aetui_26",_t="_leaf_aetui_32",vt="_root_aetui_43",ht="_rootlets_aetui_53",It="_rootlet_aetui_53",bt="_rootletTextBox_aetui_70",wt="_symbolContainer_aetui_92",Tt="_trashcan_aetui_97",yt="_trashcanHover_aetui_113";var f={tree:mt,branch:gt,branches:ft,leaf:_t,root:vt,rootlets:ht,rootlet:It,rootletTextBox:bt,symbolContainer:wt,trashcan:Tt,trashcanHover:yt};const Q=({text:e,pageId:t,path:n})=>{const{dispatch:r,state:{pages:o,viewport:a,classes:s,styles:l,events:d}}=g.exports.useContext(x),[c,p]=F(me,!1),u=`
        ${(f==null?void 0:f.leaf)||""}
        ${(s==null?void 0:s.leaf)||""}`,T=(s==null?void 0:s.draggable)||"",A=(m,I)=>{const y=m[I];return y?m[I].isSplitView?A(m,y.headId):I:null},D=()=>{const{root:m,ports:I}=a;return A(I,m)},v=m=>{Te(m,e,T,l.draggable),m.dataTransfer.setData("pageId",t),p(!0)},h=async m=>{K(),p(!1);const{clientX:I,clientY:y}=m;if(He(I,y)&&!await Ye()){const P=je(t);pe(P)}},V=m=>{d!=null&&d.onTreeDrop&&m.preventDefault()},b=m=>{if(d!=null&&d.onTreeDrop){const I=m.dataTransfer&&m.dataTransfer.getData("pageId"),y=o[I].name,q=m.dataTransfer&&m.dataTransfer.getData("portId")?"viewport":"tree";d.onTreeDrop(m,e,n,y,q,"leaf")}},w=()=>{Object.keys(o).length<=0&&we(r,t);const m=D();m?ge(r,m,"",t):we(r,t)};return i("div",{style:l.leaf,className:u,draggable:!0,onDragStart:v,onDragEnd:h,onDragOver:V,onDrop:b,onClick:w,children:e})};try{Q.displayName="Leaf",Q.__docgenInfo={description:"",displayName:"Leaf",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},pageId:{defaultValue:null,description:"",name:"pageId",required:!0,type:{name:"ID"}},path:{defaultValue:null,description:"",name:"path",required:!0,type:{name:"string[]"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Leaf.tsx#Leaf"]={docgenInfo:Q.__docgenInfo,name:"Leaf",path:"src/components/Tuple/Tree/Leaf.tsx#Leaf"})}catch{}const G=({text:e,children:t,open:n=!1,branchClassName:r,branchesClassName:o,branchStyle:a={},branchesStyle:s={},path:l=[]})=>{const{state:{pages:d,events:c}}=g.exports.useContext(x),[p,u]=g.exports.useState(n),T=`
        ${qe.noHighlight}
        ${r||""}`;return R("div",{children:[i("div",{className:T,style:a,onClick:()=>{g.exports.Children.count(t)&&u(h=>!h)},onDragOver:h=>{c!=null&&c.onTreeDrop&&h.preventDefault()},onDrop:h=>{if(c!=null&&c.onTreeDrop){const V=h.dataTransfer&&h.dataTransfer.getData("pageId"),b=d[V].name,m=h.dataTransfer&&h.dataTransfer.getData("portId")?"viewport":"tree";c.onTreeDrop(h,e,l,b,m,"branch")}},children:e}),p&&i("div",{className:o,style:s,children:t})]})};try{G.displayName="Branch",G.__docgenInfo={description:"",displayName:"Branch",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},open:{defaultValue:{value:"false"},description:"",name:"open",required:!1,type:{name:"boolean"}},branchClassName:{defaultValue:null,description:"",name:"branchClassName",required:!1,type:{name:"string"}},branchesClassName:{defaultValue:null,description:"",name:"branchesClassName",required:!1,type:{name:"string"}},branchStyle:{defaultValue:{value:"{}"},description:"",name:"branchStyle",required:!1,type:{name:"CSSProperties"}},branchesStyle:{defaultValue:{value:"{}"},description:"",name:"branchesStyle",required:!1,type:{name:"CSSProperties"}},path:{defaultValue:{value:"[]"},description:"",name:"path",required:!1,type:{name:"string[]"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Branch.tsx#Branch"]={docgenInfo:G.__docgenInfo,name:"Branch",path:"src/components/Tuple/Tree/Branch.tsx#Branch"})}catch{}const X=({text:e,open:t,closeSymbol:n="\u25CB",openSymbol:r="\u25CF",hoverSymbol:o="\u25C9"})=>{const[a,s]=g.exports.useState(e),[l,d]=g.exports.useState(!1),c=g.exports.useRef(),p=t?r:l?o:n,{state:{classes:u,styles:T}}=g.exports.useContext(x),A=`
        ${(f==null?void 0:f.rootlet)||""}
        ${(u==null?void 0:u.rootlet)||""}`,D=`
        ${f==null?void 0:f.symbolContainer}
        ${(u==null?void 0:u.symbolContainer)||""}`,v=`
        ${f==null?void 0:f.rootletTextBox}

        ${(u==null?void 0:u.rootletTextBox)||""}`,h=(u==null?void 0:u.draggable)||"",V=()=>d(!0),b=()=>d(!1),w=()=>pe(a),m=q=>q.stopPropagation(),I=q=>{const{value:U}=q.target;dt(a,U)&&s(U)},y=q=>{Te(q,a,h,T.draggable)},P=()=>{K(),pe(a)};return i("div",{draggable:!0,className:A,style:T.rootlet,onDoubleClick:w,onDragStart:y,onDragEnd:P,onMouseEnter:V,onMouseLeave:b,children:R(Oe,{children:[i("div",{className:D,style:T.symbolContainer,children:p}),i("input",{type:"text",ref:c,id:a,name:a,value:a,className:v,style:T.rootletTextBox,onDoubleClick:m,onChange:I})]})})};try{X.displayName="Rootlet",X.__docgenInfo={description:"",displayName:"Rootlet",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},openSymbol:{defaultValue:{value:"\u25CF"},description:"",name:"openSymbol",required:!1,type:{name:"ReactNode"}},closeSymbol:{defaultValue:{value:"\u25CB"},description:"",name:"closeSymbol",required:!1,type:{name:"ReactNode"}},hoverSymbol:{defaultValue:{value:"\u25C9"},description:"",name:"hoverSymbol",required:!1,type:{name:"ReactNode"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Rootlet.tsx#Rootlet"]={docgenInfo:X.__docgenInfo,name:"Rootlet",path:"src/components/Tuple/Tree/Rootlet.tsx#Rootlet"})}catch{}const ee=({rootName:e})=>{const{state:{classes:t,styles:n}}=g.exports.useContext(x),r=`
        ${(f==null?void 0:f.root)||""}
        ${(t==null?void 0:t.root)||""}`,o=`
        ${(f==null?void 0:f.rootlets)||""}
        ${(t==null?void 0:t.rootlets)||""}`;let s=(()=>{const[l,d]=F(B,null);return l?Object.entries(l).map(c=>({text:c[0],open:c[1].open})):[]})();return s=s.filter(l=>l.text!=="root"),i(G,{text:e,branchClassName:r,branchesClassName:o,branchStyle:n.rootlets,branchesStyle:n.rootlets,children:s.map(l=>i(X,{text:l.text,open:l.open}))})};try{ee.displayName="Root",ee.__docgenInfo={description:"",displayName:"Root",props:{rootName:{defaultValue:null,description:"",name:"rootName",required:!0,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Root.tsx#Root"]={docgenInfo:ee.__docgenInfo,name:"Root",path:"src/components/Tuple/Tree/Root.tsx#Root"})}catch{}const St=e=>!!(e!=null&&e.pageId),te=({symbol:e="\u267B",dragOverSymbol:t="\u267B"})=>{const[n,r]=g.exports.useState(!1),[o,a]=F(me,!1);if(!o)return null;const{state:{classes:s,styles:l}}=g.exports.useContext(x),d=`
        ${(f==null?void 0:f.trashcan)||""}
        ${(s==null?void 0:s.trashcan)||""}
        ${n?f.trashcanHover:""}`,c=T=>{T.preventDefault(),r(!0)},p=()=>r(!1),u=()=>{a(!1),r(!1)};return i("div",{className:d,style:l.trashcan,onDragEnter:()=>{},onDragOver:c,onDragLeave:p,onDrop:u,children:n?t:e})};try{te.displayName="Trashcan",te.__docgenInfo={description:"",displayName:"Trashcan",props:{symbol:{defaultValue:{value:"\u267B"},description:"",name:"symbol",required:!1,type:{name:"string"}},dragOverSymbol:{defaultValue:{value:"\u267B"},description:"",name:"dragOverSymbol",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Trashcan.tsx#Trashcan"]={docgenInfo:te.__docgenInfo,name:"Trashcan",path:"src/components/Tuple/Tree/Trashcan.tsx#Trashcan"})}catch{}const We=({node:e,path:t})=>{const{state:{pages:n,classes:r,styles:o}}=g.exports.useContext(x);if(St(e)){const d=e,c=n[d.pageId];if(!c)throw`Page ID not found within "pages": [${d.pageId}]`;return i(Q,{text:c.name,pageId:d.pageId,path:t})}const a=e,s=`${(f==null?void 0:f.branch)||""} ${(r==null?void 0:r.branch)||""}`,l=`${(f==null?void 0:f.branches)||""} ${(r==null?void 0:r.branches)||""}`;return console.log("branch",a),i(G,{text:a.label,branchClassName:s,branchesClassName:l,branchStyle:o.branch,branchesStyle:o.branches,children:a.branches.map(d=>i(We,{node:d,path:t.concat(`/${a.label}`)},d.id))})},ne=({enableTrashcan:e})=>{const t=g.exports.useRef(),n=g.exports.useRef(),{state:{tree:r,classes:o,styles:a}}=g.exports.useContext(x),[s,l]=g.exports.useState(0);g.exports.useEffect(()=>{const u=t.current.clientHeight,T=n.current.clientHeight;l(u-T)},[t,n,l]);const d=`${(f==null?void 0:f.tree)||""} ${(o==null?void 0:o.tree)||""}`,c=`${f.contentContainer} ${o.scrollPane}`,p={...a==null?void 0:a.scrollPane,height:s};return R("div",{ref:t,className:d,style:a.tree,children:[i("div",{ref:n,children:i(ee,{rootName:"Tuple"})}),i(Ne,{className:c,style:p,children:i(Oe,{children:r.map(u=>i(We,{node:u,path:[]},u.id))})}),e&&i(te,{symbol:"",dragOverSymbol:""})]})};try{ne.displayName="Tree",ne.__docgenInfo={description:"",displayName:"Tree",props:{enableTrashcan:{defaultValue:null,description:"",name:"enableTrashcan",required:!0,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Tree/Tree.tsx#Tree"]={docgenInfo:ne.__docgenInfo,name:"Tree",path:"src/components/Tuple/Tree/Tree.tsx#Tree"})}catch{}const Ct="_tabBar_1tkp8_6",xt="_tab_1tkp8_6",Vt="_tabLabel_1tkp8_35",Pt="_tabCloseContainer_1tkp8_41",Et="_tabClose_1tkp8_41",At="_tabActive_1tkp8_66";var C={tabBar:Ct,tab:xt,tabLabel:Vt,tabCloseContainer:Pt,tabClose:Et,tabActive:At};const re=({portId:e,index:t,pageId:n})=>{const{dispatch:r,state:{pages:o,classes:a,styles:s,viewport:l,viewportId:d}}=g.exports.useContext(x);g.exports.useEffect(()=>{K()},[K]);const c=g.exports.useRef(),[p,u]=g.exports.useState(!1),[T,A]=F(me,!1),D=o[n].name,v=l.ports[e],h=n===v.activePageId,V=`
        ${(C==null?void 0:C.tab)||""}
        ${(a==null?void 0:a.tab)||""}`,b=`
        ${V}
        ${(C==null?void 0:C.tabActive)||""}
        ${(a==null?void 0:a.tabActive)||""}`,w=h?b:V,m=`
        ${(C==null?void 0:C.tabLabel)||""}
        ${(a==null?void 0:a.tabLabel)||""}`,I=`
        ${(C==null?void 0:C.tabClose)||""}
        ${(a==null?void 0:a.tabClose)||""}`,y=(a==null?void 0:a.draggable)||"",P=h?{...s.tab,...s.tabActive}:s.tab;g.exports.useEffect(()=>{var L;const _=document.querySelector(":root"),W=(L=c.current)==null?void 0:L.clientHeight;_.style.setProperty("--TAB-HEIGHT",`${W.toString()}px`)},[c]);const q=()=>u(!0),U=()=>u(!1),xe=()=>ut(r,e,n),Ze=_=>{u(!1),Te(_,D,y,s.draggable),A(!0),_.dataTransfer&&_.dataTransfer.setData("pageId",n.toString()),_.dataTransfer&&_.dataTransfer.setData("portId",e.toString()),_.dataTransfer&&_.dataTransfer.setData("viewportId",d.toString())},Ue=_=>{if(_.preventDefault(),_.stopPropagation(),c.current&&(c.current.style.opacity="1"),!ue(_))return;const W=_.dataTransfer&&_.dataTransfer.getData("pageId"),L=_.dataTransfer&&_.dataTransfer.getData("portId");(_.dataTransfer&&_.dataTransfer.getData("viewportId"))!==d&&j(!0),ge(r,e,L,W,t+1)},Ve=_=>{_.preventDefault(),_.stopPropagation(),c.current&&(c.current.style.opacity="0.7")},ze=_=>{_.preventDefault(),_.stopPropagation(),c.current&&(c.current.style.opacity="1")},Je=async _=>{A(!1),K(),Pe();const{clientX:W,clientY:L}=_;if(He(W,L)&&!await Ye()){const Ee=je(n);pe(Ee)}},Qe=_=>{_.stopPropagation(),Pe()},Pe=()=>ct(r,e,t);return R("div",{ref:c,draggable:!0,style:P,className:w,onDragStart:Ze,onDragEnd:Je,onDragEnter:Ve,onDragOver:Ve,onDragLeave:ze,onDrop:Ue,onMouseOver:q,onMouseLeave:U,onClick:xe,children:[i("div",{style:s.tabLabel,className:m,children:D}),i("div",{className:C.tabCloseContainer,children:p&&i("div",{style:s.tabClose,className:I,onClick:Qe,children:"\u2716"})})]})};try{re.displayName="Tab",re.__docgenInfo={description:"",displayName:"Tab",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},pageId:{defaultValue:null,description:"",name:"pageId",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/TabBar/Tab.tsx#Tab"]={docgenInfo:re.__docgenInfo,name:"Tab",path:"src/components/Tuple/Viewport/View/TabBar/Tab.tsx#Tab"})}catch{}const ae=({portId:e,pageIds:t})=>{const{dispatch:n,state:{classes:r,styles:o,viewportId:a}}=g.exports.useContext(x),s=`
        ${qe.noScrollbar}
        ${(C==null?void 0:C.tabBar)||""}
        ${(r==null?void 0:r.tabBar)||""}`,l=c=>{c.preventDefault(),c.stopPropagation()},d=c=>{if(c.preventDefault(),c.stopPropagation(),!ue(c))return;const p=c.dataTransfer&&c.dataTransfer.getData("pageId"),u=c.dataTransfer&&c.dataTransfer.getData("portId");(c.dataTransfer&&c.dataTransfer.getData("viewportId"))!==a&&j(!0),ge(n,e,u,p,t.length)};return i("div",{className:s,style:o==null?void 0:o.tabBar,onDragOver:l,onDrop:d,children:t.map((c,p)=>i(re,{portId:e,index:p,pageId:c},c))})};try{ae.displayName="TabBar",ae.__docgenInfo={description:"",displayName:"TabBar",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},pageIds:{defaultValue:null,description:"",name:"pageIds",required:!0,type:{name:"ID[]"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/TabBar/TabBar.tsx#TabBar"]={docgenInfo:ae.__docgenInfo,name:"TabBar",path:"src/components/Tuple/Viewport/View/TabBar/TabBar.tsx#TabBar"})}catch{}const Dt="_view_ik9is_1",Ot="_contentContainer_ik9is_8";var J={view:Dt,contentContainer:Ot};const oe=({portId:e,pageIds:t,activePageId:n})=>{if(t&&t.length<=0)return null;const{dispatch:r,state:{pages:o,styles:a,classes:s,viewportId:l}}=g.exports.useContext(x),d=o[n],[c,p]=F(me,!1),u=`
        ${(J==null?void 0:J.view)||""}
        ${(s==null?void 0:s.view)||""}`,T=`
        ${J.contentContainer}
        ${s.scrollPane}`,A=(v,h)=>{const V=v.dataTransfer&&v.dataTransfer.getData("pageId"),b=v.dataTransfer&&v.dataTransfer.getData("portId"),w=v.dataTransfer&&v.dataTransfer.getData("viewportId");p(!1),w!==l&&j(!0),lt(r,e,b,V,h)},D=v=>{const h=v.dataTransfer&&v.dataTransfer.getData("pageId"),V=v.dataTransfer&&v.dataTransfer.getData("portId"),b=v.dataTransfer&&v.dataTransfer.getData("viewportId");p(!1),b!==l&&j(!0),ge(r,e,V,h)};return R("div",{className:u,style:a==null?void 0:a.view,children:[i(ae,{portId:e,pageIds:t}),i(Xe,{dropZoneRootStyle:a.pane,centerDropZoneStyle:a.dropZoneCenter,sidesDropZoneStyle:a.dropZoneSide,dropZoneRootClassName:s.pane,centerDropZoneClassName:s.dropZoneCenter,sidesDropZoneClassName:s.dropZoneSide,dropCenterCb:D,dropSidesCb:A,validateDraggable:ue,children:i(Ne,{className:T,style:(a==null?void 0:a.scrollPane)||null,children:i(d.component,{...d.props})})})]})};try{oe.displayName="View",oe.__docgenInfo={description:"",displayName:"View",props:{portId:{defaultValue:null,description:"",name:"portId",required:!0,type:{name:"ID"}},pageIds:{defaultValue:null,description:"",name:"pageIds",required:!0,type:{name:"ID[]"}},activePageId:{defaultValue:null,description:"",name:"activePageId",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/View.tsx#View"]={docgenInfo:oe.__docgenInfo,name:"View",path:"src/components/Tuple/Viewport/View/View.tsx#View"})}catch{}const k=({id:e})=>{const{dispatch:t,state:{viewport:n}}=g.exports.useContext(x),r=(n==null?void 0:n.ports)&&(n==null?void 0:n.ports[e]);if(g.exports.useEffect(()=>{r&&r.pageIds&&r.pageIds.length<=0&&pt(t,e)},[r]),r&&!r.headId)return i(oe,{portId:e,pageIds:r.pageIds,activePageId:r.activePageId});if(r&&(r==null?void 0:r.headId)){const o=i(k,{id:r.headId}),a=i(k,{id:r.tailId});return R(Re,{dir:r.direction,resizerPos:"50%",children:[r.headId&&o,r.tailId&&a]})}throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT')};try{k.displayName="Port",k.__docgenInfo={description:"",displayName:"Port",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"ID"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/Port.tsx#Port"]={docgenInfo:k.__docgenInfo,name:"Port",path:"src/components/Tuple/Viewport/Port.tsx#Port"})}catch{}const ie=({})=>{const{dispatch:e,state:{styles:t,classes:n,viewportId:r}}=g.exports.useContext(x),o=a=>{const s=a.dataTransfer&&a.dataTransfer.getData("pageId");(a.dataTransfer&&a.dataTransfer.getData("viewportId"))!==r&&j(!0),we(e,s)};return i(et,{style:t.dropZoneCenter,className:n.dropZoneCenter,onDropCB:o,validateDraggable:ue,children:i("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:"Welcome to Tuple!"})})};try{ie.displayName="DefaultView",ie.__docgenInfo={description:"",displayName:"DefaultView",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/Viewport/View/DefaultView.tsx#DefaultView"]={docgenInfo:ie.__docgenInfo,name:"DefaultView",path:"src/components/Tuple/Viewport/View/DefaultView.tsx#DefaultView"})}catch{}const qt="_viewport_3ceyg_1";var Ie={viewport:qt};const De=()=>{const{state:{viewport:e,styles:t,classes:n}}=g.exports.useContext(x),r=`
        ${(Ie==null?void 0:Ie.viewport)||""}
        ${(n==null?void 0:n.viewport)||""}`;return e.root?i("div",{className:r,style:t.viewport,children:i(k,{id:e.root})}):i(ie,{})},Nt="_tuple_v556q_1";var be={tuple:Nt};const se=({enableTrashcan:e})=>{const{state:{styles:t,classes:n}}=g.exports.useContext(x),r=ye()==="",o=`
        ${(be==null?void 0:be.tuple)||""}
        ${(n==null?void 0:n.tuple)||""}`;return r?i("div",{className:o,style:t.tuple,children:R(Re,{resizerPos:"25%",children:[i(ne,{enableTrashcan:e}),i(De,{})]})}):i(De,{})};try{se.displayName="TupleInner",se.__docgenInfo={description:"",displayName:"TupleInner",props:{enableTrashcan:{defaultValue:null,description:"",name:"enableTrashcan",required:!0,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/TupleInner.tsx#TupleInner"]={docgenInfo:se.__docgenInfo,name:"TupleInner",path:"src/components/Tuple/TupleInner.tsx#TupleInner"})}catch{}const Z=(e,t,n)=>{console.log(`----- ${e} -----`),console.log("state",t),console.log("payload",n)},N=(e,t)=>({...e[t]}||null),Rt=(e,t)=>{const n=e.ports[t];if(!n||n.parentId==null)return null;const o=e.ports[n.parentId];if(!o)return null;const a=n.isHead?o.tailId:o.headId,s=N(e.ports,a);return{id:a,port:s}},Bt=(e,t)=>{if(Z("Add Tab",e,t),t.portId===t.dragPortId){const s={...e.viewport.ports,[t.portId]:{...e.viewport.ports[t.portId],activePageId:t.pageId}};return{...e,viewport:{...e.viewport,skipTabRemoval:!0,ports:s}}}const n=N(e.viewport.ports,t.portId),r=n.pageIds;if(!r)throw Error("Page ids is null. Was this action called on a Splitview port?");if(r.includes(t.pageId)){const s={...e.viewport.ports,[t.portId]:{...n,activePageId:t.pageId}};return{...e,viewport:{...e.viewport,ports:s}}}const o=[...r==null?void 0:r.slice(0,t.index),t.pageId,...r==null?void 0:r.slice(t.index)],a={...e.viewport.ports,[`${t.portId}`]:{...n,activePageId:t.pageId,pageIds:o}};return{...e,viewport:{...e.viewport,ports:a}}},Lt=(e,t)=>{if(Z("Remove Tab",e,t),e.viewport.skipTabRemoval)return{...e,viewport:{...e.viewport,skipTabRemoval:!1}};const n=N(e.viewport.ports,t.portId),r=n.pageIds;if(!r)throw Error("Page ids is null. Was this action called on a Splitview port?");const o=r.filter((l,d)=>d!==t.index),a=r[t.index]!=n.activePageId?n.activePageId:r[t.index+1]||r[t.index-1],s={...e.viewport.ports,[`${t.portId}`]:{...n,pageIds:o,activePageId:a}};return{...e,viewport:{...e.viewport,ports:s}}},Ht=(e,t)=>{if(Object.keys(e.viewport.ports).length!==0)throw Error("_add_new_view() should only be called on an empty viewport. Otherwise call _add_view()");const n=M(),r={[`${n}`]:{parentId:null,isSplitView:!1,pageIds:[t.pageId],activePageId:t.pageId,direction:null,headId:null,tailId:null,isHead:null}};return{...e,viewport:{root:n,ports:r}}},$t=(e,t)=>{var c;Z("Add View",e,t);const n=M(),r=M(),o=N(e.viewport.ports,t.portId),a=!o.parentId;t.dragPortId===t.portId&&(o.pageIds=(c=o.pageIds)==null?void 0:c.filter(p=>p!==t.pageId));const s={parentId:n,isSplitView:!1,pageIds:[t.pageId],activePageId:t.pageId,direction:null,headId:null,tailId:null,isHead:t.side===O.HEAD},l={parentId:o.parentId,isSplitView:!0,pageIds:null,activePageId:null,direction:t.direction,headId:t.side===O.HEAD?r:t.portId,tailId:t.side===O.TAIL?r:t.portId,isHead:o.isHead},d={...e.viewport.ports,[`${n}`]:l,[`${r}`]:s};if(!a){const p=N(e.viewport.ports,o.parentId);o.isHead&&(p.headId=n),o.isHead!==null&&!o.isHead&&(p.tailId=n),d[o.parentId]=p}return o.parentId=n,o.isHead=t.side===O.TAIL,o.activePageId=o.activePageId===t.pageId?o.pageIds&&o.pageIds[0]:o.activePageId,d[t.portId]=o,{...e,viewport:{root:a?n:e.viewport.root,ports:d}}},kt=(e,t)=>{if(Z("Remove View",e,t),!Object.keys(e.viewport.ports).includes(t.portId.toString()))return e;let r=e.viewport.root,o=N(e.viewport.ports,t.portId);if(!o.parentId)return{...e,viewport:Se};const s=N(e.viewport.ports,o.parentId),l=!s.parentId,d=Rt(e.viewport,t.portId),c={...e.viewport.ports};if(l)d&&(r=d.id,d.port.parentId=null,d.port.isHead=null,c[d.id]=d.port);else{const p=s.parentId,u=N(e.viewport.ports,p);s.isHead?u.headId=d==null?void 0:d.id:u.tailId=d==null?void 0:d.id,d&&(d.port.parentId=p,d.port.isHead=s.isHead,c[d.id]=d.port),c[p]=u}return delete c[t.portId],delete c[o.parentId],{...e,viewport:{root:r,ports:c}}},Mt=(e,t)=>{Z("Change Active View",e,t);const n=N(e.viewport.ports,t.portId),r={...e.viewport.ports,[`${t.portId}`]:{...n,activePageId:t.pageId}};return{...e,viewport:{...e.viewport,ports:r}}},Se={root:"",ports:{},skipTabRemoval:!1},H=e=>{const t=ye()||$,{ports:n,root:r}=e==null?void 0:e.viewport;return le(t,n,r,!0),e},jt=(e,t)=>{switch(t.type){case E.ADD_TAB:return H(Bt(e,t.payload));case E.REMOVE_TAB:return H(Lt(e,t.payload));case E.ADD_NEW_VIEW:return H(Ht(e,t.payload));case E.ADD_VIEW:return H($t(e,t.payload));case E.REMOVE_VIEW:return H(kt(e,t.payload));case E.CHANGE_ACTIVE_VIEW:return H(Mt(e,t.payload));default:return e}},Ke=e=>e.pageIds!==void 0,Ge=e=>e.head!==void 0,$="root",x=g.exports.createContext({state:{pages:{},viewport:Se,viewportId:"",tree:{},styles:{},classes:{},events:{}}}),Yt=({pages:e,tree:t,views:n})=>{if(!nt(e))throw Error('"pages" props should be of the form, PagesT.');if(!Array.isArray(t))throw Error('"tree" prop must be an array.');if(n&&!(Ke(n)||Ge(n)))throw Error('"views" props should be of type - ViewT or SplitViewT.')},de=({pages:e,views:t,tree:n,styles:r,classes:o,events:a,enableTrashcan:s=!1})=>{Yt({pages:e,views:t,tree:n});const l=ye();window.addEventListener("beforeunload",()=>{he(l||"root",!1)},!1);const d=(b,w,m=null,I=null)=>{const y=M();if(Ke(b)){const P=b;w[y]={parentId:m,isSplitView:!1,pageIds:P.pageIds,activePageId:P.activePageId,direction:null,headId:null,tailId:null,isHead:I}}else if(Ge(b)){const P=b;w[y]={parentId:m,isSplitView:!0,pageIds:null,activePageId:null,direction:P.direction,headId:d(P.head,w,y,!0),tailId:d(P.tail,w,y,!1),isHead:I}}else throw new Error("All viewport values must be of type ViewT or SplitViewT");return y},c=b=>{const w={},m=g.exports.useMemo(()=>d(b,w),[]);return{ports:w,rootId:m}},p=()=>{const b={ports:{},rootId:""};if(l){const m=Me(l);if((m==null?void 0:m.ports)&&(m==null?void 0:m.rootId)){he(l);const{ports:I,rootId:y}=m;return{ports:I,rootId:y}}return b}const w=Y();if(w&&w[$]){he($);const{ports:m,rootId:I}=w[$];return{ports:m,rootId:I}}if(t){const{ports:m,rootId:I}=c(t);return le($,m,I,!0),{ports:m,rootId:I}}return le($,{},null,!0),b},{ports:u,rootId:T}=p(),A={...Se,root:T,ports:u},D={pages:e,viewport:A,viewportId:l,tree:n,styles:r||{},classes:o||{},events:a||{}},[v,h]=g.exports.useReducer(jt,D),V=g.exports.useMemo(()=>({state:v,dispatch:h}),[v,h]);return i(x.Provider,{value:V,children:i(se,{enableTrashcan:s})})};var Fe=de;try{de.displayName="Tuple",de.__docgenInfo={description:"",displayName:"Tuple",props:{pages:{defaultValue:null,description:"",name:"pages",required:!0,type:{name:"PagesT"}},tree:{defaultValue:null,description:"",name:"tree",required:!0,type:{name:"TreeT"}},views:{defaultValue:null,description:"",name:"views",required:!1,type:{name:"ViewportT"}},styles:{defaultValue:null,description:"",name:"styles",required:!1,type:{name:"TupleStylesT"}},classes:{defaultValue:null,description:"",name:"classes",required:!1,type:{name:"TupleClassesT"}},events:{defaultValue:null,description:"",name:"events",required:!1,type:{name:"EventsT"}},enableTrashcan:{defaultValue:{value:"false"},description:"",name:"enableTrashcan",required:!1,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/index.tsx#Tuple"]={docgenInfo:de.__docgenInfo,name:"Tuple",path:"src/components/Tuple/index.tsx#Tuple"})}catch{}const ce=e=>i("div",{...e,children:e.children});var S=g.exports.memo(ce);try{ce.displayName="Page",ce.__docgenInfo={description:"",displayName:"Page",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Page/index.tsx#Page"]={docgenInfo:ce.__docgenInfo,name:"Page",path:"src/components/Page/index.tsx#Page"})}catch{}const Wt="_view_1v79r_1",Kt="_tabBar_1v79r_7",Gt="_tab_1v79r_7",Ft="_tabActive_1v79r_16",Zt="_tabClose_1v79r_20",Ut="_tree_1v79r_24",zt="_branch_1v79r_29",Jt="_branches_1v79r_40";var Qt={view:Wt,tabBar:Kt,tab:Gt,tabActive:Ft,tabClose:Zt,tree:Ut,branch:zt,branches:Jt};const Xt="_tuple_yvf0f_13",en="_viewport_yvf0f_13",tn="_draggable_yvf0f_17",nn="_tree_yvf0f_27",rn="_branch_yvf0f_33",an="_branches_yvf0f_46",on="_leaf_yvf0f_51",sn="_rootlets_yvf0f_62",dn="_rootletTextBox_yvf0f_69",cn="_view_yvf0f_13",ln="_tabBar_yvf0f_91",pn="_tabClose_yvf0f_96",un="_tab_yvf0f_91",mn="_tabActive_yvf0f_108";var gn={tuple:Xt,viewport:en,draggable:tn,tree:nn,branch:rn,branches:an,leaf:on,rootlets:sn,rootletTextBox:dn,view:cn,tabBar:ln,tabClose:pn,tab:un,tabActive:mn};const fn="_tuple_iqwhm_16",_n="_viewport_iqwhm_16",vn="_draggable_iqwhm_21",hn="_tree_iqwhm_31",In="_scrollpane_iqwhm_43",bn="_branch_iqwhm_48",wn="_branches_iqwhm_60",Tn="_leaf_iqwhm_65",yn="_root_iqwhm_77",Sn="_rootlets_iqwhm_87",Cn="_rootletTextBox_iqwhm_95",xn="_view_iqwhm_16",Vn="_page_iqwhm_119",Pn="_tabBar_iqwhm_126",En="_tabClose_iqwhm_133",An="_tab_iqwhm_126",Dn="_tabActive_iqwhm_155";var On={tuple:fn,viewport:_n,draggable:vn,tree:hn,scrollpane:In,branch:bn,branches:wn,leaf:Tn,root:yn,rootlets:Sn,rootletTextBox:Cn,view:xn,page:Vn,tabBar:Pn,tabClose:En,tab:An,tabActive:Dn},Ir={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

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
                    ]}
                ]}
            ]}
        ]}
    ]},
    { id: 33, pageId: 'monkey' },
    { id: 34, pageId: 'pox' },
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
`,locationsMap:{"no-views":{startLoc:{col:36,line:118},endLoc:{col:1,line:128},startBody:{col:36,line:118},endBody:{col:1,line:128}},"six-views-no-styles":{startLoc:{col:36,line:118},endLoc:{col:1,line:128},startBody:{col:36,line:118},endBody:{col:1,line:128}},lannister:{startLoc:{col:36,line:118},endLoc:{col:1,line:128},startBody:{col:36,line:118},endBody:{col:1,line:128}},baratheon:{startLoc:{col:36,line:118},endLoc:{col:1,line:128},startBody:{col:36,line:118},endBody:{col:1,line:128}}}}},title:"Components/Tuple",component:Fe,argTypes:{handleClick:{action:"handleClick"}}};const qn=i("div",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus viverra accumsan in nisl nisi. Egestas dui id ornare arcu odio ut sem nulla pharetra. Duis tristique sollicitudin nibh sit amet. Adipiscing at in tellus integer feugiat. Ultrices eros in cursus turpis massa tincidunt dui ut. Massa tincidunt dui ut ornare. Enim neque volutpat ac tincidunt vitae semper quis. Rhoncus dolor purus non enim. Aenean et tortor at risus viverra adipiscing at in. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Felis bibendum ut tristique et egestas. At volutpat diam ut venenatis tellus. Scelerisque varius morbi enim nunc faucibus a pellentesque. Tristique senectus et netus et malesuada fames. Et netus et malesuada fames ac turpis egestas integer eget. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac turpis egestas sed tempus urna et pharetra. Bibendum enim facilisis gravida neque convallis a cras. Tempus egestas sed sed risus pretium. Diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc sed. Eget arcu dictum varius duis at consectetur lorem. Morbi tristique senectus et netus et malesuada. Gravida cum sociis natoque penatibus. In hac habitasse platea dictumst quisque sagittis purus sit amet. Cursus sit amet dictum sit amet justo donec enim. Blandit libero volutpat sed cras ornare arcu dui vivamus. Adipiscing bibendum est ultricies integer quis auctor elit sed. Est placerat in egestas erat imperdiet sed euismod nisi. Tincidunt praesent semper feugiat nibh sed pulvinar. Nunc sed id semper risus in hendrerit gravida. Non arcu risus quis varius quam quisque id diam. Morbi tincidunt ornare massa eget egestas purus. Eget nunc scelerisque viverra mauris in aliquam sem. At consectetur lorem donec massa sapien. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Sit amet tellus cras adipiscing enim eu turpis egestas. Pellentesque habitant morbi tristique senectus. Ac turpis egestas sed tempus urna et pharetra. Augue neque gravida in fermentum et sollicitudin ac. Integer enim neque volutpat ac tincidunt vitae semper quis. Nisl purus in mollis nunc sed. Sit amet venenatis urna cursus. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Nunc mattis enim ut tellus elementum sagittis vitae et. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Faucibus scelerisque eleifend donec pretium. At auctor urna nunc id cursus metus aliquam eleifend. Id aliquet risus feugiat in ante metus dictum at. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Semper feugiat nibh sed pulvinar proin gravida. Mauris sit amet massa vitae tortor. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Posuere ac ut consequat semper viverra. Nullam vehicula ipsum a arcu cursus vitae congue. Curabitur gravida arcu ac tortor dignissim convallis. Amet dictum sit amet justo. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Elementum eu facilisis sed odio morbi quis. Lacus laoreet non curabitur gravida arcu ac tortor. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Maecenas pharetra convallis posuere morbi. Vitae nunc sed velit dignissim sodales ut eu sem. Sit amet purus gravida quis blandit turpis. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Diam sollicitudin tempor id eu nisl nunc mi. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Suspendisse ultrices gravida dictum fusce ut placerat orci. Praesent elementum facilisis leo vel fringilla."}),Nn=i("div",{children:"world"}),Rn=i("div",{children:"ford"}),Bn=i("div",{children:"jeep"}),Ln=i("div",{children:"chrysler"}),Hn=i("div",{children:"ferrari"}),$n=i("div",{children:"gm"}),kn=i("div",{children:"honda"}),Mn=i("div",{children:"carpe"}),jn=i("div",{children:"diem"}),Yn=i("div",{children:"monkey"}),Wn=i("div",{children:"pox"}),Kn=i("div",{children:"apple"}),Gn=i("div",{children:"banana"}),Fn=i("div",{children:"carrot"}),Zn=i("div",{children:"brocoli"}),Un=i("div",{children:"tomato"}),zn=i("div",{children:"orange"}),fe={lorem:{id:10,name:"lorem",component:()=>i(S,{children:qn})},world:{id:11,name:"world",component:()=>i(S,{children:Nn})},ford:{id:12,name:"ford",component:()=>i(S,{children:Rn})},jeep:{id:13,name:"jeep",component:()=>i(S,{children:Bn})},chrysler:{id:14,name:"chrysler",component:()=>i(S,{children:Ln})},ferrari:{id:15,name:"ferrari",component:()=>i(S,{children:Hn})},gm:{id:16,name:"gm",component:()=>i(S,{children:$n})},honda:{id:17,name:"honda",component:()=>i(S,{children:kn})},carpe:{id:18,name:"carpe",component:()=>i(S,{children:Mn})},diem:{id:19,name:"diem",component:()=>i(S,{children:jn})},monkey:{id:20,name:"monkey",component:()=>i(S,{children:Yn})},pox:{id:21,name:"pox",component:()=>i(S,{children:Wn})},apple:{id:22,name:"apple",component:()=>i(S,{children:Kn})},banana:{id:23,name:"banana",component:()=>i(S,{children:Gn})},carrot:{id:24,name:"carrot",component:()=>i(S,{children:Fn})},brocoli:{id:25,name:"brocoli",component:()=>i(S,{children:Zn})},tomato:{id:26,name:"tomato",component:()=>i(S,{children:Un})},orange:{id:27,name:"orange",component:()=>i(S,{children:zn})}},_e=[{id:10,pageId:"lorem"},{id:11,pageId:"world"},{id:1,label:"yolo",branches:[{id:12,pageId:"carpe"},{id:13,pageId:"diem"},{id:2,label:"hello again",branches:[{id:14,pageId:"world"},{id:3,label:"cars",branches:[{id:15,pageId:"ford"},{id:16,pageId:"jeep"},{id:17,pageId:"chrysler"},{id:18,pageId:"ferrari"},{id:19,pageId:"gm"},{id:20,pageId:"honda"},{id:4,label:"cars",branches:[{id:21,pageId:"ford"},{id:22,pageId:"jeep"},{id:23,pageId:"chrysler"},{id:24,pageId:"ferrari"},{id:25,pageId:"gm"},{id:26,pageId:"honda"},{id:5,label:"cars",branches:[{id:27,pageId:"ford"},{id:28,pageId:"jeep"},{id:29,pageId:"chrysler"},{id:30,pageId:"ferrari"},{id:31,pageId:"gm"},{id:32,pageId:"honda"}]}]}]}]}]},{id:33,pageId:"monkey"},{id:34,pageId:"pox"}],ve=e=>i("div",{style:{height:900,width:1500,border:"1px solid lightgrey"},children:i(Fe,{...e})}),Jn={pageIds:["hello","world"],activePageId:"hello"},Qn={pageIds:["ford","jeep","chrysler","ferrari","gm","honda"],activePageId:"jeep"},Xn={pageIds:["carpe"],activePageId:"carpe"},er={pageIds:["diem"],activePageId:"diem"},tr={pageIds:["apple"],activePageId:"apple"},nr={pageIds:["banana"],activePageId:"banana"},rr=ve.bind({});rr.args={pages:fe,tree:_e,classes:Qt};const ar={head:Qn,tail:Xn,direction:"vertical"},or={head:Jn,tail:ar,direction:"horizontal"},ir={head:tr,tail:nr,direction:"horizontal"},sr={head:ir,tail:er,direction:"horizontal"},Ce={head:or,tail:sr,direction:"vertical"},dr=ve.bind({});dr.args={pages:fe,views:Ce,tree:_e};const cr=ve.bind({});cr.args={pages:fe,views:Ce,tree:_e,classes:gn};const lr=ve.bind({});lr.args={pages:fe,views:Ce,tree:_e,classes:On};const br=["NoViews","SixViewsNoStyles","Lannister","Baratheon"];export{lr as Baratheon,cr as Lannister,rr as NoViews,dr as SixViewsNoStyles,br as __namedExportsOrder,Ir as default};
//# sourceMappingURL=Tuple.stories.b8da5aa0.js.map
