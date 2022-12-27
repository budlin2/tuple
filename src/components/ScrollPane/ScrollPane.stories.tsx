import { Meta, Story } from "@storybook/react";
import ScrollPane, { Props as ScrollPaneProps } from '.';

export default {
    title: 'Components/ScrollPane',
    component: ScrollPane,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<ScrollPaneProps> = (args: ScrollPaneProps) => (
    <ScrollPane {...args} />
);


export const Basic = Template.bind({});
Basic.args = {};
