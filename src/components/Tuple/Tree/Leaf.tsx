import {
    CSSProperties,
    useRef,
    MutableRefObject,
    useContext,
} from 'react'

import { TupleContext } from '..';
import { setCustomDragImage } from '../../Draggable';
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
    const leafRef = useRef<HTMLDivElement>();

    const {state:{ classes, styles }}: TupleContextT = useContext(TupleContext);

    const leafClassName = `${_classes.leaf} ${classes.leaf}`;
    const leafContainerClassName = `${_classes.leafContainer} ${classes.leafContainer}`;

    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, classes.draggable, styles.draggable);
        e.dataTransfer.setData('pageId', pageId);
    };

    return (
        <div
            style={styles.leaf}
            className={leafClassName}
            draggable
            onDragStart={dragStartHandler}>
            { text }
        </div>
    );
};


export default Leaf;
