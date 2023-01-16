import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    DragEvent,
    useEffect,
    MouseEvent as rMouseEvent,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '../../..';
import { cleanupDraggable, setCustomDragImage } from '../../../../Draggable';
import { validateDraggable } from '../../../state';
import {
    DRAGGING_ID,
    get_dragged_to_different_viewport,
    open_new_viewport_window,
    outside_window,
    set_dragged_to_different_viewport,
    set_storage_port_from_page_id,
} from '../../../state/browser-actions';
import { addTab, changeView, removeTab } from '../../../state/dispatchers';
import { ID, TupleContextT } from '../../../TupleTypes';

import _classes from './tabbar.module.css';


export interface TabProps {
    portId: ID,
    index: number,
    pageId: ID,  // This also serves as a unique id for tab
}


export const Tab = ({
    portId,
    index,
    pageId,
}: TabProps) => {
    const {
        dispatch,
        state:{ pages, classes, styles, viewport, viewportId },
    }: TupleContextT = useContext(TupleContext);

    useEffect(() => {
        cleanupDraggable();
    }, [cleanupDraggable]);

    const tabRef = useRef<HTMLDivElement>();
    const [closeVisible, setCloseVisible] = useState(false);
    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);

    const label = pages[pageId].name;
    const port = viewport.ports[portId];
    const isActiveTab = pageId === port.activePageId;

    const inactiveTabClassName = `
        ${_classes?.tab || ''}
        ${classes?.tab  || ''}`;

    const activeTabClassName = `
        ${inactiveTabClassName}
        ${_classes?.tabActive || ''}
        ${classes?.tabActive  || ''}`;

    const tabClassName = isActiveTab
        ? activeTabClassName
        : inactiveTabClassName;

    const tabLabelClassName = `
        ${_classes?.tabLabel || ''}
        ${classes?.tabLabel  || ''}`;

    const tabCloseClassName = `
        ${_classes?.tabClose || ''}
        ${classes?.tabClose  || ''}`;

    const draggableClass = classes?.draggable || '';

    const tabStyle = isActiveTab ? {...styles.tab, ...styles.tabActive} : styles.tab;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);

    const clickHandler = () => changeView(dispatch, portId, pageId);

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        setCloseVisible(false);
        setCustomDragImage(e, label, draggableClass, styles.draggable);
        setDragging(true);

        e.dataTransfer && e.dataTransfer.setData('pageId', pageId.toString());
        e.dataTransfer && e.dataTransfer.setData('portId', portId.toString());
        e.dataTransfer && e.dataTransfer.setData('viewportId', viewportId.toString());
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '1';

        if (!validateDraggable(e)) return;

        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        if (dragViewportId !== viewportId) {
            set_dragged_to_different_viewport(true);
        }

        addTab(dispatch, portId, dragPortId, dragPageId, index+1);
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // TODO: Better solution for this
        if (tabRef.current)
            tabRef.current.style.opacity = '0.7';
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '1';
    }

    const dragEndHandler = async (e: DragEvent<HTMLDivElement>) => {
        // e.preventDefault();
        // e.stopPropagation();

        setDragging(false);
        cleanupDraggable();
        removeTabHandler();

        const { clientX: x, clientY: y } = e;
        if (outside_window(x, y)) {
            if (!( await get_dragged_to_different_viewport() )) {
                const newViewportId = set_storage_port_from_page_id(pageId);
                open_new_viewport_window(newViewportId);
            }
        }
    }

    const onCloseClickHandler = (e: rMouseEvent) => {
        e.stopPropagation();
        removeTabHandler();
    }

    const removeTabHandler = () => removeTab(dispatch, portId, index);

    return (
        <div ref={tabRef as MutableRefObject<HTMLDivElement> }
            draggable 
            style={tabStyle}
            className={tabClassName}

            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragEnter={dragOverHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}

            onMouseOver={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            onClick={clickHandler}
        >
            <div
                style={styles.tabLabel}
                className={tabLabelClassName}>
                { label }
            </div>
            <div className={_classes.tabCloseContainer}>
                { closeVisible &&
                    <div
                        style={styles.tabClose}
                        className={tabCloseClassName}
                        onClick={onCloseClickHandler}>
                        { "\u2716" }
                    </div>
                }
            </div>
        </div>
    );
};


export default Tab;
