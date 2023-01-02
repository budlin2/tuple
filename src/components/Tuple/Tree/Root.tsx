import { useContext } from 'react';
import { TupleContext } from '..';
import { get_storage_ports } from '../state/browser-actions';
import { TupleContextT } from '../TupleTypes';
import { default as Taproot } from './Branch'
import Rootlet from './Rootlet';

import _classes from './tree.module.css';


export interface Props {
    rootName: string,
}


const Root = ({
    rootName,
}: Props) => {
    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const rootClassName = `
        ${_classes?.root || ''}
        ${template?.root || ''}
        ${classes?.root  || ''}`;


    const rootletsClassName = `
        ${_classes?.rootlets || ''}
        ${template?.rootlets || ''}
        ${classes?.rootlets  || ''}`;

    const getRootlets = (): string[] => {
        //TODO: Implement local storage fetching
        const rootlets = get_storage_ports();
        if (rootlets) {
            return Object.keys(rootlets);
        }
        return [];
    }

    const rootlets = getRootlets();

    return (
        <Taproot text={rootName}
            branchClassName={rootClassName}
            branchesClassName={rootletsClassName}
            branchStyle={styles.rootlets}
            branchesStyle={styles.rootlets}
        >
            { rootlets.map( r => (
                <Rootlet text={r} treeId={r} open={true} />
            ))}
        </Taproot>
    );
}


export default Root;