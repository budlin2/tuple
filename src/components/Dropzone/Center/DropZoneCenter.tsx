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
    dropZoneActive?     : boolean,  // parent component may want to control when dropzone is active
    className?          : string | null,
    style?              : CSSProperties | null,
    children?           : ReactElement,
}


const DropZoneCenter = ({
    onDragOverCB=null,
    onDragLeaveCB=null,
    onDropCB=null,
    validateDraggable=null,
    dropZoneActive=true,  // default behavior is to always have dropzone available. Parent may override this
    className=null,
    style=null,
    children,
}: Props) => {
    const [dropZoneVisible, setDropZoneVisible] = useState(false);

    const dropZoneDisplayClass = `${_classes.dropZoneDisplay} ${className}`;


    // DropZone Event Handlers
    const onDragOverHandler = (e: DragEvent<Element>) => {
        // e.stopPropagation();
        e.preventDefault();

        setDropZoneVisible(true);

        onDragOverCB && onDragOverCB(e);
    };

    const onDragLeaveHandler = (e: DragEvent<Element>) => {
        setDropZoneVisible(false);

        onDragLeaveCB && onDragLeaveCB(e);
    };

    const onDropHandler = (e: DragEvent<Element>) => {
        setDropZoneVisible(false);

        if (validateDraggable && !validateDraggable(e))
            return;

        onDropCB && onDropCB(e);
    };

    return (
        <div className={_classes.root}>
            { dropZoneActive && (
                <div className  = { _classes.dropZone }
                    style       = { style || {} }
                    onDragOver  = { onDragOverHandler }
                    onDragLeave = { onDragLeaveHandler }
                    onDrop      = { onDropHandler }
                />
            )}

            { dropZoneVisible && <div className={dropZoneDisplayClass} /> }
            
            { children }
        </div>
    );
}


export default DropZoneCenter;