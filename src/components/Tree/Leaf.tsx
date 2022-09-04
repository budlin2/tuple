import {
    CSSProperties,
    useRef,
    MutableRefObject,
} from 'react'

import { ID } from '../../types';


interface Props {
    text: string,
    pageId: ID,
    style?: CSSProperties,
}


const Leaf = ({
    text,
    pageId,
    style,
}: Props) => {
    const leafRef = useRef<HTMLDivElement>();
    const leafStyle: CSSProperties = {..._styles.leaf, ...style };

    return (
        <div
            draggable
            ref = { leafRef as MutableRefObject<HTMLDivElement> }
            style={ leafStyle }>
            { text }
        </div>
    );
};


const _styles = {
    leaf: {
    }
};


export default Leaf;
