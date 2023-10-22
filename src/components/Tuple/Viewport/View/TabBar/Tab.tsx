import {
    useState,
    useRef,
    useContext,
    useEffect,
    DragEvent as rDragEvent,
    MouseEvent as rMouseEvent,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '../../..';
import {
    cleanupDraggable,
    outsideWindow,
    setCustomDragImage,
    validateDraggable
} from '../../../../Draggable';
import {
    DRAGGING_ID,
    get_dragged_to_different_viewport,
    open_new_viewport_window,
    set_dragged_to_different_viewport,
    set_storage_port_from_page_id,
} from '../../../state/browser-actions';
import * as actions from '../../../state/dispatchers';
import { ID, TupleContextT } from '../../../TupleTypes';

import _classes from './tabbar.module.css';
import { classNames } from '../../../../../utils';


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
    const tabRef = useRef<HTMLDivElement>();

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const {
        dispatch,
        state:{
            pages,
            classes,
            styles,
            viewport,
            viewportId
        },
    }: TupleContextT = useContext(TupleContext);

    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);
    // TODO: Working here...
    const [hovering, setHovering] = useState(false);
    const [tabCloseHovering, setTabCloseHovering] = useState(false);
    const [draggingOver, setDraggingOver] = useState(false);

    const label = pages[pageId]?.name || '';
    const port = viewport.ports[portId];
    const isActiveTab = pageId === port.activePageId;

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        cleanupDraggable();
    }, [cleanupDraggable]);

    // Note: Unfortunate, but much of Tuple's CSS relies on tab height.
    //       This is a hack in case the user changes it in their custom CSS.
    useEffect(() => {
        const rootCSS = document.querySelector(':root') as HTMLDivElement;
        const tabbarHeight = tabRef.current?.clientHeight;
        rootCSS.style.setProperty('--TAB-HEIGHT', `${tabbarHeight.toString()}px`);
    }, [tabRef]);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const tabClassName = classNames(
        _classes?.tab_base,
        classes?.tab_base,
        isActiveTab && _classes?.tab_active,
        isActiveTab && classes?.tab_active,
        hovering && _classes?.tab_hover,
        hovering && classes?.tab_hover,
        draggingOver && _classes?.tab_dragOver,
        draggingOver && classes?.tab_dragOver,
    );

    const tabLabelClassName = classNames(_classes?.tabLabel, classes?.tabLabel);

    const tabCloseClassName = classNames(
        _classes?.tabClose_base,
        classes?.tabClose_base,
        tabCloseHovering && _classes.tabClose_hover,
        tabCloseHovering && classes.tabClose_hover,
    );

    const draggableClass = classes?.draggable || '';

    const tabStyle = {
        ...styles?.tab?.base,
        ...(isActiveTab && styles?.tab?.active)
    }

    const tabCloseStyle = {
        ...styles?.tabClose?.base,
        ...(tabCloseHovering && styles?.tabClose?.hover)
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setHovering(true);
    const mouseLeaveHandler = () => setHovering(false);

    const clickHandler = () => actions.changeView(dispatch, portId, pageId);

    const dragStartHandler = (e: rDragEvent<HTMLDivElement>) => {
        setHovering(false);
        setCustomDragImage(e, label, draggableClass, styles.draggable);
        setDragging(true);

        e.dataTransfer && e.dataTransfer.setData('pageId', pageId.toString());
        e.dataTransfer && e.dataTransfer.setData('portId', portId.toString());
        e.dataTransfer && e.dataTransfer.setData('viewportId', viewportId.toString());
    };

    const dropHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDraggingOver(false);

        if (!validateDraggable(e)) return;

        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        if (dragViewportId !== viewportId)
            set_dragged_to_different_viewport(true);

        actions.addTab(dispatch, portId, dragPortId, dragPageId, index);
    }

    const dragOverHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggingOver(true);
    }

    const dragLeaveHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggingOver(false);
    }

    const dragEndHandler = async (e: rDragEvent<HTMLDivElement>) => {
        setDragging(false);
        cleanupDraggable();
        removeTabHandler();

        const { clientX: x, clientY: y } = e;
        if (outsideWindow(x, y)) {
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

    const removeTabHandler = () => actions.removeTab(dispatch, portId, index);

    // Tab Close Event Handlers
    const onTabCloseMouseOver = () => setTabCloseHovering(true);
    const onTabCloseMouseLeave = () => setTabCloseHovering(false);


    return (
        <div draggable ref={ tabRef }
            style           ={ tabStyle }
            className       ={ tabClassName }

            onDragStart     ={ dragStartHandler }
            onDragEnd       ={ dragEndHandler }
            onDragEnter     ={ dragOverHandler }
            onDragOver      ={ dragOverHandler }
            onDragLeave     ={ dragLeaveHandler }
            onDrop          ={ dropHandler }

            onMouseOver     ={ mouseEnterHandler }
            onMouseLeave    ={ mouseLeaveHandler }
            onMouseDown     ={ clickHandler }
        >
            <div style={ styles.tabLabel } className={ tabLabelClassName }>
                { label }
            </div>

            <div className={ _classes.tabCloseContainer }>
                { hovering && (
                    <div
                        style       ={ tabCloseStyle }
                        className   ={ tabCloseClassName }
                        onClick     ={ onCloseClickHandler }
                        onMouseOver ={ onTabCloseMouseOver }
                        onMouseLeave={ onTabCloseMouseLeave }
                    >
                        { "\u2716" }
                    </div>
                )}
            </div>
        </div>
    );
};


export default Tab;
