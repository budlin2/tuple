import { Meta, Story } from "@storybook/react";

import MobileView, { Props as FooProps } from '.';

export default {
    title: 'Components/MobileView',
    component: MobileView,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<FooProps> = (args: any) => (
    <MobileView {...args} />
);


export const Basic = Template.bind({});
Basic.args = {};
