import { CSSProperties, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { TupleContext } from '..';
import { DRAGGING_ID } from '../state/browser-actions';
import { TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';

export interface Props {
    symbol?: string,
    dragOverSymbol?: string,
}


const Trashcan = ({
    symbol='\u267B',
    dragOverSymbol='\u267B',
}: Props) => {
    const [draggingOver, setDraggingOver] = useState(false);
    const [visible, setVisible ] = useLocalStorage(DRAGGING_ID, false);

    if (!visible) return null;

    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const trashcanClassName = `
        ${_classes?.trashcan || ''}
        ${template?.trashcan || ''}
        ${classes?.trashcan  || ''}
        ${draggingOver ? _classes.trashcanHover : ''}`;


    const dragOverHandler = () => setDraggingOver(true);
    const dragLeaveHandler = () => setDraggingOver(false);
    const dropHandler = () => {
        setVisible(false);
        setDraggingOver(false);
    }

    return (
        <div className={trashcanClassName}
            style={styles.trashcan}
            onDragEnter={()=>{}}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}>
            { draggingOver ? dragOverSymbol : symbol }
        </div>
    );
}


export default Trashcan;