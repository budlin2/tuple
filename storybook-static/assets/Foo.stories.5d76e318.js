import{j as n,F as a}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";const o=({})=>n(a,{});var t=o;try{o.displayName="Foo",o.__docgenInfo={description:"",displayName:"Foo",props:{styles:{defaultValue:null,description:"",name:"styles",required:!1,type:{name:"CSSProperties"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Foo/index.tsx#Foo"]={docgenInfo:o.__docgenInfo,name:"Foo",path:"src/components/Foo/index.tsx#Foo"})}catch{}var p={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import Foo, { Props as FooProps } from '.';

export default {
    title: 'Components/Foo',
    component: Foo,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<FooProps> = (args: any) => (
    <Foo {...args} />
);


export const Basic = Template.bind({});
Basic.args = {};
`,locationsMap:{basic:{startLoc:{col:34,line:14},endLoc:{col:1,line:16},startBody:{col:34,line:14},endBody:{col:1,line:16}}}}},title:"Components/Foo",component:t,argTypes:{handleClick:{action:"handleClick"}}};const s=e=>n(t,{...e}),r=s.bind({});r.args={};const l=["Basic"];export{r as Basic,l as __namedExportsOrder,p as default};
//# sourceMappingURL=Foo.stories.5d76e318.js.map
