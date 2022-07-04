import SplitPane2 from '../components/SplitPane2';

export default {
    title: 'Components/SplitPane2',
    component: SplitPane2,
}

const Template = (args: any) => <SplitPane2 {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    dir: 'horizontal',
    size: '50%',
    resizable: true,
};

