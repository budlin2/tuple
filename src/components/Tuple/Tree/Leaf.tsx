import {
    CSSProperties,
    useRef,
    MutableRefObject,
    useContext,
} from 'react'

import { TupleContext } from '../TupleProvider';
import { ID, TupleClassesT, TupleStylesT } from '../TupleTypes';

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

    const { classes, styles }: {
        classes: TupleClassesT,
        styles: TupleStylesT,
    } = useContext(TupleContext);

    const leafClassName = `${_classes.leaf} ${classes.leaf}`;
    const leafContainerClassName = `${_classes.leafContainer} ${classes.leafContainer}`;

    const dragStartHandler = (e: any) => {
        e.dataTransfer.setData('pid', pageId);
    };

    return (
        <div style={styles.leafContainer} className={leafContainerClassName}>
            <div ref={leafRef as MutableRefObject<HTMLDivElement>}
                style={styles.leaf}
                className={leafClassName}
                draggable
                onDragStart={dragStartHandler}>
                { text }
            </div>
        </div>
    );
};


export default Leaf;
