import {
    MouseEvent as rMouseEvent,
    DragEvent as rDragEvent,
    KeyboardEvent as rKeyboardEvent,
    ChangeEvent as rChangeEvent,
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react'
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
import { PopupDetailsT } from './TreeTypes';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';


interface Props {
    id: ID,
    text: string,
    pageId: ID,
    path: ID[],
    setPopupDetails?: (details: PopupDetailsT | null) => void,
    onRename?: (pageId: ID, newName: string) => void,
    onDelete?: (pageId: ID) => void,
    onDrop?: (e: rDragEvent) => void,
}


const Leaf = ({
    id,
    text,
    pageId,
    path,
    setPopupDetails = ()=>{},
    onRename,
    onDelete,
    onDrop,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

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
    const [hovering, setHovering] = useState(false);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);
    const [leafName, setLeafName] = useState(text);
    const [renaming, setRenaming] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (renaming && inputRef.current) {
            inputRef.current.focus();
            document.addEventListener('click', onClickOutsideHandler);
            document.addEventListener('contextmenu', onClickOutsideHandler);
        } else {
            inputRef.current.blur();
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('contextmenu', onClickOutsideHandler);
        }

        return () => {
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('contextmenu', onClickOutsideHandler);
        };
    }, [renaming]);

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

    const onRenameClickHandler = (e: rMouseEvent) => {
        e.stopPropagation();
        setRenaming(true);
        setPopupDetails(null);
    };

    const onKeyDownHandler = (e: rKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setRenaming(false);
            if (onRename)
                onRename(id, leafName);
        }
      };

    const onChangeHandler = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLeafName(value);
    };

    // Close renaming if click occurs outside of input component
    const onClickOutsideHandler = (e: MouseEvent) => {
        // Click occurred outside the component
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setRenaming(false);
        }
    };

    // Set popup menu items
    const popupItems: PopupItemsT = [];
    if (onRename)
        popupItems.push({ id: 1, label: 'Rename', onClick: onRenameClickHandler });

    return (
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
            onKeyDown       ={ onKeyDownHandler }
            onChange        ={ onChangeHandler }
        />
    );
};


export default Leaf;
