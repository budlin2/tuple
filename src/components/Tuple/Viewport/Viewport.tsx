import { ReactNode, useContext } from 'react';

import { TupleContext } from '..';
import { TupleContextT } from '../TupleTypes';
import Port from './Port';
import DefaultView from './View/DefaultView';

import _classes from './viewport.module.css';


export interface Props {
    // noDuplicates: boolean // TODO: Specify whether duplicates are allowed in viewport
}


const Viewport = () => {
    const { state: {
        viewport,
        styles,
        classes,
    }}: TupleContextT = useContext(TupleContext);

    const viewportClassName = `
        ${_classes?.viewport || ''}
        ${classes?.viewport  || ''}`;

    // TODO: Custom Default Views?
    if (viewport.root == '') {
        return <DefaultView />
    }

    return (
        <div className={viewportClassName} style={styles.viewport}>
            <Port id={viewport.root} />
        </div>
    );
};


export default Viewport;