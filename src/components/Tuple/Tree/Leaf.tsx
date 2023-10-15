import {
    MouseEvent as rMouseEvent,
    DragEvent as rDragEvent,
    KeyboardEvent as rKeyboardEvent,
    ChangeEvent as rChangeEvent,
    useContext,
    useState,
    useEffect,
    useRef,
    useMemo,
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
import { PopupItemsT } from '../../Popup/PopupTypes';
import { NodeStateT, PopupDetailsT } from './TreeTypes';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';


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
    const inputRef = useRef<HTMLInputElement>(null);
    const newNodeRef = useRef<HTMLInputElement>(null);

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

    const [leafName, setLeafName]           = useState(text);
    const [renaming, setRenaming]           = useState(false);

    const [nodeState, setNodeState]         = useState<NodeStateT>(NodeStateT.NULL);
    const [newNodeName, setNewNodeName]     = useState('');

    const [_, setDragging]                  = useLocalStorage(DRAGGING_ID, false);

    // memoize?
    const isAddingNode = (nodeState: NodeStateT) => nodeState === NodeStateT.ADDING_BRANCH || nodeState === NodeStateT.ADDING_LEAF;

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {  // Event Handlers for renaming leaf
        if (renaming && inputRef.current) {
            inputRef.current.focus();
            document.addEventListener('click', onClickOutside_RENAME);
            document.addEventListener('contextmenu', onClickOutside_RENAME);
        } else {
            inputRef.current.blur();
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        }

        return () => {
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        };
    }, [renaming]);

    useEffect(() => { // Event Handlers for adding new node
        if (isAddingNode(nodeState) && newNodeRef.current) {
            newNodeRef?.current?.focus();
            document.addEventListener('click', onClickOutside_NEW_NODE);
            document.addEventListener('contextmenu', onClickOutside_NEW_NODE);
        } else {
            newNodeRef?.current?.blur();
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        }

        return () => {
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        };
    }, [nodeState]);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const leafClassName = classNames(
        _classes?.leaf,
        classes?.leaf,
        isDraggedOver ? classNames(_classes?.leafDragOver, classes?.leafDragOver) : '',
        hovering ? classNames(_classes?.leafHover, classes?.leafHover) : '',
        renaming ? classNames(_classes.leafActive, classes.leafActive) : '',
    );

    const newNodeClassName = classNames(
        _classes?.leaf,
        classes?.leaf,
        _classes?.leafActive,
        classes?.leafActive
    );

    const leafStyle = {
        ...styles?.leaf,
        ...hovering ? styles?.leafHover : {},
        ...isDraggedOver ? styles?.leafDragOver : {},
        ...renaming ? styles?.leafActive : {},
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
    // Rename Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_RENAME = (e: rMouseEvent) => {
        e.stopPropagation();
        setRenaming(true);
        setPopupDetails(null);
    };

    const onKeyDown_RENAME = (e: rKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setRenaming(false);
            if (onRename)
                onRename(id, leafName);
        }
      };

    const onChange_RENAME = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLeafName(value);
    };

    // Stop renaming if click occurs outside of input component
    const onClickOutside_RENAME = (e: MouseEvent) => {
        if (inputRef?.current && !inputRef?.current?.contains(e.target as Node)) {
            setRenaming(false);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // New Node Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_NEW_NODE = (e: rMouseEvent, nodeState: NodeStateT) => {
        e.stopPropagation();
        setNodeState(nodeState);
        setPopupDetails(null);
    };

    const onKeyDown_NEW_NODE = (e: rKeyboardEvent<HTMLInputElement>, nodeState: NodeStateT) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setNodeState(NodeStateT.NULL);
            if (nodeState == NodeStateT.ADDING_BRANCH && onBranchAdd)
                onBranchAdd(path, index+1, newNodeName);

            if (nodeState == NodeStateT.ADDING_LEAF && onLeafAdd)
                onLeafAdd(path, index+1, newNodeName);
        }
    };

    const onChange_NEW_NODE = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewNodeName(value);
    };

    // Stop adding new node if click occurs outside of input component
    const onClickOutside_NEW_NODE = (e: MouseEvent) => {
        if (newNodeRef?.current && !newNodeRef?.current?.contains(e.target as Node)) {
            setNodeState(NodeStateT.NULL);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // Popup Items
    //------------------------------------------------------------------------------------------------------------------
    const getPopupItems = (
        onRename:       (pageId: ID, newName: string) => void,
        onDelete:       (path: ID[]) => void,
        onBranchAdd:    (path: ID[], position: number, branchName: string) => void,
        onLeafAdd:      (path: ID[], position: number, leafName: string) => void,
    ): PopupItemsT => {
        const popupItems: PopupItemsT = [];
        if (onRename)
            popupItems.push({ id: 1, label: 'Rename', onClick: onPopupClick_RENAME });

        if (onDelete)
            popupItems.push({ id: 2, label: 'Delete', onClick: () => onDelete(path.concat(id)) });

        if (onBranchAdd)
            popupItems.push({ id: 3, label: 'Add Branch', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_BRANCH) });

        if (onLeafAdd)
            popupItems.push({ id: 4, label: 'Add Leaf', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_LEAF) });

        return popupItems;
    };

    const popupItems = useMemo(() => getPopupItems(
        onRename, onDelete, onBranchAdd, onLeafAdd
    ), [onRename, onDelete, onBranchAdd, onLeafAdd]);

    //------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <input ref={inputRef} type="text" draggable
                value           ={ leafName }
                readOnly        ={ !renaming }
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
                onKeyDown       ={ onKeyDown_RENAME }
                onChange        ={ onChange_RENAME }
            />
            { (isAddingNode(nodeState)) && (
                <input ref={newNodeRef} type="text"
                    value       ={ newNodeName }
                    className   ={ newNodeClassName }
                    style       ={ styles.leafActive }
                    onKeyDown   ={ e => onKeyDown_NEW_NODE(e, nodeState) }
                    onChange    ={ onChange_NEW_NODE }
                />
            )}
        </>
    );
};


export default Leaf;
