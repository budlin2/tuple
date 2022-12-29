import { Meta, Story } from "@storybook/react";

import DropZone, { Props as DropZoneProps } from '.';

export default {
    title: 'Components/DropZone',
    component: DropZone,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<DropZoneProps> = (args: any) => {
    const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

    return (
        <div style={{background: 'pink', height: 600, width: 800}}>
            <div style={{height: 500, width: 700}}>
                <DropZone {...args}>
                    <p>Hello there</p>
                </DropZone>
                <div draggable style={draggableStyle}>Hello</div>
            </div>
        </div>
    );
};


export const Basic = Template.bind({});
Basic.args = {};
