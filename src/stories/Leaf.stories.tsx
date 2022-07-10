import Leaf from '../components/Leaf';

export default {
    title: 'Components/Leaf',
    component: Leaf,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => <Leaf {...args} />;

export const Basic = (args: any)Template.bind({});
Basic.args = {
    children: <>HI!</>,
    text: 'Hi, I\'m a leaf!',
    mouseDown: () => {},
    style: { flex: 1, backgroundColor: 'red' },
};
