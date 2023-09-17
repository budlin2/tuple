import { useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { STORAGE_ID } from '../state/browser-actions';
import { StoragePorts, TupleContextT } from '../TupleTypes';
import { default as Taproot } from './Branch'
import Rootlet from './Rootlet';

import _classes from './tree.module.css';
import { RootletDisplayT } from './TreeTypes';


export interface Props {
    rootName: string,
}

// Really stretching the tree analogy here, but (Root -> Taproot -> Rootlet)
// is equivalent to (Tree -> Branch -> Leaf)
const Root = ({
    rootName,
}: Props) => {
    const { state: {
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const rootClassName = `
        ${_classes?.root || ''}
        ${classes?.root  || ''}`;


    const rootletsClassName = `
        ${_classes?.rootlets || ''}
        ${classes?.rootlets  || ''}`;

    const getRootlets = (): RootletDisplayT[] => {
        //TODO: Implement local storage fetching
        const [rootlets, _] = useLocalStorage<StoragePorts>(STORAGE_ID, null);
        if (rootlets) {
            return Object.entries(rootlets).map(([key, value]) => ({
                id: key,
                text: key as string,
                open: value.open as boolean,
            }));
        }
        return [];
    }

    let rootlets = getRootlets();
    rootlets = rootlets.filter((r: RootletDisplayT) => r.text !== 'root');

    return (
        <Taproot id={1}
            path={[]}
            text={rootName}
            branchClassName={rootClassName}
            branchesClassName={rootletsClassName}
            branchStyle={styles.rootlets}
            branchesStyle={styles.rootlets}
        >
            { rootlets.map( r => (
                <Rootlet key={r.id} text={r.text} open={r.open} />
            ))}
        </Taproot>
    );
}


export default Root;