import { ReactNode, useContext } from 'react';

import { TupleContext } from '..';
import { TupleContextT } from '../TupleTypes';
import Port from './Port';
import DefaultView from './View/DefaultView';

import _classes from './viewport.module.css';


export interface Props {
    defaultView?: ReactNode
    // noDuplicates: boolean // TODO: Specify whether duplicates are allowed in viewport
}


const Viewport = ({ defaultView }: Props) => {
    const { state: {
        viewport,
        styles,
        classes,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const viewportClassName = `
        ${_classes?.viewport || ''}
        ${template?.viewport || ''}
        ${classes?.viewport  || ''}`;

    // TODO: Show defaultView
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