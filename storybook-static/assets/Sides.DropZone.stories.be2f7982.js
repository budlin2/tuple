import{D as t}from"./DropZoneSides.4db44d78.js";import{j as o}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";var p={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";
import DropZoneSides, { Props } from './DropZoneSides';

export default {
    title: 'Components/DropZone/Sides',
    component: DropZoneSides,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const containerStyle = { background: 'yellow', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

const Template: Story<Props> = (args: any) => (
    <div style={containerStyle}>
        <DropZoneSides {...args} >
            <div draggable style={draggableStyle}>Hello</div>
        </DropZoneSides>
    </div>
);


export const Basic = Template.bind({});
Basic.args = {
    // onDragOverCB: (e, side) => console.log(\`Dragging over \${side}\`, e),
    onDragLeaveCB: (e, side) => console.log(\`Left \${side}\`, e),
    onDropCB: (e, side) => console.log(\`Dropped on \${side}\`, e),
    validateDraggable: (e) => true,
};
`,locationsMap:{basic:{startLoc:{col:31,line:17},endLoc:{col:1,line:23},startBody:{col:31,line:17},endBody:{col:1,line:23}}}}},title:"Components/DropZone/Sides",component:t,argTypes:{handleClick:{action:"handleClick"}}};const r={background:"yellow",height:600,display:"flex",alignItems:"center",justifyContent:"center"},a={background:"red",width:50,display:"flex",alignItems:"center",justifyContent:"center",height:20,padding:5,border:"1px solid purple",borderRadius:10},l=e=>o("div",{style:r,children:o(t,{...e,children:o("div",{draggable:!0,style:a,children:"Hello"})})}),i=l.bind({});i.args={onDragLeaveCB:(e,n)=>console.log(`Left ${n}`,e),onDropCB:(e,n)=>console.log(`Dropped on ${n}`,e),validateDraggable:e=>!0};const g=["Basic"];export{i as Basic,g as __namedExportsOrder,p as default};
//# sourceMappingURL=Sides.DropZone.stories.be2f7982.js.map
