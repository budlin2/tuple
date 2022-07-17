import { CSSProperties, ReactNode, useState, useRef, MouseEvent, MutableRefObject } from 'react';

import Leaf from './Leaf';


export interface TabProps {
    label: string,
    view: ReactNode,
    tabStyle?: CSSProperties,
    tabCloseStyle?: CSSProperties,
    mouseDown?: (event: MouseEvent, tab: ReactNode, tabView: ReactNode) => void,
    mouseMove?: (event: MouseEvent, tab: ReactNode, tabView: ReactNode) => void,
    mouseUp?: (event: MouseEvent, tab: ReactNode, tabView: ReactNode) => void,
    mouseEnter?: (event: MouseEvent, tab: ReactNode, tabView: ReactNode) => void,
    mouseLeave?: (event: MouseEvent, tab: ReactNode, tabView: ReactNode) => void,
}


export const Tab = ({
    label,
    view,
    tabStyle,
    tabCloseStyle,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseEnter,
    mouseLeave
}: TabProps) => {
    const tabRef = useRef<HTMLDivElement>();
    return (
        <div
            ref={tabRef as MutableRefObject<HTMLDivElement> }
            style={tabStyle}
            onMouseDown={ e => mouseDown && mouseDown(e, (tabRef as MutableRefObject<ReactNode>).current, view) }
            onMouseMove={ e => mouseMove && mouseMove(e, (tabRef as MutableRefObject<ReactNode>).current, view) }
            onMouseUp={ e => mouseUp && mouseUp(e, (tabRef as MutableRefObject<ReactNode>).current, view) }
            onMouseEnter={ e => mouseEnter && mouseEnter(e, (tabRef as MutableRefObject<ReactNode>).current, view) }
            onMouseLeave={ e => mouseLeave && mouseLeave(e, (tabRef as MutableRefObject<ReactNode>).current, view) }>
            <Leaf style={_styles.leaf} text={label}> { view } </Leaf>
            <div style={tabCloseStyle}> { "\u2716" } </div>
        </div>
    );
};


interface StyleProps {
    tabBar?: CSSProperties,
    tab?: CSSProperties,
    tabClose?: CSSProperties,
}


interface Props {
    tabs: Array<TabProps>,
    styles?: StyleProps,
}


const TabBar = ({
    tabs,
    styles={},
}: Props) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const tabBarStyle = { ..._styles.tabBar, ...styles.tabBar };
    const tabStyle = { ..._styles.tab, ...styles.tab } as CSSProperties;
    const tabCloseStyle = { ..._styles.tabClose, ...styles.tabClose } as CSSProperties;

    return (
        <div style={tabBarStyle}>
            { tabs.map( tab => (
                <Tab
                    tabStyle={tabStyle}
                    tabCloseStyle={tabCloseStyle}
                    label={tab.label}
                    view={tab.view} />
            )) }
        </div>
    );
};


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
        
        // Potentially hacky fix
        paddingRight: '1px',
        paddingBottom: '1px',

        width: `${TAB_CLOSE_SIZE}px`,
        height: `${TAB_CLOSE_SIZE}px`,
        marginRight: `${TAB_CLOSE_MARGIN}px`,
    },
    leaf: {
        paddingRight: `${TOTAL_TAB_CLOSE_WIDTH}px`,
        width: '100%',
        height: '100%'
    }
};


export default TabBar;