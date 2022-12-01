import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    DragEvent,
    useEffect,
} from 'react';

import { TupleContext } from '../../..';
import { cleanupDraggable, setCustomDragImage } from '../../../../Draggable';
import { validateDraggable } from '../../../state';
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
        state:{ pages, classes, styles, viewport },
    }: TupleContextT = useContext(TupleContext);

    useEffect(() => {
        cleanupDraggable();
    }, [cleanupDraggable]);

    const tabRef = useRef<HTMLDivElement>();
    const [closeVisible, setCloseVisible] = useState(false);

    const label = pages[pageId].name;
    const port = viewport.ports[portId];
    const isActiveTab = pageId === port.activePageId;

    const inactiveTabClassName = `${_classes.tab || ''} ${classes.tab || ''}`;
    const activeTabClassName = `${inactiveTabClassName} ${_classes.tabActive || ''} ${classes.tabActive || ''}`;
    const tabClassName = isActiveTab ? activeTabClassName : inactiveTabClassName;

    const tabLabelClassName = `${_classes.tabLabel || ''} ${classes.tabLabel || ''}`;
    const tabCloseClassName = `${_classes.tabClose || ''} ${classes.tabClose || ''}`

    const tabStyle = isActiveTab ? {...styles.tab, ...styles.tabActive} : styles.tab;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);

    const clickHandler = () => changeView(dispatch, portId, pageId);

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        setCloseVisible(false);
        setCustomDragImage(e, label, classes.draggable, styles.draggable);
        e.dataTransfer && e.dataTransfer.setData('pageId', pageId.toString());
        e.dataTransfer && e.dataTransfer.setData('portId', portId.toString());
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '1';

        if (!validateDraggable(e)) return;

        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');

        addTab(dispatch, portId, dragPortId, dragPageId, index+1);
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '0.7';
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '1';
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        // e.preventDefault();
        // e.stopPropagation();

        cleanupDraggable();
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
                        onClick={removeTabHandler}>
                        { "\u2716" }
                    </div>
                }
            </div>
        </div>
    );
};


export default Tab;
