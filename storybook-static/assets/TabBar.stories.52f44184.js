import{T as e}from"./index.2e891989.js";import{T as t}from"./TupleProvider.c3e92b8b.js";import{j as n}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";var g={parameters:{storySource:{source:`import TabBar from '.';
import { TupleContext } from '../Tuple/TupleProvider';
import { PagesT } from '../../types';

export default {
    title: 'Components/TabBar',
    component: TabBar,
    argTypes: { handleClick: { action: "handleClick" } },
}


const hello = <div>hello</div>;
const world = <div>world</div>;

const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
};

const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {
            tabBar: { background: 'yellow' },
            tab: { background: 'red' },
            tabClose: { background: 'green' },
        },
        classes: {},
        events: {},
    };
    return (
        <TupleContext.Provider value={context}>
            <div style={{ width: '600px' }}>
                <TabBar {...args} />
            </div>
        </TupleContext.Provider>
    );
};


export const Basic = Template.bind({});
Basic.args = {
    tabs: [
        { id: '1', pageId: 'hello' },
        { id: '2', pageId: 'world' },
    ],
};
`,locationsMap:{basic:{startLoc:{col:17,line:20},endLoc:{col:1,line:39},startBody:{col:17,line:20},endBody:{col:1,line:39}}}}},title:"Components/TabBar",component:e,argTypes:{handleClick:{action:"handleClick"}}};const a=n("div",{children:"hello"}),r=n("div",{children:"world"}),s={hello:{name:"hello",component:()=>a},world:{name:"world",component:()=>r}},d=o=>{const l={pages:s,views:null,styles:{tabBar:{background:"yellow"},tab:{background:"red"},tabClose:{background:"green"}},classes:{},events:{}};return n(t.Provider,{value:l,children:n("div",{style:{width:"600px"},children:n(e,{...o})})})},c=d.bind({});c.args={tabs:[{id:"1",pageId:"hello"},{id:"2",pageId:"world"}]};const u=["Basic"];export{c as Basic,u as __namedExportsOrder,g as default};
//# sourceMappingURL=TabBar.stories.52f44184.js.map
