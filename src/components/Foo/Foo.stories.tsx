import { Meta, Story } from "@storybook/react";
import Foo from '.';

export default {
    title: 'Components/Foo',
    component: Foo,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


type Props = any;  // Import this from root component


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<Props> = (args: any) => <Foo {...args} />;


export const Basic = Template.bind({});
Basic.args = {};
