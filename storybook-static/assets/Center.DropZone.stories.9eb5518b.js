import{D as o}from"./DropZoneCenter.640d5182.js";import{a as r,j as n}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";var p={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import DropZoneCenter, { Props } from './DropZoneCenter';

export default {
    title: 'Components/DropZone/Center',
    component: DropZoneCenter,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const rootStyle = { background: 'green', height: 400 }
const containerStyle = { background: 'yellow', height: 300 };
const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

const Template: Story<Props> = (args: any) => (
    <div style={rootStyle}>
        <div style={containerStyle}>
            <DropZoneCenter {...args} />
        </div>
        <div draggable style={draggableStyle}>Hello</div>
    </div>
);


export const Basic = Template.bind({});
Basic.args = {
    // onDragOverCB: (e, side) => console.log(\`Dragging over \${side}\`, e),
    onDragLeaveCB: e => console.log('Left dropzone', e),
    onDropCB: e => console.log('Dropped' , e),
    validateDraggable: e => true,
};
`,locationsMap:{basic:{startLoc:{col:31,line:19},endLoc:{col:1,line:26},startBody:{col:31,line:19},endBody:{col:1,line:26}}}}},title:"Components/DropZone/Center",component:o,argTypes:{handleClick:{action:"handleClick"}}};const t={background:"green",height:400},a={background:"yellow",height:300},l={background:"red",width:50,display:"flex",alignItems:"center",justifyContent:"center",height:20,padding:5,border:"1px solid purple",borderRadius:10},s=e=>r("div",{style:t,children:[n("div",{style:a,children:n(o,{...e})}),n("div",{draggable:!0,style:l,children:"Hello"})]}),i=s.bind({});i.args={onDragLeaveCB:e=>console.log("Left dropzone",e),onDropCB:e=>console.log("Dropped",e),validateDraggable:e=>!0};const y=["Basic"];export{i as Basic,y as __namedExportsOrder,p as default};
//# sourceMappingURL=Center.DropZone.stories.9eb5518b.js.map
