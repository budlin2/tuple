import {
    CSSProperties,
    DragEvent,
    ReactElement,
    useState
} from 'react';

import _classes from './center.dropzone.module.css';


export interface Props {
    onDragOverCB?       : ((e: DragEvent<Element>) => void) | null,
    onDragLeaveCB?      : ((e: DragEvent<Element>) => void) | null,
    onDropCB?           : ((e: DragEvent<Element>) => void) | null,
    validateDraggable?  : ((e: DragEvent<Element>) => boolean) | null,
    className?          : string | null,
    style?              : CSSProperties | null,
    children?           : ReactElement,
}


const DropZoneCenter = ({
    onDragOverCB=null,
    onDragLeaveCB=null,
    onDropCB=null,
    validateDraggable=null,
    className=null,
    style=null,
    children,
}: Props) => {
    const [visible, setVisible] = useState(false);
    const dropZoneDisplayClass = `${_classes.dropZoneDisplay} ${className}`;

    const onDragOverHandler = (e: DragEvent<Element>) => {
        // e.stopPropagation();
        e.preventDefault();
        setVisible(true);
        onDragOverCB && onDragOverCB(e);
    };

    const onDragLeaveHandler = (e: DragEvent<Element>) => {
        setVisible(false);
        onDragLeaveCB && onDragLeaveCB(e);
    };

    const onDropHandler = (e: DragEvent<Element>) => {
        setVisible(false);

        if (validateDraggable && !validateDraggable(e))
            return;

        onDropCB && onDropCB(e);
    };

    return (
        <div className={_classes.root}>
            <div className  = { _classes.dropZone }
                style       = { style || {} }
                onDragOver  = { onDragOverHandler }
                onDragLeave = { onDragLeaveHandler }
                onDrop      = { onDropHandler }
            />

            { visible && <div className={dropZoneDisplayClass} /> }
            
            { children }
        </div>
    );
}


export default DropZoneCenter;