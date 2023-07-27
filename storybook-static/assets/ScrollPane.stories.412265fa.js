import{S as o}from"./index.8b918fca.js";import{j as e}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";var s={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";
import ScrollPane, { Props as ScrollPaneProps } from '.';

export default {
    title: 'Components/ScrollPane',
    component: ScrollPane,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<ScrollPaneProps> = (args: ScrollPaneProps) => (
    <ScrollPane {...args} />
);


export const Basic = Template.bind({});
Basic.args = {};
`,locationsMap:{basic:{startLoc:{col:41,line:13},endLoc:{col:1,line:15},startBody:{col:41,line:13},endBody:{col:1,line:15}}}}},title:"Components/ScrollPane",component:o,argTypes:{handleClick:{action:"handleClick"}}};const a=n=>e(o,{...n}),r=a.bind({});r.args={};const i=["Basic"];export{r as Basic,i as __namedExportsOrder,s as default};
//# sourceMappingURL=ScrollPane.stories.412265fa.js.map
