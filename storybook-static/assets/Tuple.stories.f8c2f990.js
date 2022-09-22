import{r as i}from"./index.b461da8a.js";import{T as w}from"./index.68dc5317.js";import{V as _}from"./index.f2a4b9f1.js";import{S as T}from"./index.5a93f4df.js";import{T as g,a as v}from"./TupleProvider.c3e92b8b.js";import{j as e,a as u,F as b}from"./jsx-runtime.3c5536b9.js";import"./Leaf.fa9a5bb7.js";import"./tree.module.55a5e3fc.js";import"./Branch.914df8e0.js";import"./View.c46a1785.js";import"./index.2e891989.js";const y="_tuple_gy0py_1";var a={tuple:y};const t=({tree:n})=>{const{views:l,styles:s,classes:r}=i.exports.useContext(g);i.exports.useState(l);const m=`${a==null?void 0:a.tuple} ${r==null?void 0:r.tuple}`,h=e(b,{children:"No Views. SAD!"});return e("div",{className:m,style:s.tuple,children:u(T,{resizerPos:"25%",children:[e(w,{tree:n}),e(_,{views:l,defaultView:h})]})})};var d=t;try{t.displayName="Tuple",t.__docgenInfo={description:"",displayName:"Tuple",props:{tree:{defaultValue:null,description:"",name:"tree",required:!0,type:{name:"TreeT"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Tuple/index.tsx#Tuple"]={docgenInfo:t.__docgenInfo,name:"Tuple",path:"src/components/Tuple/index.tsx#Tuple"})}catch{}const f="_view_khdcz_1",x="_tabBar_khdcz_7",k="_tab_khdcz_7",I="_tabClose_khdcz_16",L="_tree_khdcz_20",R="_branch_khdcz_24",P="_branches_khdcz_35";var S={view:f,tabBar:x,tab:k,tabClose:I,tree:L,branch:R,branches:P},te={parameters:{storySource:{source:`import Tuple from '.';
import TupleProvider from './TupleProvider';
import { TreeT, PagesT, SplitViewT, ViewT } from '../../types';

import classes from './tuple.stories.module.css';


export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
}

//--------
// PAGES
//--------

const hello = <div>hello</div>;
const world = <div>world</div>;
const carpe = <div>carpe</div>;
const diem = <div>diem</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;

const pages: PagesT = {
    'hello001': { name: 'hello', component: () => hello },
    'hello002': { name: 'HELLO', component: () => hello },
    'world001': { name: 'world', component: () => world },
    'world002': { name: 'worlD', component: () => world },
    'world003': { name: 'worLd', component: () => world },
    'world004': { name: 'worLD', component: () => world },
    'world005': { name: 'woRld', component: () => world },
    'world006': { name: 'woRlD', component: () => world },
    'carpe001': { name: 'carpe', component: () => carpe },
    'diem001': { name: 'diem', component: () => diem },
    'monkey001': { name: 'monkey', component: () => monkey },
    'pox001': { name: 'pox', component: () => pox },
};

//--------
// TREE
//--------

const tree: TreeT = [
    'hello001',
    'world001',
    { label: 'foo', branches: [
        'hello001',
        'world001',
        { label: 'bar', branches: [
            'hello002',
            'carpe001',
            'diem001',
            { label: 'noah', branches: [
                'monkey001',
                'pox001',
            ]}
        ]}
    ]},
    'world002',
    'world003',
    'world004',
    'world005',
    'world006',
];
//--------
// Views
//--------

/*
    Views for this structure:
         _________
        |    |____|
        |____|____|
        |    |    |
        |____|____|

*/
const topLeft: ViewT = {
    id: 0,
    path: 'hh',
    pageIds: ['hello001', 'hello002'],
    activePageId: 'hello001',
};

const topRightUpper: ViewT = {
    id: 1,
    path: 'hth',
    pageIds: ['world001', 'world002', 'world003', 'world004', 'world005', 'world006'],
    activePageId: 'world002',
};

const topRightLower: ViewT = {
    id: 2,
    path: 'htt',
    pageIds: ['carpe001'],
    activePageId: 'carpe001',
};

const bottomLeft: ViewT = {
    id: 3,
    path: 'th',
    pageIds: ['diem001'],
    activePageId: 'diem001',
};

const bottomRight: ViewT = {
    id: 4,
    path: 'tt',
    pageIds: ['monkey001', 'pox001'],
    activePageId: 'monkey001',
};

const topRight: SplitViewT = { head: topRightUpper, tail: topRightLower, direction: 'vertical', path: 'ht' };
const top: SplitViewT = { head: topLeft, tail: topRight, direction: 'horizontal', path: 'h'};
const bottom: SplitViewT = { head: bottomLeft, tail: bottomRight, direction: 'horizontal', path: 't' };
const views: SplitViewT = { head: top, tail: bottom, direction: 'vertical', path: '' };


const Template = (args: any) => {
    return (
        <TupleProvider pages={pages} views={views} classes={classes}>
            <Tuple {...args} />
        </TupleProvider>
    );
}

export const Basic = Template.bind({});
Basic.args = {
    pages: pages,
    tree: tree,
};`,locationsMap:{basic:{startLoc:{col:17,line:120},endLoc:{col:1,line:126},startBody:{col:17,line:120},endBody:{col:1,line:126}}}}},title:"Components/Tuple",component:d,argTypes:{handleClick:{action:"handleClick"}}};const p=e("div",{children:"hello"}),o=e("div",{children:"world"}),V=e("div",{children:"carpe"}),C=e("div",{children:"diem"}),z=e("div",{children:"monkey"}),B=e("div",{children:"pox"}),c={hello001:{name:"hello",component:()=>p},hello002:{name:"HELLO",component:()=>p},world001:{name:"world",component:()=>o},world002:{name:"worlD",component:()=>o},world003:{name:"worLd",component:()=>o},world004:{name:"worLD",component:()=>o},world005:{name:"woRld",component:()=>o},world006:{name:"woRlD",component:()=>o},carpe001:{name:"carpe",component:()=>V},diem001:{name:"diem",component:()=>C},monkey001:{name:"monkey",component:()=>z},pox001:{name:"pox",component:()=>B}},E=["hello001","world001",{label:"foo",branches:["hello001","world001",{label:"bar",branches:["hello002","carpe001","diem001",{label:"noah",branches:["monkey001","pox001"]}]}]},"world002","world003","world004","world005","world006"],O={id:0,path:"hh",pageIds:["hello001","hello002"],activePageId:"hello001"},D={id:1,path:"hth",pageIds:["world001","world002","world003","world004","world005","world006"],activePageId:"world002"},A={id:2,path:"htt",pageIds:["carpe001"],activePageId:"carpe001"},N={id:3,path:"th",pageIds:["diem001"],activePageId:"diem001"},$={id:4,path:"tt",pageIds:["monkey001","pox001"],activePageId:"monkey001"},j={head:D,tail:A,direction:"vertical",path:"ht"},U={head:O,tail:j,direction:"horizontal",path:"h"},F={head:N,tail:$,direction:"horizontal",path:"t"},H={head:U,tail:F,direction:"vertical",path:""},K=n=>e(v,{pages:c,views:H,classes:S,children:e(d,{...n})}),Y=K.bind({});Y.args={pages:c,tree:E};const re=["Basic"];export{Y as Basic,re as __namedExportsOrder,te as default};
//# sourceMappingURL=Tuple.stories.f8c2f990.js.map
