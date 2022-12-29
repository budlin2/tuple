import {
    CSSProperties,
    DragEvent,
    ReactElement,
    useState,
} from 'react';

import { DropSideT } from '../DropZoneTypes';

import _classes from './sides.dropzone.module.css';


export interface Props {
    onDragOverCB?       : ((e: DragEvent<Element>, side: DropSideT) => void) | null,
    onDragLeaveCB?      : ((e: DragEvent<Element>, side: DropSideT) => void) | null,
    onDropCB?           : ((e: DragEvent<Element>, side: DropSideT) => void) | null,
    validateDraggable?  : ((e: DragEvent<Element>) => boolean) | null,
    dropZoneActive?     : boolean | null,  // parent component may want to control when dropzone is active
    className?          : string | null,
    style?              : CSSProperties | null,
    children?           : ReactElement,
}


const DropZoneSides = ({
    onDragOverCB=null,
    onDragLeaveCB=null,
    onDropCB=null,
    validateDraggable=null,
    dropZoneActive=true,  // default behavior is to always have dropzone available. Parent may override this
    className=null,
    style=null,
    children,
}: Props) => {
    const [topVisible       , setTopVisible]        = useState(false);
    const [bottomVisible    , setBottomVisible]     = useState(false);
    const [leftVisible      , setLeftVisible]       = useState(false);
    const [rightVisible     , setRightVisible]      = useState(false);

    const withCustomClass = (_className: string) => `${_className} ${className}`;

    // DropZone Event Handlers
    const onDragOverHandler = (e: DragEvent<Element>, side: DropSideT) => {
        // e.stopPropagation();
        e.preventDefault();
    
        switch (side) {
            case DropSideT.TOP      : setTopVisible(true);      break;
            case DropSideT.RIGHT    : setRightVisible(true);    break;
            case DropSideT.BOTTOM   : setBottomVisible(true);   break;
            case DropSideT.LEFT     : setLeftVisible(true);     break;
            default:
                throw Error("Invalid side!");
        }

        onDragOverCB && onDragOverCB(e, side);
    };

    const onDragLeaveHandler = (e: DragEvent<Element>, side: DropSideT) => {
        switch (side) {
            case DropSideT.TOP      :   setTopVisible(false);       break;
            case DropSideT.RIGHT    :   setRightVisible(false);     break;
            case DropSideT.BOTTOM   :   setBottomVisible(false);    break;
            case DropSideT.LEFT     :   setLeftVisible(false);      break;
            default:
                throw Error("Invalid side!");
        }

        onDragLeaveCB && onDragLeaveCB(e, side);
    };

    const onDropHandler = (e: DragEvent<Element>, side: DropSideT) => {
        switch (side) {
            case DropSideT.TOP      :   setTopVisible(false);       break;
            case DropSideT.BOTTOM   :   setBottomVisible(false);    break;
            case DropSideT.RIGHT    :   setRightVisible(false);     break;
            case DropSideT.LEFT     :   setLeftVisible(false);      break;
            default:
                throw Error("Bad paramater!");
        }

        if (validateDraggable && !validateDraggable(e))
            return;

        onDropCB && onDropCB(e, side);
    };

    return (
        <div className={_classes.root}>
            {/* ACTUAL DROP ZONE */}
            { dropZoneActive && (
                <div className={_classes.dropZoneTop}
                    style       = { style || {} }
                    onDragOver  = { e => onDragOverHandler(e, DropSideT.TOP) }
                    onDragLeave = { e => onDragLeaveHandler(e, DropSideT.TOP) }
                    onDrop      = { e => onDropHandler(e, DropSideT.TOP) } />
            )}

            { dropZoneActive && (
                <div className={_classes.dropZoneRight}
                    style       = { style || {} }
                    onDragOver  = { e => onDragOverHandler(e, DropSideT.RIGHT) }
                    onDragLeave = { e => onDragLeaveHandler(e, DropSideT.RIGHT) }
                    onDrop      = { e => onDropHandler(e, DropSideT.RIGHT) } />
            )}

            { dropZoneActive && (
                <div className={_classes.dropZoneBottom}
                    style       = { style || {} }
                    onDragOver  = { e => onDragOverHandler(e, DropSideT.BOTTOM) }
                    onDragLeave = { e => onDragLeaveHandler(e, DropSideT.BOTTOM) }
                    onDrop      = { e => onDropHandler(e, DropSideT.BOTTOM) } />
            )}

            { dropZoneActive && (
                <div className={_classes.dropZoneLeft}
                    style       = { style || {} }
                    onDragOver  = { e => onDragOverHandler(e, DropSideT.LEFT) }
                    onDragLeave = { e => onDragLeaveHandler(e, DropSideT.LEFT) }
                    onDrop      = { e => onDropHandler(e, DropSideT.LEFT) } />
            )}
            
            {/* DROP ZONE DISPLAYED TO USER */}
            { topVisible    && <div className={withCustomClass(_classes.dropZoneDisplayTop)}    style={style || {}} /> }
            { rightVisible  && <div className={withCustomClass(_classes.dropZoneDisplayRight)}  style={style || {}} /> }
            { bottomVisible && <div className={withCustomClass(_classes.dropZoneDisplayBottom)} style={style || {}} /> }
            { leftVisible   && <div className={withCustomClass(_classes.dropZoneDisplayLeft)}   style={style || {}} /> }

            { children }
        </div>
    );
}


export default DropZoneSides;