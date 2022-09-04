import {
    CSSProperties,
    useState,
    useRef,
    MutableRefObject,
    useContext,
    MouseEvent as rMouseEvent,
} from 'react';

import { ID, TupleStylesT, PagesT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';


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
    const {styles}: {styles: TupleStylesT} = useContext(TupleContext);
    const {pages}: { pages: PagesT } = useContext(TupleContext);

    const tabStyle = { ..._styles?.tab, ...styles?.tab } as CSSProperties;
    const tabLabelStyle = { ..._styles?.tabLabel, ...styles?.tabLabel } as CSSProperties;
    const tabCloseStyle = { ..._styles?.tabClose, ...styles?.tabClose } as CSSProperties;
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
        <div
            draggable
            ref={tabRef as MutableRefObject<HTMLDivElement> }
            style={tabStyle}
            onMouseEnter={ mouseEnterHandler }
            onMouseLeave={ mouseLeaveHandler }>

            <div style={tabLabelStyle}> { pages[pageId].name } </div>

            { closeVisible &&
                <div
                    style={tabCloseStyle}
                    onClick={ removeTab && (() => removeTab(pageId)) }>
                    { "\u2716" }
                </div>
            }
        </div>
    );
};


// TODO : Working here.. need to move these to tabs.module.css
const _styles = {
    tab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceBetween',

        paddingLeft: '4px',
        paddingRight: '4px',
        minWidth: '60px',  // TODO: rem or em
        height: '30px',
        position: 'relative',
        borderRight: '1px solid black',
    },
    tabLabel: {
        display: 'flex',
    },
    tabClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: '5px',
        right: 0,
    },
};


export default Tab;
