import{V as t}from"./index.f2a4b9f1.js";import{T as p}from"./TupleProvider.c3e92b8b.js";import{c as r}from"./view.stories.module.d3d6ac8a.js";import{j as o,F as i}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";import"./index.5a93f4df.js";import"./View.c46a1785.js";import"./index.2e891989.js";var k={parameters:{storySource:{source:`import Viewport from '.';
import { PagesT, SplitViewT, ViewT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';

import classes from './view.stories.module.css';

export default {
    title: 'Components/Viewport',
    component: Viewport,
    argTypes: { handleClick: { action: "handleClick" } },
}

//--------
// PAGES
//--------
interface pageProps { text: string }
const page = ({text}: pageProps): JSX.Element => {
    return ( 
        <div>{text}</div>
    );
};

const pages: PagesT = {
    'hello001': { name: 'hello', component: page, props: { text: 'hello' } },
    'hello002': { name: 'HELLO', component: page, props: { text: 'HELLO' } },
    'world001': { name: 'world', component: page, props: { text: 'world' } },
    'world002': { name: 'worlD', component: page, props: { text: 'worlD' } },
    'world003': { name: 'worLd', component: page, props: { text: 'worLd' } },
    'world004': { name: 'worLD', component: page, props: { text: 'worLD' } },
    'world005': { name: 'woRld', component: page, props: { text: 'woRld' } },
    'world006': { name: 'worlddddddd', component: page, props: { text: 'worlddddddd' } },
    'world007': { name: 'worlddddddddddddddddd', component: page, props: { text: 'worlddddddddddddddddd' } },
    'carpe001': { name: 'carpe', component: page, props: { text: 'carpe' } },
    'diem001': { name: 'diem', component: page, props: { text: 'diem' } },
    'monkey001': { name: 'monkey', component: page, props: { text: 'monkey' } },
    'pox001': { name: 'pox', component: page, props: { text: 'pox' } },
};

//--------
// Views
//--------

/******************************
    Views for this structure:
         _________
        |    |____|
        |____|____|
        |    |    |
        |____|____|

*******************************/
const topLeft: ViewT = {
    id: 0,
    pageIds: ['hello001', 'hello002'],
    activePageId: 'hello001',
};

const topRightUpper: ViewT = {
    id: 1,
    pageIds: ['world001', 'world002', 'world003', 'world004', 'world005', 'world006', 'world007'],
    activePageId: 'world002',
};

const topRightLower: ViewT = {
    id: 2,
    pageIds: ['carpe001'],
    activePageId: 'carpe001',
};

const bottomLeft: ViewT = {
    id: 3,
    pageIds: ['diem001'],
    activePageId: 'diem001',
};

const bottomRight: ViewT = {
    id: 4,
    pageIds: ['monkey001', 'pox001'],
    activePageId: 'monkey001',
};

const topRight: SplitViewT = { head: topRightUpper, tail: topRightLower, direction: 'vertical' };
const top: SplitViewT = { head: topLeft, tail: topRight, direction: 'horizontal'};
const bottom: SplitViewT = { head: bottomLeft, tail: bottomRight, direction: 'horizontal' };
const views: SplitViewT = { head: top, tail: bottom, direction: 'vertical' };

const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {},
        classes,
        events: {},
    };
    
    return (
        <TupleContext.Provider value={context}>
            <div style={{ height: '700px' }}>
                <Viewport {...args} />
            </div>
        </TupleContext.Provider>
    );
}

export const Basic = Template.bind({});
Basic.args = {
    views: views,
    defaultView: <>No Views. SAD!</>
};
`,locationsMap:{basic:{startLoc:{col:17,line:87},endLoc:{col:1,line:103},startBody:{col:17,line:87},endBody:{col:1,line:103}}}}},title:"Components/Viewport",component:t,argTypes:{handleClick:{action:"handleClick"}}};const e=({text:n})=>o("div",{children:n}),a={hello001:{name:"hello",component:e,props:{text:"hello"}},hello002:{name:"HELLO",component:e,props:{text:"HELLO"}},world001:{name:"world",component:e,props:{text:"world"}},world002:{name:"worlD",component:e,props:{text:"worlD"}},world003:{name:"worLd",component:e,props:{text:"worLd"}},world004:{name:"worLD",component:e,props:{text:"worLD"}},world005:{name:"woRld",component:e,props:{text:"woRld"}},world006:{name:"worlddddddd",component:e,props:{text:"worlddddddd"}},world007:{name:"worlddddddddddddddddd",component:e,props:{text:"worlddddddddddddddddd"}},carpe001:{name:"carpe",component:e,props:{text:"carpe"}},diem001:{name:"diem",component:e,props:{text:"diem"}},monkey001:{name:"monkey",component:e,props:{text:"monkey"}},pox001:{name:"pox",component:e,props:{text:"pox"}}},l={id:0,pageIds:["hello001","hello002"],activePageId:"hello001"},s={id:1,pageIds:["world001","world002","world003","world004","world005","world006","world007"],activePageId:"world002"},c={id:2,pageIds:["carpe001"],activePageId:"carpe001"},m={id:3,pageIds:["diem001"],activePageId:"diem001"},w={id:4,pageIds:["monkey001","pox001"],activePageId:"monkey001"},g={head:s,tail:c,direction:"vertical"},h={head:l,tail:g,direction:"horizontal"},x={head:m,tail:w,direction:"horizontal"},v={head:h,tail:x,direction:"vertical"},_=n=>{const d={pages:a,views:null,styles:{},classes:r,events:{}};return o(p.Provider,{value:d,children:o("div",{style:{height:"700px"},children:o(t,{...n})})})},L=_.bind({});L.args={views:v,defaultView:o(i,{children:"No Views. SAD!"})};const b=["Basic"];export{L as Basic,b as __namedExportsOrder,k as default};
//# sourceMappingURL=Viewport.stories.f218504c.js.map
