import {
    ReactNode,
    CSSProperties,
    MouseEvent as rMouseEvent,
    useRef,
    MutableRefObject,
} from 'react'


export type LeafEvent = (e: MouseEvent | rMouseEvent, leaf: HTMLElement, leafView: ReactNode) => void;


interface Props {
    text: string,
    children: ReactNode,
    style?: CSSProperties,
    mouseDown?: LeafEvent,
    mouseMove?: LeafEvent,
    mouseUp?: LeafEvent,
}


const Leaf = ({
    text,
    children,
    style,
    mouseDown,
    mouseMove,
    mouseUp,
}: Props) => {
    const leafRef = useRef<HTMLDivElement>();
    const leafStyle: CSSProperties = {..._styles.leaf, ...style };

    const mouseDownHandler = (e: rMouseEvent) => {
        leafRef.current?.addEventListener('mousemove', mouseMoveHandler);
        mouseDown && mouseDown(e, leafRef.current as HTMLElement, children);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        leafRef.current?.removeEventListener('mousemove', mouseMoveHandler);
        mouseMove && mouseMove(e, leafRef.current as HTMLElement, children);
    };

    const mouseUpHandler = (e: rMouseEvent) => {
        leafRef.current?.removeEventListener('mousemove', mouseMoveHandler);
        mouseUp && mouseUp(e, leafRef.current as HTMLElement, children);
    };

    return (
        <div
            ref = { leafRef as MutableRefObject<HTMLDivElement> }
            style={ leafStyle }
            onMouseDown={ mouseDownHandler }
            onMouseUp={ mouseUpHandler }>
            { text }
        </div>
    );
};


const _styles = {
    leaf: {
    }
};


export default Leaf;
