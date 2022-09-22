import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    MouseEvent as rMouseEvent,
    useEffect,
    Dispatch,
} from 'react';

import {
    ID,
    TupleStylesT,
    PagesT,
    TupleClassesT,
} from '../../../types';
import { TupleContext } from '../../Tuple/TupleProvider';
import { ViewActionKind, ViewportActionT } from '../../Viewport/ViewportTypes';
import _classes from '../tabbar.module.css';


export interface TabProps {
    index: number,
    pageId: ID,     // This may serve as a unique identifier for tab as well,
    viewPath: string
    dispatch: Dispatch<ViewportActionT>,
}


export const Tab = ({
    index,
    pageId,
    viewPath,
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

    // TODO: Mouse Events?
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);
    const mouseDownHandler = (e: rMouseEvent) => {};
    const mouseUpHandler = (e: MouseEvent) => {};
    const mouseMoveHandler = (e: MouseEvent) => {};

    // TODO : better typing
    const dragStartHandler = (e: any) => {
        console.log('Drag start!');
        console.log(e.target);

        setCloseVisible(false);
        e.dataTransfer.setData('pid', pageId);
        // setTimeout(() => { e.target.style.display = "none" }, 0);
    };

    const dropHandler = e => {
        e.preventDefault();
        e.stopPropagation();

        // console.log(pages[pageId].name, e);
        if (tabRef.current)
            tabRef.current.style.opacity = '1';

        const pid = e.dataTransfer.getData('pid');
        dispatch({
            type: ViewActionKind.ADD_TAB,
            payload: { pid, path: viewPath, index: index+1 }
        });
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault();
        // e.stopPropagation();

        tabRef.current.style.opacity = '0.5';
    }

    const dragLeaveHandler = e => {
        e.preventDefault();
        // e.stopPropagation();
        tabRef.current.style.opacity = '1';
    }

    return (
        <div ref={tabRef as MutableRefObject<HTMLDivElement> }
            draggable 
            style={styles.tab}
            className={tabClassName}
            onDragStart={dragStartHandler}
            onDragEnter={dragOverHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
            onMouseOver={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <div
                style={styles.tabLabel}
                className={tabLabelClassName}>
                { pages[pageId].name }
            </div>
            <div className={_classes.tabCloseContainer}>
                { closeVisible && <div
                    style={styles.tabClose}
                    className={tabCloseClassName}
                    // TODO : Remove Tab
                    onClick={ () => {} }>
                    { "\u2716" }
                </div>}
            </div>
        </div>
    );
};


export default Tab;
