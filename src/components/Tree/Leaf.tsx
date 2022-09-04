import {
    CSSProperties,
    useRef,
    MutableRefObject,
    useContext,
} from 'react'

import { ID, TupleClassesT, TupleStylesT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';


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

    return (
        <div ref={leafRef as MutableRefObject<HTMLDivElement>}
            draggable
            style={styles.leaf}
            className={classes.leaf}>
            { text }
        </div>
    );
};


export default Leaf;
