import { Meta, Story } from "@storybook/react";

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
