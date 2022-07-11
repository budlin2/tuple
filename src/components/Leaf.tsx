import { ReactNode, FC, CSSProperties, MouseEvent, useRef, MutableRefObject } from 'react'


interface Props {
    text: string,
    children: ReactNode,
    style?: CSSProperties,
    mouseDown?: (event: MouseEvent, leafView: ReactNode, leaf: ReactNode) => void,
    mouseMove?: (event: MouseEvent, leafView: ReactNode, leaf: ReactNode) => void,
    mouseUp?: (event: MouseEvent, leafView: ReactNode, leaf: ReactNode) => void,
    mouseEnter?: (event: MouseEvent, leafView: ReactNode, leaf: ReactNode) => void,
    mouseLeave?: (event: MouseEvent, leafView: ReactNode, leaf: ReactNode) => void,
}


const Leaf = ({
    text,
    children,
    style,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseEnter,
    mouseLeave,
}: Props) => {
    const leafRef = useRef<HTMLDivElement>();
    const leafStyle: CSSProperties = {..._styles.leaf, ...style };

    return (
        <div
            ref = { leafRef as MutableRefObject<HTMLDivElement> }
            style={ leafStyle }
            onMouseDown={ e => mouseDown && mouseDown(e, children, (leafRef as MutableRefObject<ReactNode>).current) }
            onMouseMove={ e => mouseMove && mouseMove(e, children, (leafRef as MutableRefObject<ReactNode>).current) }
            onMouseUp={ e => mouseUp && mouseUp(e, children, (leafRef as MutableRefObject<ReactNode>).current) }
            onMouseEnter={ e => mouseEnter && mouseEnter(e, children, (leafRef as MutableRefObject<ReactNode>).current) }
            onMouseLeave={ e => mouseLeave && mouseLeave(e, children, (leafRef as MutableRefObject<ReactNode>).current) }>
            { text }
        </div>
    );
};


const _styles = {
    leaf: {}
};


export default Leaf;
