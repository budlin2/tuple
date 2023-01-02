import { useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { StoragePorts, TupleContextT } from '../TupleTypes';
import { default as Taproot } from './Branch'
import Rootlet from './Rootlet';

import _classes from './tree.module.css';
import { RootletDisplayT } from './TreeTypes';


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

    const getRootlets = (): RootletDisplayT[] => {
        //TODO: Implement local storage fetching
        const [rootlets, _] = useLocalStorage<StoragePorts>('ports', null);
        if (rootlets) {
            return Object.entries(rootlets).map(rootlet => ({
                text: rootlet[0] as string,
                open: rootlet[1].open as boolean,
            }));
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
                <Rootlet text={r.text} treeId={r.text} open={r.open} />
            ))}
        </Taproot>
    );
}


export default Root;