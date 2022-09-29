import {
    CSSProperties,
    useRef,
    MutableRefObject,
    useContext,
} from 'react'

import { ID, TupleClassesT, TupleStylesT } from '../../../../types';
import { TupleContext } from '../../TupleProvider';

import _classes from '../tree.module.css';


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

    // TODO: onDrag... use pageId

    const leafClassName = `${_classes.leaf} ${classes.leaf}`;
    const leafContainerClassName = `${_classes.leafContainer} ${classes.leafContainer}`;

    const dragStartHandler = (e: any) => {
        e.dataTransfer.setData('pid', pageId);
        // setTimeout(() => { e.target.style.display = "none" }, 0);
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
