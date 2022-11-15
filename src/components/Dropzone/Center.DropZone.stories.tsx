import { Meta, Story } from "@storybook/react";
import DropZoneCenter, { Props } from './DropZoneCenter';

export default {
    title: 'Components/DropZone/Center',
    component: DropZoneCenter,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const rootStyle = { background: 'green', height: 400 }
const containerStyle = { background: 'yellow', height: 300 };
const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

const Template: Story<Props> = (args: any) => (
    <div style={rootStyle}>
        <div style={containerStyle}>
            <DropZoneCenter {...args} />
        </div>
        <div draggable style={draggableStyle}>Hello</div>
    </div>
);


export const Basic = Template.bind({});
Basic.args = {
    // onDragOverCB: (e, side) => console.log(`Dragging over ${side}`, e),
    onDragLeaveCB: e => console.log('Left dropzone', e),
    onDropCB: e => console.log('Dropped' , e),
    validateDraggable: e => true,
};
