//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { ReactElement, useContext } from 'react';

import Tree, { TreeProps } from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TupleContextT } from './TupleTypes';
import { get_viewport_id_from_query_params } from './state/browser-actions';

import _classes from './tuple.module.css';


interface TupleInnerProps {
    enableTrashcan: boolean,
    children?: ReactElement<TreeProps>,
}

const TupleInner = ({ enableTrashcan, children=null }: TupleInnerProps) => {
    const { state: {
        tree,
        styles,
        classes,
    }}: TupleContextT = useContext(TupleContext);

    const isRootViewport = get_viewport_id_from_query_params() === '';

    const tupleClassName = `
        ${_classes?.tuple || ''}
        ${classes?.tuple  || ''}`;

    if (!isRootViewport)
        return <Viewport />;

    return (
        <div className={tupleClassName} style={styles.tuple}>
            <SplitPane resizerPos='25%'>
                { children || (
                    <Tree tree={tree} enableTrashcan={ enableTrashcan } />
                )}
                <Viewport />
            </SplitPane>
        </div>
    );
}


export default TupleInner;