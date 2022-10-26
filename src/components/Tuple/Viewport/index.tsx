import { ReactNode, useContext } from 'react';

import { SplitViewT, TupleClassesT, TupleStylesT, ViewportT, ViewT } from '../../../types';
import { TupleContext } from '../TupleProvider';
import Port from './Port';

import _classes from './viewport.module.css';

export interface Props {
    views: ViewportT | null,
    defaultView: ReactNode
    // noDuplicates: boolean // TODO: Specify whether duplicates are allowed in viewport
}


const Viewport = ({
    views,
    defaultView,
}: Props) => {
    const {styles, classes}: {
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const viewportClassName = `${_classes.viewport} ${classes.viewport}`;

    // TODO: Show defaultView
    if (!views)
        return <>No Views. SAD!</>

    return (
        <div className={viewportClassName} style={styles.viewport}>
            <Port viewport={views as SplitViewT} />
        </div>
    );
};


export default Viewport;