import {
    CSSProperties,
    useState,
    useRef,
    DragEvent,
    ReactElement,
    MouseEvent as rMouseEvent,
    useEffect
} from 'react';

import DropZoneCenter from './Center/DropZoneCenter';
import { DropSideT } from './DropZoneTypes';
import DropZoneSides from './Sides/DropZoneSides';


export interface Props {
    centerDropZoneStyle?        : CSSProperties,
    sidesDropZoneStyle?         : CSSProperties,
    centerDropZoneClassName?    : string,
    sidesDropZoneClassName?     : string,
    offsetHeight?               : number,  // possible offset for dropzone due to a sibling component (e.g. tabBar)
    dropCenterCb?               : ((e: DragEvent<Element>) => void) | null,
    dropSidesCb?                : ((e: DragEvent<Element>, side: DropSideT) => void) | null,
    validateDraggable?          : ((e: DragEvent<Element>) => boolean) | null,
    children?                   : ReactElement,
}


const DropZone = ({
    centerDropZoneStyle=null,
    sidesDropZoneStyle=null,
    centerDropZoneClassName=null,
    sidesDropZoneClassName=null,
    offsetHeight=0,
    dropCenterCb=null,
    dropSidesCb=null,
    validateDraggable=null,
    children,
}: Props) => {
    const rootRef = useRef<HTMLDivElement>();
    const [parentHeight, setParentHeight] = useState<number>(0);
    const [dropZonesActive, setDropZonesActive] = useState(false);

    const rootStyle: CSSProperties = {
        width: '100%',
        height: parentHeight - offsetHeight,
    }

    useEffect(() => {
        const pHeight = rootRef.current.parentElement.offsetHeight;
        setParentHeight(pHeight);
    }, [rootRef, offsetHeight, rootRef?.current?.parentElement?.offsetHeight])

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
            style={rootStyle}
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
                    hoverThickness={parentHeight * 0.2}
                    onDropCB={onDropSidesHandler}
                    validateDraggable={validateDraggable}>

                    { children }

                </DropZoneSides>
            </DropZoneCenter>
        </div>
    );
}


export default DropZone;