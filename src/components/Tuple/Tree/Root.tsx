import { useContext } from 'react';
import { TupleContext } from '..';
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

    const getRootlets = (): string[] => {
        //TODO: Implement local storage fetching
        return ['baratheon', 'stark', 'lannister', 'hightower'];
    }

    const rootlets = getRootlets();

    return (
        <Taproot text={rootName} className={rootClassName} style={styles.root}>
            { rootlets.map( r => (
                <Rootlet text={r} treeId={r} open={true} />
            ))}
        </Taproot>
    );
}


export default Root;