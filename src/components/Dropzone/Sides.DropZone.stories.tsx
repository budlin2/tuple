import { Meta, Story } from "@storybook/react";
import DropZoneSides, { Props } from './DropZoneSides';

export default {
    title: 'Components/DropZone/Sides',
    component: DropZoneSides,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const containerStyle = { background: 'yellow', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const draggableStyle = { background: 'red', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 20, padding: 5, border: '1px solid purple', borderRadius: 10};

const Template: Story<Props> = (args: any) => (
    <div style={containerStyle}>
        <DropZoneSides {...args} >
            <div draggable style={draggableStyle}>Hello</div>
        </DropZoneSides>
    </div>
);


export const Basic = Template.bind({});
Basic.args = {
    // onDragOverCB: (e, side) => console.log(`Dragging over ${side}`, e),
    onDragLeaveCB: (e, side) => console.log(`Left ${side}`, e),
    onDropCB: (e, side) => console.log(`Dropped on ${side}`, e),
    validateDraggable: (e) => true,
};
