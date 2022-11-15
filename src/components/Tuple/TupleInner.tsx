//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { useState, useContext } from 'react';

import Tree from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TreeT } from './Tree/TreeTypes';
import { ViewportT } from './Viewport/ViewportTypes';
import { TupleClassesT, TupleStylesT } from './TupleTypes';

import _classes from './tuple.module.css';


const TupleInner = () => {
    const {views, tree, styles, classes}: {
        views: ViewportT | null,
        tree: TreeT,
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const tupleClassName = `${_classes?.tuple} ${classes?.tuple}`;

    // TODO: This needs to be better
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


export default TupleInner;