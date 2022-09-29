import { useEffect, useState, useContext, Dispatch } from 'react';

import { ID, TupleStylesT, TupleClassesT, PagesT } from '../../../../../types';
import { TupleContext } from '../../../TupleProvider';
import { ViewportActionT } from '../../ViewportTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';


// TODO: Move TabBar inside of Viewport directory..
// They're way too tightly coupled to live on their own
/*

Should go:

Viewport/
    TabBar/
        etc...
    View/
        etc...
    index.tsx
    Port.tsx
    etc...

And this eventually:

Tuple/
    Tree/
        Branch/
            etc...
        Leaf/
            etc...
        index.tsx
        etc...
    Viewport/
        View/
            TabBar/
            etc...
        ViewLanding/    <--- New component to act aw landing area for views
            etc...
        index.tsx
        Port.tsx
        etc...
    index.tsx
    etc...
Splitpane/          <--- LOL This is the only remaining component that's not totally coupled to every other component...
    index.tsx
    etc...
FourCorners/        <--- Easy win. Finish Tuple first... This is just another good component to add

*/


interface Props {
    pids: ID[],
    path: string,
    dispatch: Dispatch<ViewportActionT>
}


const TabBar = ({
    pids,
    path,
    dispatch,
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
            { pids.map(
                (pid, i) => <Tab
                    index={i}
                    pageId={pid}
                    path={path}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
};


export default TabBar;