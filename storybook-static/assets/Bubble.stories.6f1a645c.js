import{r as d}from"./index.b461da8a.js";import{_ as p}from"./styles.module.6d7c69b6.js";import{j as t}from"./jsx-runtime.3c5536b9.js";const m="_bubble_zakix_1",_="_bubbleHidden_zakix_21",f="_bubbleVisible_zakix_27";var l={bubble:m,bubbleHidden:_,bubbleVisible:f};const n=({children:e=null,visible:s=!1,style:b,className:r,onClick:i})=>{const[u,o]=d.exports.useState(!s),c=`
        ${p.noHighlight}
        ${l.bubble||""}
        ${r||""}
        ${u?l.bubbleHidden:l.bubbleVisible}
    `;return t("div",{className:c,style:b,onMouseOver:()=>{s||o(!1)},onMouseLeave:()=>{s||o(!0)},onClick:i,children:e||"Tuple"})};var a=n;try{n.displayName="Bubble",n.__docgenInfo={description:"",displayName:"Bubble",props:{visible:{defaultValue:{value:"false"},description:"",name:"visible",required:!1,type:{name:"boolean"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"() => void"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/Bubble/index.tsx#Bubble"]={docgenInfo:n.__docgenInfo,name:"Bubble",path:"src/components/Bubble/index.tsx#Bubble"})}catch{}var O={parameters:{storySource:{source:`import { Meta, Story } from "@storybook/react";

import Bubble, { Props as BubbleProps } from '.';

export default {
    title: 'Components/Bubble',
    component: Bubble,
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<BubbleProps> = (args: any) => (
    <Bubble {...args} />
);


export const Basic = Template.bind({});
Basic.args = {};
`,locationsMap:{basic:{startLoc:{col:37,line:13},endLoc:{col:1,line:15},startBody:{col:37,line:13},endBody:{col:1,line:15}}}}},title:"Components/Bubble",component:a};const B=e=>t(a,{...e}),y=B.bind({});y.args={};const T=["Basic"];export{y as Basic,T as __namedExportsOrder,O as default};
//# sourceMappingURL=Bubble.stories.6f1a645c.js.map
