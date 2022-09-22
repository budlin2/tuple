import{T as l}from"./index.68dc5317.js";import{T as r}from"./TupleProvider.c3e92b8b.js";import{j as e}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";import"./Leaf.fa9a5bb7.js";import"./tree.module.55a5e3fc.js";import"./Branch.914df8e0.js";var u={parameters:{storySource:{source:`import Tree from '.';
import { PagesT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';

export default {
    title: 'Components/Tree',
    component: Tree,
    argTypes: { handleClick: { action: "handleClick" } },
}


const hello = <div>hello</div>;
const world = <div>world</div>;


const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
}


const tree = [
    'hello',
    'world',
    { label: 'hello_div', branches: [
        'hello',
        'hello',
        'hello',
        'hello',
        'world',
        { label: 'yolo_div', branches: [
            { label: 'yolo', branches: [
                'hello',
                'world',
                'world',
                { label: 'carpe', branches: [
                    { label: 'diem', branches: [
                        'hello',
                        'hello',
                    ]},
                ]},
                'hello',
                'world',
            ]},
        ]},
    ]},
    { label: 'world_div', branches: [
        'world',
        'world',
        'world',
        'world',
        'world',
    ]},
];


const Template = (args: any) => {

    const context = {
        pages,
        views: null,
        styles: {},
        classes: {},
        events: {},
    };

    return (
        <TupleContext.Provider value={context}>
            <Tree {...args} />
        </TupleContext.Provider>
    );
}


export const Basic = Template.bind({});
Basic.args = {
    tree: tree,
};
`,locationsMap:{basic:{startLoc:{col:17,line:57},endLoc:{col:1,line:72},startBody:{col:17,line:57},endBody:{col:1,line:72}}}}},title:"Components/Tree",component:l,argTypes:{handleClick:{action:"handleClick"}}};const t=e("div",{children:"hello"}),a=e("div",{children:"world"}),s={hello:{name:"hello",component:()=>t},world:{name:"world",component:()=>a}},d=["hello","world",{label:"hello_div",branches:["hello","hello","hello","hello","world",{label:"yolo_div",branches:[{label:"yolo",branches:["hello","world","world",{label:"carpe",branches:[{label:"diem",branches:["hello","hello"]}]},"hello","world"]}]}]},{label:"world_div",branches:["world","world","world","world","world"]}],c=n=>{const o={pages:s,views:null,styles:{},classes:{},events:{}};return e(r.Provider,{value:o,children:e(l,{...n})})},i=c.bind({});i.args={tree:d};const y=["Basic"];export{i as Basic,y as __namedExportsOrder,u as default};
//# sourceMappingURL=Tree.stories.f74b5ad2.js.map
