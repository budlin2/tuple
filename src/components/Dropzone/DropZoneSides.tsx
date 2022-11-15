import {
    CSSProperties,
    DragEvent,
    ReactElement,
    useState
} from 'react';

import { Side } from './DropZoneTypes';

import _classes from './sides.dropzone.module.css';


export interface Props {
    onDragOverCB?       : ((e: DragEvent<Element>, side: Side) => void) | null,
    onDragLeaveCB?      : ((e: DragEvent<Element>, side: Side) => void) | null,
    onDropCB?           : ((e: DragEvent<Element>, side: Side) => void) | null,
    validateDraggable?  : ((e: DragEvent<Element>) => boolean) | null,
    className?          : string | null,
    style?              : CSSProperties | null,
    children?           : ReactElement,
}


const DropZoneSides = ({
    onDragOverCB=null,
    onDragLeaveCB=null,
    onDropCB=null,
    validateDraggable=null,
    className=null,
    style=null,
    children,
}: Props) => {
    const [topVisible   , setTopVisible]    = useState(false);
    const [bottomVisible, setBottomVisible] = useState(false);
    const [leftVisible  , setLeftVisible]   = useState(false);
    const [rightVisible , setRightVisible]  = useState(false);

    const withCustomClass = (_className: string) => `${_className} ${className}`;

    const onDragOverHandler = (e: DragEvent<Element>, side: Side) => {
        // e.stopPropagation();
        e.preventDefault();
    
        switch (side) {
            case Side.TOP   : setTopVisible(true);      break;
            case Side.RIGHT : setRightVisible(true);    break;
            case Side.BOTTOM: setBottomVisible(true);   break;
            case Side.LEFT  : setLeftVisible(true);     break;
            default:
                throw Error("Invalid side!");
        }

        onDragOverCB && onDragOverCB(e, side);
    };

    const onDragLeaveHandler = (e: DragEvent<Element>, side: Side) => {
        switch (side) {
            case Side.TOP   :   setTopVisible(false);       break;
            case Side.RIGHT :   setRightVisible(false);     break;
            case Side.BOTTOM:   setBottomVisible(false);    break;
            case Side.LEFT  :   setLeftVisible(false);      break;
            default:
                throw Error("Invalid side!");
        }

        onDragLeaveCB && onDragLeaveCB(e, side);
    };

    const onDropHandler = (e: DragEvent<Element>, side: Side) => {
        switch (side) {
            case Side.TOP   :   setTopVisible(false);       break;
            case Side.BOTTOM:   setBottomVisible(false);    break;
            case Side.RIGHT :   setRightVisible(false);     break;
            case Side.LEFT  :   setLeftVisible(false);      break;
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
            <div className={_classes.dropZoneTop}
                onDragOver  = { e => onDragOverHandler(e, Side.TOP) }
                onDragLeave = { e => onDragLeaveHandler(e, Side.TOP) }
                onDrop      = { e => onDropHandler(e, Side.TOP) } />

            <div className={_classes.dropZoneRight}
                onDragOver  = { e => onDragOverHandler(e, Side.RIGHT) }
                onDragLeave = { e => onDragLeaveHandler(e, Side.RIGHT) }
                onDrop      = { e => onDropHandler(e, Side.RIGHT) } />

            <div className={_classes.dropZoneBottom}
                onDragOver  = { e => onDragOverHandler(e, Side.BOTTOM) }
                onDragLeave = { e => onDragLeaveHandler(e, Side.BOTTOM) }
                onDrop      = { e => onDropHandler(e, Side.BOTTOM) } />

            <div className={_classes.dropZoneLeft}
                onDragOver  = { e => onDragOverHandler(e, Side.LEFT) }
                onDragLeave = { e => onDragLeaveHandler(e, Side.LEFT) }
                onDrop      = { e => onDropHandler(e, Side.LEFT) } />

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