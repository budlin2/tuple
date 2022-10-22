import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    MouseEvent as rMouseEvent,
    Dispatch,
    DragEvent,
} from 'react';

import {
    ID,
    TupleStylesT,
    PagesT,
    TupleClassesT,
} from '../../../../../types';
import { TupleContext } from '../../../TupleProvider';
import { AddTabActionT, AddTabPayloadT, ChangeActiveViewActionT, RemoveTabActionT, ViewActionKind, ViewportActionT } from '../../ViewportTypes';
import _classes from './tabbar.module.css';


export interface TabProps {
    index: number,
    pageId: ID,     // This may serve as a unique identifier for tab as well,
    dispatch: Dispatch<ViewportActionT>,
}


export const Tab = ({
    index,
    pageId,
    dispatch,
}: TabProps) => {
    const tabRef = useRef<HTMLDivElement>();
    const [closeVisible, setCloseVisible] = useState(false);
    const { pages, classes, styles }: {
        pages: PagesT,
        classes: TupleClassesT,
        styles: TupleStylesT,
    } = useContext(TupleContext);
    const tabClassName = `${_classes.tab} ${classes.tab || ''}`;
    const tabLabelClassName: string = `${_classes.tabLabel} ${classes.tabLabel || ''}`;
    const tabCloseClassName: string = `${_classes.tabClose} ${classes.tabClose || ''}`;

    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);

    const clickHandler = () => {
        const changeActiveViewAction: ChangeActiveViewActionT = {
            type: ViewActionKind.CHANGE_ACTIVE_VIEW,
            payload: { pid: pageId }
        };

        dispatch(changeActiveViewAction);
    };

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        setCloseVisible(false);
        // TODO: Local storage events somewhere else... and/or send as JSON...
        // [ e.dataTransfer.setData("text/plain", JSON.stringify(data)); ]
        // ...so I can create a typed data object
        e.dataTransfer && e.dataTransfer.setData('pid', pageId.toString());
        e.dataTransfer && e.dataTransfer.setData('index', index.toString());
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (tabRef.current) {
            tabRef.current.style.opacity = '1';
        }

        const dragPid = e.dataTransfer && e.dataTransfer.getData('pid');

        const addTabAction: AddTabActionT = {
            type: ViewActionKind.ADD_TAB,
            payload: { pid: dragPid as ID, index: index+1 },
        };

        // TODO : update local storage

        dispatch(addTabAction);
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // TODO: Better solution for this
        if (tabRef.current) tabRef.current.style.opacity = '0.5';
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // TODO: Better solution for this
        if (tabRef.current) tabRef.current.style.opacity = '1';
    }

    const removeTabHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const removeTabAction: RemoveTabActionT = {
            type: ViewActionKind.REMOVE_TAB,
            payload: { index }
        };

        dispatch(removeTabAction);
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
