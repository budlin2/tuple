import {
    useState,
    useRef,
    MutableRefObject,
    useContext,
    MouseEvent as rMouseEvent,
} from 'react';

import { ID, TupleStylesT, PagesT, TupleClassesT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';
import _classes from './tabs.module.css';


export interface TabProps {
    pageId: ID,     // This may serve as a unique identifier for tab as well
    removeTab?: (id: ID) => void,
}


export const Tab = ({
    pageId,
    removeTab,
}: TabProps) => {
    const tabRef = useRef<HTMLDivElement>();
    const [closeVisible, setCloseVisible] = useState(false);
    const { pages, classes, styles }: {
        pages: PagesT,
        classes: TupleClassesT,
        styles: TupleStylesT,
    } = useContext(TupleContext);

    const tabClassName: string = `${_classes.tab} ${classes.tab}`;
    const tabLabelClassName: string = `${_classes.tabLabel} ${classes.tabLabel}`;
    const tabCloseClassName: string = `${_classes.tabClose} ${classes.tabClose}`;

    // TODO : May need this to mask text that's flowing too far to right
    // const tabRightFadeStyle = {
    //     background: `linear-gradient(0.25turn, transparent, ${ tabLabelStyle.backgroundColor || tabLabelStyle.background })`},
    // }

    // TODO: Mouse Events?
    const mouseEnterHandler = () => setCloseVisible(true);
    const mouseLeaveHandler = () => setCloseVisible(false);
    const mouseDownHandler = (e: rMouseEvent) => {};
    const mouseUpHandler = (e: MouseEvent) => {};
    const mouseMoveHandler = (e: MouseEvent) => {};

    return (
        <div ref={tabRef as MutableRefObject<HTMLDivElement> }
            style={styles.tab}
            draggable
            className={tabClassName}
            onMouseEnter={ mouseEnterHandler }
            onMouseLeave={ mouseLeaveHandler }
        >
            <div
                style={styles.tabLabel}
                className={tabLabelClassName}>
                { pages[pageId].name }
            </div>

            { closeVisible &&
                <div
                    style={styles.tabClose}
                    className={tabCloseClassName}
                    onClick={ removeTab && (() => removeTab(pageId)) }>
                    { "\u2716" }
                </div>
            }
        </div>
    );
};


export default Tab;
