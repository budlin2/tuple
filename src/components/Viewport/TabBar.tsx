import {
    CSSProperties,
    ReactNode,
    useState,
    useRef,
    MouseEvent as rMouseEvent,
    MutableRefObject,
    useContext,
} from 'react';

import Leaf from '../Tree/Leaf';
import { ID, DragEvent, TupleStylesT } from '../../types';
import { TupleContext } from '../Tuple';
import Tab, { TabProps } from './Tab';


export interface StyleProps {
    tabBar?: CSSProperties,
    tab?: CSSProperties,
    tabClose?: CSSProperties,
}


interface Props {
    tabs: TabProps[],
    styles?: StyleProps,
    createDraggable?: DragEvent
}


const TabBar = ({
    tabs,
    createDraggable=() => {},
}: Props) => {
    const [_tabs, setTabs] = useState(tabs);
    const {styles}: {styles: TupleStylesT} = useContext(TupleContext);
    const tabBarStyle = { ..._styles.tabBar, ...styles.tabBar };
    const tabStyle = { ..._styles.tab, ...styles.tab } as CSSProperties;
    const tabCloseStyle = { ..._styles.tabClose, ...styles.tabClose } as CSSProperties;

    const removeTab = (id: ID) => setTabs(tbs => tbs.filter(tab => tab.id !== id ));

    return (
        <div style={tabBarStyle}>
            { _tabs.map( tab => (
                <Tab
                    id={tab.id}
                    tabStyle={tabStyle}
                    tabCloseStyle={tabCloseStyle}
                    label={tab.label}
                    view={tab.view}
                    removeTab={removeTab}
                    createDraggable={createDraggable}/>
            )) }
        </div>
    );
};


// TODO : Clean this up
const TAB_CLOSE_SIZE = 20;
const TAB_CLOSE_MARGIN = 4;
const TOTAL_TAB_CLOSE_WIDTH = TAB_CLOSE_SIZE + (TAB_CLOSE_MARGIN * 2);
const _styles = {
    tabBar: {
        display: 'flex',
        width: '100%',
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: `${TAB_CLOSE_MARGIN * 2}px`,
        borderRight: '1px solid black',
        paddingTop: `${TAB_CLOSE_MARGIN}px`,
        paddingBottom: `${TAB_CLOSE_MARGIN}px`,
    },
    tabClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        borderRadius: '5px',
        right: 0,

        width: `${TAB_CLOSE_SIZE}px`,
        height: `${TAB_CLOSE_SIZE}px`,
        marginRight: `${TAB_CLOSE_MARGIN}px`,
    },
    // TODO : This needs to go... no leaves in here
    leaf: {
        paddingRight: `${TOTAL_TAB_CLOSE_WIDTH}px`,
        width: '100%',
        height: '100%'
    }
};


export default TabBar;