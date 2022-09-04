import { ReactNode, useContext } from 'react';

import { SplitViewT, TupleClassesT, TupleStylesT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';
import Port from './Port';

import _classes from './views.module.css';

export interface Props {
    views: SplitViewT | null,
    defaultView: ReactNode,  // TODO: Also allow ViewT
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

    // TODO : Show defaultView
    if (!views)
        return (
            <>No Views. SAD!</>
        );

    return (
        <div className={viewportClassName} style={styles.viewport}>
            <Port view={views as SplitViewT} />
        </div>
    );
};


export default Viewport;