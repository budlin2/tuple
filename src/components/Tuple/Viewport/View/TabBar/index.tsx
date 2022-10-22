import { useEffect, useState, useContext, Dispatch } from 'react';

import { ID, TupleStylesT, TupleClassesT, PagesT } from '../../../../../types';
import { TupleContext } from '../../../TupleProvider';
import { ViewportActionT } from '../../ViewportTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';


interface Props {
    pids: ID[],
    dispatch?: Dispatch<ViewportActionT>
}


const TabBar = ({
    pids,
    dispatch=()=>{},
}: Props) => {
    const {classes, styles}: {
        classes: TupleClassesT,
        styles: TupleStylesT
    } = useContext(TupleContext);

    const tabBarClassName = `${_classes?.tabBar} ${classes?.tabBar}`;

    // TODO : Dispatch action to remove view

    return (
        <div
            className={tabBarClassName}
            style={styles?.tabBar}
        >
            { pids.map((pid, i) => (
                <Tab
                    key={pid}
                    index={i}
                    pageId={pid}
                    dispatch={dispatch}/>
            ))}
        </div>
    );
};


export default TabBar;