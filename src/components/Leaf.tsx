import { ReactNode, FC, CSSProperties, MouseEvent, useRef, MutableRefObject } from 'react'


interface Props {
    text: string,
    children: ReactNode,
    style?: CSSProperties,
    mouseDown?: (event: MouseEvent, leafView: ReactNode, leaf: typeof Leaf | null) => void,
    mouseMove?: (event: MouseEvent, leafView: ReactNode, leaf: typeof Leaf | null) => void,
    mouseUp?: (event: MouseEvent, leafView: ReactNode, leaf: typeof Leaf | null) => void,
    mouseEnter?: (event: MouseEvent, leafView: ReactNode, leaf: typeof Leaf | null) => void,
    mouseLeave?: (event: MouseEvent, leafView: ReactNode, leaf: typeof Leaf | null) => void,
}


const Leaf: FC<Props> = ({
    text,
    children,
    style,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseEnter,
    mouseLeave,
}) => {
    const leafRef: MutableRefObject<null> = useRef(null);
    const leafStyle: CSSProperties = {..._styles.leaf, ...style };

    return (
        <div
            ref = { leafRef }
            style={ leafStyle }
            onMouseDown={ e => mouseDown && mouseDown(e, children, leafRef.current) }
            onMouseMove={ e => mouseMove && mouseMove(e, children, leafRef.current) }
            onMouseUp={ e => mouseUp && mouseUp(e, children, leafRef.current) }
            onMouseEnter={ e => mouseEnter && mouseEnter(e, children, leafRef.current) }
            onMouseLeave={ e => mouseLeave && mouseLeave(e, children, leafRef.current) }
            >
            {text}
        </div>
    );
};


const _styles = {
    leaf: {
    }
};


export default Leaf;
