import { Meta, Story } from "@storybook/react";

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
