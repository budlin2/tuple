import Branch from '../components/Branch';

export default {
    title: 'Components/Branch',
    component: Branch,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => <Branch {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    children: <div>HI!</div>,
    text: 'Branch',
};
