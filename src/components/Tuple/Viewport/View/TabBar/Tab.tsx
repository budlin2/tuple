import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    DragEvent,
} from 'react';

import { TupleContext } from '../../..';
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
        state:{ pages, classes, styles },
    }: TupleContextT = useContext(TupleContext);

    const tabRef = useRef<HTMLDivElement>();
    const [closeVisible, setCloseVisible] = useState(false);

    const tabClassName = `${_classes.tab} ${classes.tab || ''}`;
    const tabLabelClassName: string = `${_classes.tabLabel} ${classes.tabLabel || ''}`;
    const tabCloseClassName: string = `${_classes.tabClose} ${classes.tabClose || ''}`;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);

    const clickHandler = () => changeView(dispatch, portId, pageId);

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        setCloseVisible(false);
        // TODO: Local storage events somewhere else... and send as JSON...
        // [ e.dataTransfer.setData("text/plain", JSON.stringify(data)); ]
        e.dataTransfer && e.dataTransfer.setData('pageId', pageId.toString());
        e.dataTransfer && e.dataTransfer.setData('portId', portId.toString());
        // e.dataTransfer && e.dataTransfer.setData('index', index.toString());
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current)
            tabRef.current.style.opacity = '1';

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

    const removeTabHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        removeTab(dispatch, portId, index);
    };

    return (
        <div ref={tabRef as MutableRefObject<HTMLDivElement> }
            draggable 
            style={styles.tab}
            className={tabClassName}

            onDragStart={dragStartHandler}
            onDragEnd={removeTabHandler}
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
                { pages[pageId].name }
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
