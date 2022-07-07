import SplitPane from '../components/SplitPane';

export default {
    title: 'Components/SplitPane',
    component: SplitPane,
}

const Template = (args: any) => (
    <SplitPane {...args}>
        <div style={{ background: 'red', width: '100%', height: '100%' }}>HEAD</div>
        <div style={{ background: 'yellow', width: '100%', height: '100%' }}>TAIL</div>
    </SplitPane>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
    dir: 'horizontal',
    firstLength: '50%',
    resizable: true,
};


export const Vertical = Template.bind({});
Vertical.args = {
    dir: 'vertical',
    firstLength: '50%',
    resizable: true,
};
