import {
    CSSProperties,
    useState,
    useRef,
    DragEvent,
    ReactElement,
    MouseEvent as rMouseEvent,
} from 'react';

import DropZoneCenter from './Center/DropZoneCenter';
import { DropSideT } from './DropZoneTypes';
import DropZoneSides from './Sides/DropZoneSides';

import _classes from './DropZone.module.css';

export interface Props {
    dropZoneRootStyle?          : CSSProperties
    centerDropZoneStyle?        : CSSProperties,
    sidesDropZoneStyle?         : CSSProperties,
    dropZoneRootClassName?      : string
    centerDropZoneClassName?    : string,
    sidesDropZoneClassName?     : string,
    dropCenterCb?               : ((e: DragEvent<Element>) => void) | null,
    dropSidesCb?                : ((e: DragEvent<Element>, side: DropSideT) => void) | null,
    validateDraggable?          : ((e: DragEvent<Element>) => boolean) | null,
    children?                   : ReactElement,
}


const DropZone = ({
    dropZoneRootStyle,
    centerDropZoneStyle=null,
    sidesDropZoneStyle=null,
    dropZoneRootClassName,
    centerDropZoneClassName=null,
    sidesDropZoneClassName=null,
    dropCenterCb=null,
    dropSidesCb=null,
    validateDraggable=null,
    children,
}: Props) => {
    const rootRef = useRef<HTMLDivElement>();
    const [dropZonesActive, setDropZonesActive] = useState(false);

    const rootClassName = `
        ${_classes.root}
        ${dropZoneRootClassName}`;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onDropCenterHandler = (e: DragEvent<Element>) => {
        setDropZonesActive(false);
        dropCenterCb && dropCenterCb(e);
    }

    const onDropSidesHandler = (e: DragEvent<Element>, side: DropSideT) => {
        setDropZonesActive(false);
        dropSidesCb && dropSidesCb(e, side);
    }

    // TODO: Could add event listener to window in this function to setDragZonesActive(false).. then clean up the event listener of course..
    const onDragOverHandler = () => setDropZonesActive(true);

    const onDragLeaveHandler = (e: rMouseEvent) => {
        const { top, right, bottom, left } = rootRef.current.getBoundingClientRect();
        const { clientX: xPos, clientY: yPos } = e;

        // hacky, but been having issue with mouse position not being
        // correctly recorded when leaving div from right or bottom
        const OFFSET = 10;

        // This event can fire when dragging over a child element, so need
        // to check if mouse has actually left the surrounding div
        if (xPos <= left ||
            xPos >= right - OFFSET ||
            yPos <= top ||
            yPos >= bottom - OFFSET)
        {
            setDropZonesActive(false);
        }
    }

    return (
        <div ref={rootRef}
            className={rootClassName}
            style={dropZoneRootStyle}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}>

            <DropZoneCenter
                style={centerDropZoneStyle}
                className={centerDropZoneClassName}
                dropZoneActive={dropZonesActive}
                onDropCB={onDropCenterHandler}
                validateDraggable={validateDraggable}>

                <DropZoneSides
                    style={sidesDropZoneStyle}
                    className={sidesDropZoneClassName}
                    dropZoneActive={dropZonesActive}
                    onDropCB={onDropSidesHandler}
                    validateDraggable={validateDraggable}>

                    { children }

                </DropZoneSides>
            </DropZoneCenter>
        </div>
    );
}


export default DropZone;