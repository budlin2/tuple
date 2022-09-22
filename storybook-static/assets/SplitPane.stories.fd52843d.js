import{S as n}from"./index.5a93f4df.js";import{j as e,a as r}from"./jsx-runtime.3c5536b9.js";import"./index.b461da8a.js";var c={parameters:{storySource:{source:`import SplitPane from '.';

export default {
    title: 'Components/SplitPane',
    component: SplitPane,
}

const Template = (args: any) => (
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
`,locationsMap:{horizontal:{startLoc:{col:17,line:8},endLoc:{col:1,line:15},startBody:{col:17,line:8},endBody:{col:1,line:15}},vertical:{startLoc:{col:17,line:8},endLoc:{col:1,line:15},startBody:{col:17,line:8},endBody:{col:1,line:15}}}}},title:"Components/SplitPane",component:n};const t=i=>e("div",{style:{height:"700px",width:"1000px"},children:r(n,{...i,children:[e("div",{style:{background:"red",width:"100%",height:"100%"},children:"HEAD"}),e("div",{style:{background:"yellow",width:"100%",height:"100%"},children:"TAIL"})]})}),o=t.bind({});o.args={dir:"horizontal",resizerPos:"50%",resizable:!0};const l=t.bind({});l.args={dir:"vertical",resizerPos:"50%",resizable:!0};const p=["Horizontal","Vertical"];export{o as Horizontal,l as Vertical,p as __namedExportsOrder,c as default};
//# sourceMappingURL=SplitPane.stories.fd52843d.js.map
