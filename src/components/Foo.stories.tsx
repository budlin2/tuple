import Foo from './Foo';

export default {
    title: 'Components/Foo',
    component: Foo,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => <Foo {...args} />;

export const Basic = Template.bind({});
Basic.args = {

};
