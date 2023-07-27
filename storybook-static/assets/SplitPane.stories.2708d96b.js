import{S as t}from"./index.e62c7fbf.js";import{j as e,a as o}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";import"./styles.module.6d7c69b6.js";var p={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import SplitPane, { Props as SplitPaneProps } from '.';

export default {
    title: 'Components/SplitPane',
    component: SplitPane,
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<SplitPaneProps> = (args: any) => (
    <div style = {{ height: '700px', width: '1000px' }}>
        <SplitPane {...args}>
            <div style={{ background: 'red', width: '100%', height: '100%' }}>HEAD</div>
            <div style={{ background: 'yellow', width: '100%', height: '100%' }}>TAIL</div>
        </SplitPane>
    </div>
);


export const Horizontal = Template.bind({});
Horizontal.args = {
    dir: 'horizontal',
    resizerPos: '50%',
    resizable: true,
};


export const Vertical = Template.bind({});
Vertical.args = {
    dir: 'vertical',
    resizerPos: '50%',
    resizable: true,
};
`,locationsMap:{horizontal:{startLoc:{col:40,line:14},endLoc:{col:1,line:21},startBody:{col:40,line:14},endBody:{col:1,line:21}},vertical:{startLoc:{col:40,line:14},endLoc:{col:1,line:21},startBody:{col:40,line:14},endBody:{col:1,line:21}}}}},title:"Components/SplitPane",component:t};const n=r=>e("div",{style:{height:"700px",width:"1000px"},children:o(t,{...r,children:[e("div",{style:{background:"red",width:"100%",height:"100%"},children:"HEAD"}),e("div",{style:{background:"yellow",width:"100%",height:"100%"},children:"TAIL"})]})}),i=n.bind({});i.args={dir:"horizontal",resizerPos:"50%",resizable:!0};const l=n.bind({});l.args={dir:"vertical",resizerPos:"50%",resizable:!0};const h=["Horizontal","Vertical"];export{i as Horizontal,l as Vertical,h as __namedExportsOrder,p as default};
//# sourceMappingURL=SplitPane.stories.2708d96b.js.map
