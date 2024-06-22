//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { ReactElement, useContext, useEffect } from 'react';

import Tree, { TreeProps } from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TupleContextT } from './TupleTypes';
import { get_viewport_id_from_query_params } from './state/browser-actions';
import { classNames } from '../../utils';


import _classes from './tuple.module.css';
import MobileView from '../MobileView';


interface TupleInnerProps {
    enableTrashcan: boolean,
    children?: ReactElement<TreeProps>,
}

const TupleInner = ({ enableTrashcan, children=null }: TupleInnerProps) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        tree,
        styles,
        classes,
        darkMode,
        isMobile,
    }}: TupleContextT = useContext(TupleContext);

    const isRootViewport = get_viewport_id_from_query_params() === '';

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const tupleClassName = classNames(
        _classes?.tuple,
        classes?.tuple,
    );


    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (darkMode) {
            const doc = document.documentElement;
            const root = getComputedStyle(doc);

            const colorPrimary1 = root.getPropertyValue('--COLOR-PRIMARY-1');
            const colorPrimary2 = root.getPropertyValue('--COLOR-PRIMARY-2');
            const colorPrimary3 = root.getPropertyValue('--COLOR-PRIMARY-3');

            const colorSecondary1 = root.getPropertyValue('--COLOR-SECONDARY-1');
            const colorSecondary2 = root.getPropertyValue('--COLOR-SECONDARY-2');
            const colorSecondary3 = root.getPropertyValue('--COLOR-SECONDARY-3');

            doc.style.setProperty('--COLOR-PRIMARY-1', colorSecondary1);
            doc.style.setProperty('--COLOR-PRIMARY-2', colorSecondary2);
            doc.style.setProperty('--COLOR-PRIMARY-3', colorSecondary3);

            doc.style.setProperty('--COLOR-SECONDARY-1', colorPrimary1);
            doc.style.setProperty('--COLOR-SECONDARY-2', colorPrimary2);
            doc.style.setProperty('--COLOR-SECONDARY-3', colorPrimary3);
        }
    }, [darkMode]);

    if (!isRootViewport)
        return <Viewport />;

    return (
        <div className={ tupleClassName } style={ styles.tuple }>
            { !isMobile
            ? (
                <SplitPane resizerPos='25%'>
                    { children || (
                        <Tree tree={ tree } enableTrashcan={ enableTrashcan } />
                    )}
                    <Viewport />
                </SplitPane>
            )
            : (
                <MobileView>
                    <Viewport />
                    { children || (
                        <Tree tree={ tree } enableTrashcan={ enableTrashcan } />
                    )}
                </MobileView>
            )}
        </div>
    );
}

export default TupleInner;
