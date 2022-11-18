import { useContext } from 'react';

import { TupleContext } from '../../..';
import { ID, TupleContextT } from '../../../TupleTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';
import _global_classes from '../../../../styles.module.css';


interface Props {
    portId: ID,
    pageIds: ID[],
}


const TabBar = ({
    portId,
    pageIds,
}: Props) => {
    const {state:{ classes, styles }}: TupleContextT = useContext(TupleContext);
    const tabBarClassName = `${_global_classes.noScrollbar} ${_classes?.tabBar} ${classes?.tabBar}`;
    
    return (
        <div
            className={tabBarClassName}
            style={styles?.tabBar}
        >
            { pageIds.map((pid, i) => (
                <Tab
                    key={pid}
                    portId={portId}
                    index={i}
                    pageId={pid}/>
            ))}
        </div>
    );
};


export default TabBar;