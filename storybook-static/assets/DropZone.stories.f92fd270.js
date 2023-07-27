import{D as n}from"./index.4c66f3ac.js";import{j as e,a as t}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";import"./DropZoneCenter.640d5182.js";import"./DropZoneSides.4db44d78.js";var g={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import DropZone, { Props as DropZoneProps } from '.';

export default {
    title: 'Components/DropZone',
    component: DropZone,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<DropZoneProps> = (args: any) => {
    const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

    return (
        <div style={{background: 'pink', height: 600, width: 800}}>
            <div style={{height: 500, width: 700}}>
                <DropZone {...args}>
                    <p>Hello there</p>
                </DropZone>
                <div draggable style={draggableStyle}>Hello</div>
            </div>
        </div>
    );
};


export const Basic = Template.bind({});
Basic.args = {};
`,locationsMap:{basic:{startLoc:{col:39,line:15},endLoc:{col:1,line:28},startBody:{col:39,line:15},endBody:{col:1,line:28}}}}},title:"Components/DropZone",component:n,argTypes:{handleClick:{action:"handleClick"}}};const i=o=>{const r={background:"red",width:50,display:"flex",alignItems:"center",justifyContent:"center",height:20,padding:5,border:"1px solid purple",borderRadius:10};return e("div",{style:{background:"pink",height:600,width:800},children:t("div",{style:{height:500,width:700},children:[e(n,{...o,children:e("p",{children:"Hello there"})}),e("div",{draggable:!0,style:r,children:"Hello"})]})})},a=i.bind({});a.args={};const h=["Basic"];export{a as Basic,h as __namedExportsOrder,g as default};
//# sourceMappingURL=DropZone.stories.f92fd270.js.map
