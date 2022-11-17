//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { useState, useContext } from 'react';

import Tree from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TupleContextT } from './TupleTypes';

import _classes from './tuple.module.css';


const TupleInner = () => {
    const {state:{ styles, classes }}: TupleContextT = useContext(TupleContext);
    const tupleClassName = `${_classes?.tuple} ${classes?.tuple}`;

    // TODO: This needs to be better
    const DefaultView = <>No Views. SAD!</>

    return (
        <div className={tupleClassName} style={styles.tuple}>
            <SplitPane resizerPos='25%'>
                <Tree />
                <Viewport defaultView={DefaultView} />
            </SplitPane>
        </div>
    );
}


export default TupleInner;