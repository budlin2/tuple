import { DragEvent as rDragEvent, useContext, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { cleanupDraggable, outsideWindow, setCustomDragImage } from '../../Draggable';
import {
    DRAGGING_ID,
    get_dragged_to_different_viewport,
    open_new_viewport_window,
    set_storage_port_from_page_id
} from '../state/browser-actions';
import { addTab, addNewView } from '../state/dispatchers';
import { DragSourceT, ID, TupleContextT } from '../TupleTypes';
import { PortsT } from '../Viewport/ViewportTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    pageId: ID,
    path: string[],
    isDynamicTree: boolean,
}


const Leaf = ({
    text,
    pageId,
    path,
    isDynamicTree,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const {
        dispatch,
        state: {
            pages,
            viewport,
            classes,
            styles,
            events,
        }
    }: TupleContextT = useContext(TupleContext);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const leafClassName = `
        ${_classes?.leaf || ''}
        ${classes?.leaf  || ''}
        ${isDraggedOver ? `${_classes?.leafDragOver} ${classes?.leafDragOver}` : ''}`;

    const draggableClass = classes?.draggable || '';

    //------------------------------------------------------------------------------------------------------------------
    // Helper Functions
    //------------------------------------------------------------------------------------------------------------------
    const getTopLeftPortIdHelper = (ports: PortsT, curPortId: ID): ID | null => {
        const currentPort = ports[curPortId];
        if (!currentPort)
            return null;

        if (!ports[curPortId].isSplitView)
            return curPortId;

        return getTopLeftPortIdHelper(ports, currentPort.headId);
    }

    const getTopLeftPortId = (): ID | null => {
        const {root, ports} = viewport;
        return getTopLeftPortIdHelper(ports, root);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onDragStartHandler = (e: rDragEvent) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
        e.dataTransfer.setData('pageId', pageId as string);
        setDragging(true);
    };

    const onDragEndHandler = async (e: rDragEvent) => {
        cleanupDraggable();
        setDragging(false);

        const { clientX: x, clientY: y } = e;
        if (outsideWindow(x, y)) {
            if (!( await get_dragged_to_different_viewport() )) {
                const newViewportId = set_storage_port_from_page_id(pageId);
                open_new_viewport_window(newViewportId);
            }
        }
    }

    const onDropHandler = (e: rDragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'leaf');
        }
    }

    const onClickHandler = () => {
        if (Object.keys(pages).length <= 0) {
            addNewView(dispatch, pageId)
        }

        const topLeftPortId = getTopLeftPortId();
        if (topLeftPortId) {
            addTab(dispatch, topLeftPortId, '', pageId);
        } else {
            addNewView(dispatch, pageId);
        }
    }

    const onDragOverHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (isDynamicTree)
            setIsDraggedOver(true);
    }
    const onDragLeaveHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDraggedOver(false);
    }

    return (
        <div
            style={styles.leaf}
            className={leafClassName}
            draggable
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
            onDrop={onDropHandler}
            onClick={onClickHandler}>
            { text }
        </div>
    );
};


export default Leaf;
