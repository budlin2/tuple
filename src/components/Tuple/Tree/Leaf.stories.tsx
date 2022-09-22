import Leaf from './Leaf';

export default {
    title: 'Components/Leaf',
    component: Leaf,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => <Leaf {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    children: <>HI!</>,
    text: 'Hi, I\'m a leaf!',
    mouseDown: () => {},
    style: { flex: 1, backgroundColor: 'red' },
};
