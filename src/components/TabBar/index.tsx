import { useEffect, useState, useContext, Dispatch } from 'react';

import { ID, TupleStylesT, TupleClassesT, PagesT, SplitViewT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';
import { ViewportActionT } from '../Viewport/ViewportTypes';
import Tab, { TabProps } from './Tab';

import _classes from './tabs.module.css';


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
        TabBar/
                etc...
        View/
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
    viewPath: string,
    dispatch: Dispatch<ViewportActionT>
}


const TabBar = ({
    pids,
    viewPath,
    dispatch,
}: Props) => {
    const [pageIds, setPageIds] = useState(pids);
    const {pages, classes, styles}: {
        pages: PagesT,
        classes: TupleClassesT,
        styles: TupleStylesT
    } = useContext(TupleContext);

    const tabBarClassName = `${_classes?.tabBar} ${classes?.tabBar}`;

    useEffect(() => {
        console.log(pageIds);
    }, [pageIds])

    return (
        <div
            className={tabBarClassName}
            style={styles?.tabBar}
        >
            { pageIds.map(
                (pid, i) => <Tab
                    index={i}
                    pageId={pid}
                    viewPath={viewPath}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
};


export default TabBar;