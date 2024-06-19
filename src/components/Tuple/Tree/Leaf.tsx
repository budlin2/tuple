import {
    MouseEvent as rMouseEvent,
    DragEvent as rDragEvent,
    useContext,
    useState,
} from 'react';
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
import { PopupDetailsT } from './TreeTypes';
import { NodeStateT } from './useContextMenu/types';
import { classNames } from '../../../utils';
import useContextMenu, { isAddingNode } from './useContextMenu';

import _classes from './tree.module.css';


interface Props {
    id: ID,
    index: number,
    text: string,
    pageId: ID,
    path: ID[],
    setPopupDetails?:   (details: PopupDetailsT | null) => void,
    onRename?:          (pageId: ID, newName: string) => void,
    onDelete?:          (path: ID[]) => void,
    onDrop?:            (e: rDragEvent) => void,
    onBranchAdd?:       (path: ID[], position: number, branchName: string) => void,
    onLeafAdd?:         (path: ID[], position: number, leafName: string) => void,
}


const Leaf = ({
    id,
    index,
    text,
    pageId,
    path,
    setPopupDetails = ()=>{},
    onRename,
    onDelete,
    onDrop,
    onBranchAdd,
    onLeafAdd,
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

    const [hovering, setHovering]           = useState(false);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [_, setDragging]                  = useLocalStorage(DRAGGING_ID, false);

    const {
        inputRef,
        newNodeRef,
        nodeName,
        newNodeName,
        nodeState,
        popupItems,
    } = useContextMenu({
        initialNodeName: text,
        setPopupDetails,
        onRename:       (name: string) => onRename(id, name),
        onDelete:       () => onDelete(path.concat(id)),
        onBranchAdd:    (name: string) => onBranchAdd(path, index+1, name),
        onLeafAdd:      (name: string) => onLeafAdd(path, index+1, name),
    });

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const leafClassName = classNames(
        _classes?.leaf_base,
        classes?.leaf_base,
        isDraggedOver && classNames(_classes?.leaf_dragOver, classes?.leaf_dragOver),
        hovering && classNames(_classes?.leaf_hover, classes?.leaf_hover),
        nodeState == NodeStateT.RENAMING && classNames(_classes?.leaf_renaming, classes?.leaf_renaming),
    );

    const newNodeClassName = classNames(
        _classes?.leaf_base,
        classes?.leaf_base,
        _classes?.leaf_renaming,
        classes?.leaf_renaming
    );

    const leafStyle = {
        ...styles?.leaf?.base,
        ...hovering ? styles?.leaf?.hover : {},
        ...isDraggedOver ? styles?.leaf?.dragOver : {},
        ...nodeState == NodeStateT.RENAMING ? styles?.leaf?.renaming : {},
    };

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

    const onMouseOverHandler = () => setHovering(true);
    const onMouseLeaveHandler = () => setHovering(false);

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

    const onDragOverHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const isDynamicTree = !!onDrop;
        if (isDynamicTree)
            setIsDraggedOver(true);
    }

    const onDragLeaveHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDraggedOver(false);
    }

    const onRightClickHandler = (event: rMouseEvent) => {
        if (!popupItems.length) return;

        event.preventDefault();
        const { clientX: x, clientY: y } = event;

        setPopupDetails({
            items: popupItems,
            pos: { x, y }
        });
    };

    //------------------------------------------------------------------------------------------------------------------
    // Render
    //------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <input ref={inputRef} type="text" draggable
                value           ={ nodeName }
                readOnly        ={ !(nodeState == NodeStateT.RENAMING) }
                className       ={ leafClassName }
                style           ={ leafStyle }
                onClick         ={ onClickHandler }
                onMouseOver     ={ onMouseOverHandler }
                onMouseLeave    ={ onMouseLeaveHandler }
                onDragOver      ={ onDragOverHandler }
                onDragLeave     ={ onDragLeaveHandler }
                onDrop          ={ onDropHandler }
                onDragStart     ={ onDragStartHandler }
                onDragEnd       ={ onDragEndHandler }
                onContextMenu   ={ onRightClickHandler }
            />
            { (isAddingNode(nodeState)) && (
                <input ref={newNodeRef} type="text"
                    value       ={ newNodeName }
                    className   ={ newNodeClassName }
                    style       ={ styles?.leaf?.renaming }
                />
            )}
        </>
    );
};


export default Leaf;
