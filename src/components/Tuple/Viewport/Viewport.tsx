import { ReactNode, useContext } from 'react';

import { TupleContext } from '..';
import { TupleContextT } from '../TupleTypes';
import Port from './Port';

import _classes from './viewport.module.css';


export interface Props {
    defaultView?: ReactNode
    // noDuplicates: boolean // TODO: Specify whether duplicates are allowed in viewport
}


const Viewport = ({ defaultView }: Props) => {
    const { state: {
        views,
        styles,
        classes
    }}: TupleContextT = useContext(TupleContext);

    const viewportClassName = `${_classes.viewport} ${classes.viewport}`;

    // TODO: Show defaultView
    if (views.root == null) {
        return <>No Views. SAD!</>
    }

    return (
        <div className={viewportClassName} style={styles.viewport}>
            <Port id={views.root} />
        </div>
    );
};


export default Viewport;