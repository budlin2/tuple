import{V as e}from"./View.c46a1785.js";import{T as i}from"./TupleProvider.c3e92b8b.js";import{c as s}from"./view.stories.module.d3d6ac8a.js";import{a as l,j as n}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";import"./index.2e891989.js";var T={parameters:{storySource:{source:`import View from './View';
import { TupleContext } from '../Tuple/TupleProvider';
import { PagesT } from '../../types';

import classes from './view.stories.module.css';


export default {
    title: 'Components/View',
    component: View,
    argTypes: { handleClick: { action: "handleClick" } }
};


const hello = <div>hello</div>;
const world = <div>world</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;


const pages: PagesT = {
    'a': { name: 'hello', component: () => hello },
    'b': { name: 'world', component: () => world },
    'c': { name: 'monkey', component: () => monkey },
    'd': { name: 'pox', component: () => pox },
};


const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {},
        classes,
        events: {}
    };

    return (
        <TupleContext.Provider value={context}>
            <div style={{ height: '500px' }}>
                <View {...args.top} />
            </div>
            <div style={{ height: '500px' }}>
                <View {...args.bottom} />
            </div>
        </TupleContext.Provider>
    );
};

export const Basic = Template.bind({});

Basic.args = {
    top: {
        id: 1,
        pageIds: ['a', 'b', 'c'],
        activePageId: 'b',
    },
    bottom: {
        id: 2,
        pageIds: ['d'],
        activePageId: 'd',
    }
};
`,locationsMap:{basic:{startLoc:{col:17,line:29},endLoc:{col:1,line:48},startBody:{col:17,line:29},endBody:{col:1,line:48}}}}},title:"Components/View",component:e,argTypes:{handleClick:{action:"handleClick"}}};const a=n("div",{children:"hello"}),c=n("div",{children:"world"}),d=n("div",{children:"monkey"}),r=n("div",{children:"pox"}),p={a:{name:"hello",component:()=>a},b:{name:"world",component:()=>c},c:{name:"monkey",component:()=>d},d:{name:"pox",component:()=>r}},m=o=>{const t={pages:p,views:null,styles:{},classes:s,events:{}};return l(i.Provider,{value:t,children:[n("div",{style:{height:"500px"},children:n(e,{...o.top})}),n("div",{style:{height:"500px"},children:n(e,{...o.bottom})})]})},v=m.bind({});v.args={top:{id:1,pageIds:["a","b","c"],activePageId:"b"},bottom:{id:2,pageIds:["d"],activePageId:"d"}};const b=["Basic"];export{v as Basic,b as __namedExportsOrder,T as default};
//# sourceMappingURL=View.stories.874416ea.js.map
