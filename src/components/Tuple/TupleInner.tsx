//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { useContext } from 'react';

import Tree from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TupleContextT } from './TupleTypes';

import _classes from './tuple.module.css';
import { get_viewport_id_from_query_params } from './state/browser-actions';


interface TupleInnerProps {
    enableTrashcan: boolean,
}

const TupleInner = ({ enableTrashcan }: TupleInnerProps) => {
    const { state: {
        styles,
        classes,
    }}: TupleContextT = useContext(TupleContext);

    const isRootViewport = get_viewport_id_from_query_params() === '';

    const tupleClassName = `
        ${_classes?.tuple || ''}
        ${classes?.tuple  || ''}`;

    if (!isRootViewport) {
        return <Viewport />;
    }

    return (
        <div className={tupleClassName} style={styles.tuple}>
            <SplitPane resizerPos='25%'>
                <Tree enableTrashcan={enableTrashcan} />
                <Viewport />
            </SplitPane>
        </div>
    );
}


export default TupleInner;