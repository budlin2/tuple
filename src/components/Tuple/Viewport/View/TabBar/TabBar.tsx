import { useContext, Dispatch } from 'react';

import { TupleContext } from '../../..';
import { ID, TupleClassesT, TupleStylesT } from '../../../TupleTypes';
import { ViewportActionT } from '../../ViewportTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';


interface Props {
    portId: ID,
    pageIds: ID[],
    dispatch?: Dispatch<ViewportActionT>
}


const TabBar = ({
    portId,
    pageIds,
    dispatch=()=>{},
}: Props) => {
    const {classes, styles}: {
        classes: TupleClassesT,
        styles: TupleStylesT
    } = useContext(TupleContext);

    const tabBarClassName = `${_classes?.tabBar} ${classes?.tabBar}`;
    
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
                    pageId={pid}
                    dispatch={dispatch}/>
            ))}
        </div>
    );
};


export default TabBar;