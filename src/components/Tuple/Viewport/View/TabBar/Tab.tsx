import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    Dispatch,
    DragEvent,
} from 'react';

import { TupleContext } from '../../..';
import { ID, PagesT, TupleClassesT, TupleStylesT } from '../../../TupleTypes';
import {
    AddTabActionT,
    ChangeActiveViewActionT,
    RemoveTabActionT,
    ViewActionKind,
    ViewportActionT
} from '../../ViewportTypes';

import _classes from './tabbar.module.css';


export interface TabProps {
    portId: ID,
    index: number,
    pageId: ID,     // This may serve as a unique identifier for tab as well,
    dispatch: Dispatch<ViewportActionT>,
}


export const Tab = ({
    portId,
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

    //------------------------------------------------------------------------------------------------------------------
    // Actions Dispatchers
    //------------------------------------------------------------------------------------------------------------------
    const changeView = () => {
        const changeActiveViewAction: ChangeActiveViewActionT = {
            type: ViewActionKind.CHANGE_ACTIVE_VIEW,
            payload: { portId, pageId }
        };

        dispatch(changeActiveViewAction); 
    }

    const addTab = (dragPageId: ID) => {
        const addTabAction: AddTabActionT = {
            type: ViewActionKind.ADD_TAB,
            payload: { portId, pageId: dragPageId, index: index+1 },
        };

        // TODO: update local storage

        dispatch(addTabAction);
    }

    const removeTab = () => {
        const removeTabAction: RemoveTabActionT = {
            type: ViewActionKind.REMOVE_TAB,
            payload: { portId, index }
        };

        dispatch(removeTabAction);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);

    const clickHandler = () => changeView();

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

        if (dragPortId !== portId) {
            addTab(dragPageId);
        }
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
        removeTab();
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
