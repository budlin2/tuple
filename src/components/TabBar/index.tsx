import { CSSProperties, useState, useContext } from 'react';

import { ID, TupleStylesT, TupleClassesT, PagesT, SplitViewT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';
import Tab, { TabProps } from './Tab';

import _classes from './tabs.module.css';


interface Props {
    tabs: TabProps[],
}


const TabBar = ({
    tabs,
}: Props) => {
    const [_tabs, setTabs] = useState(tabs);
    const {classes, styles}: {classes: TupleClassesT, styles: TupleStylesT} = useContext(TupleContext);
    const tabBarClassName = `${_classes?.tabBar} ${classes?.tabBar}`;

    const removeTab = (pid: ID) => setTabs(tbs => tbs.filter(tab => tab.pageId !== pid ));

    return (
        <div className={tabBarClassName} style={styles?.tabBar}>
            { _tabs.map( tab => (
                <Tab pageId={tab.pageId} removeTab={removeTab}/>
            ))}
        </div>
    );
};


export default TabBar;