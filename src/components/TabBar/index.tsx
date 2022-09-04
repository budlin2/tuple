import { CSSProperties, useState, useContext } from 'react';

import { ID, TupleStylesT, TupleClassesT, PagesT, SplitViewT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';
import Tab, { TabProps } from './Tab';

import _classes from './tabs.module.css';


export interface StyleProps {
    tabBar?: CSSProperties,
    tab?: CSSProperties,
    tabClose?: CSSProperties,
}


interface Props {
    tabs: TabProps[],
    styles?: StyleProps,
}


const TabBar = ({
    tabs,
}: Props) => {
    const [_tabs, setTabs] = useState(tabs);
    const {classes, styles}: {classes: TupleClassesT, styles: TupleStylesT} = useContext(TupleContext);
    const tabBarClassName = `${_classes?.tabBar} ${classes?. tabBar}`;
    const {pages}: {
        pages: PagesT,
        views: SplitViewT | null,
    } = useContext(TupleContext);

    const removeTab = (id: ID) => setTabs(tbs => tbs.filter(tab => tab.id !== id ));

    return (
        <div className={tabBarClassName} style={styles?.tabBar}>
            { _tabs.map( tab => (
                <Tab pageId={tab.pageId} removeTab={removeTab}/>
            ))}
        </div>
    );
};


export default TabBar;