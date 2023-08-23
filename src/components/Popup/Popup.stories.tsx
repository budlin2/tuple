import { Meta, Story } from "@storybook/react";

import Popup, { Props as PopupProps } from '.';
import { useEffect, useState } from "react";
import { PopupItemsT } from "./PopupTypes";

export default {
    title: 'Components/Popup',
    component: Popup,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;

//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<PopupProps> = (args: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [open, setOpen] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();
        const { clientX, clientY } = event;
        setPosition({ x: clientX, y: clientY });
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleDocumentClick = () => setOpen(false);
        document.addEventListener('click', handleDocumentClick);
    
        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);

    const items: PopupItemsT = [
        { id: 1, label: 'Item 1', onClick: () => alert('Item 1') },
        { id: 2, label: 'Item 2', onClick: () => alert('Item 2') },
        'hr',
        { id: 3, label: 'Item 3', onClick: () => alert('Item 3') },
        { id: 4, label: 'Item 4', onClick: () => alert('Item 4') },
        { id: 5, label: 'Item 5', onClick: () => alert('Item 5') },
        'hr',
        { id: 6, label: 'Item 6', onClick: () => alert('Item 6') },
        { id: 7, label: 'Item 7', onClick: () => alert('Item 7') },
        { id: 8, label: 'Item 8', onClick: () => alert('Item 8') },
        { id: 9, label: 'Item 9', onClick: () => alert('Item 9') },
        { id: 10, label: 'Item 10', onClick: () => alert('Item 10') },
        'hr',
        { id: 11, label: 'Item 11', onClick: () => alert('Item 11') },
    ];

    return (
        <div style={{ background: 'yellow' }} onContextMenu={handleContextMenu}>
            <h1>Right-Click Popup Example</h1>
            <p>Right-click anywhere to open the popup.</p>
            { open && (
                <Popup position={position} onClose={handleClosePopup} items={items} />
            )}
        </div>
    );
};


export const Basic = Template.bind({});
Basic.args = {};
