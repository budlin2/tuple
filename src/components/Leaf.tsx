import { ReactNode, FC, CSSProperties, MouseEvent, useRef, MutableRefObject } from 'react'


interface Props {
    text: string,
    children: ReactNode,
    style?: CSSProperties,
    mouseDown?: (event: MouseEvent, leaf: ReactNode, leafView: ReactNode) => void,
    mouseMove?: (event: MouseEvent, leaf: ReactNode, leafView: ReactNode) => void,
    mouseUp?: (event: MouseEvent, leaf: ReactNode, leafView: ReactNode) => void,
    mouseEnter?: (event: MouseEvent, leaf: ReactNode, leafView: ReactNode) => void,
    mouseLeave?: (event: MouseEvent, leaf: ReactNode, leafView: ReactNode) => void,
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
            onMouseDown={ e => mouseDown && mouseDown(e, (leafRef as MutableRefObject<ReactNode>).current, children) }
            onMouseMove={ e => mouseMove && mouseMove(e, (leafRef as MutableRefObject<ReactNode>).current, children) }
            onMouseUp={ e => mouseUp && mouseUp(e, (leafRef as MutableRefObject<ReactNode>).current, children) }
            onMouseEnter={ e => mouseEnter && mouseEnter(e, (leafRef as MutableRefObject<ReactNode>).current, children) }
            onMouseLeave={ e => mouseLeave && mouseLeave(e, (leafRef as MutableRefObject<ReactNode>).current, children) }>
            { text }
        </div>
    );
};


const _styles = {
    leaf: {
    }
};


export default Leaf;
