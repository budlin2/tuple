import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { STORAGE_ID } from '../state/browser-actions';
import { ID, StoragePorts, TupleContextT } from '../TupleTypes';
import { default as Taproot } from './Branch'
import Rootlet from './Rootlet';

import _classes from './tree.module.css';
import { PopupDetailsT, RootletDisplayT } from './TreeTypes';
import { classNames } from '../../../utils';


export interface Props {
    rootName:           string,
    setPopupDetails:    (details: PopupDetailsT) => void,
}

// Really stretching the tree analogy here, but (Root -> Taproot -> Rootlet)
// is equivalent to (Tree -> Branch -> Leaf)
const Root = ({
    rootName,
    setPopupDetails,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const [storagePorts, setStoragePorts] = useLocalStorage<StoragePorts>(STORAGE_ID, null);
    const [rootlets, setRootlets] = useState<RootletDisplayT[]>();

    useEffect(() => {
        if (storagePorts) {
            const newRootlets: RootletDisplayT[] = Object.entries(storagePorts)?.map(([key, value]) => ({
                id: key,
                text: key as string,
                open: value.open as boolean,
                name: value.name as string,
            })).filter((r: RootletDisplayT) => r.text !== 'root');
            setRootlets(newRootlets);
        }
    }, [storagePorts]);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const rootClassName = classNames(_classes?.root, classes?.root);
    const rootletsClassName = classNames(_classes?.rootlets, classes?.rootlets);

    //------------------------------------------------------------------------------------------------------------------
    // Helpers
    //------------------------------------------------------------------------------------------------------------------

    const onDelete = (id: ID) => {
        const storagePortToDelete = storagePorts[id];
        if (storagePortToDelete?.open) {
            alert('Please close this window before deleting.');
        } else {
            const newStoragePorts: StoragePorts = { ...storagePorts };
            delete newStoragePorts[id];
            setStoragePorts(newStoragePorts);
        }
    }

    return (
        <Taproot id={1}
            path                ={ [] }
            text                ={ rootName }
            branchClassName     ={ rootClassName }
            branchesClassName   ={ rootletsClassName }
            branchStyle         ={ styles.rootlets }
            branchesStyle       ={ styles.rootlets }
        >
            { rootlets?.map( r => (
                <Rootlet
                    key             ={ r.id }
                    id              ={ r.id }
                    open            ={ r.open }
                    text            ={ r.name }
                    setPopupDetails = { setPopupDetails }
                    onDelete        = { onDelete }
                />
            ))}
        </Taproot>
    );
}


export default Root;