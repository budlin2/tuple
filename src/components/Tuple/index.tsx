import { useState, useContext } from 'react';

import Tree from './Tree';
import Viewport from './Viewport';
import SplitPane from '../SplitPane';
import {
    SplitViewT,
    PagesT,
    TreeT,
    TupleStylesT,
    TupleClassesT,
    ViewportT,
} from '../../types';
import { TupleContext } from './TupleProvider';
import _classes from './tuple.module.css';


export interface Props {
    tree: TreeT,
}

// TODO: Prop for 'deleteDuplicateView' where if true, DFS or BFS searches
// and removes element if already in tree
const Tuple = ({ tree }: Props) => {
    const {views, styles, classes}: {
        views: ViewportT | null,
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const [_views, setViews] = useState(views)
    const tupleClassName = `${_classes?.tuple} ${classes?.tuple}`;

    // TODO... this needs to be better
    const DefaultView = <>No Views. SAD!</>

    return (
        <div className={tupleClassName} style={styles.tuple}>
            <SplitPane resizerPos='25%'>
                <Tree tree={tree} />
                <Viewport views={views} defaultView={DefaultView} />
            </SplitPane>
        </div>
    );
}


export default Tuple;