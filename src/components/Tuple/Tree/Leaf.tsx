import { CSSProperties, useContext } from 'react'

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { ID, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    pageId: ID,
    style?: CSSProperties,
}


const Leaf = ({
    text,
    pageId,
}: Props) => {
    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const leafClassName = `
        ${_classes?.leaf || ''}
        ${template?.leaf || ''}
        ${classes?.leaf  || ''}`;

    const draggableClass = `
        ${template?.draggable || ''}
        ${classes?.draggable || ''}`;

    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
        e.dataTransfer.setData('pageId', pageId);
    };

    const dragEndHandler = (e: any) => cleanupDraggable();

    return (
        <div
            style={styles.leaf}
            className={leafClassName}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}>
            { text }
        </div>
    );
};


export default Leaf;
