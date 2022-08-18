import {
    CSSProperties,
    useEffect,
    useRef,
    useState,
    MouseEvent as rMouseEvent,
    MutableRefObject,
    ReactNode,
} from 'react';

import { PositionType, MinMaxType, DragEvent } from '../types';


const createLocalDraggable: DragEvent = (e, leaf, leafView) => {
    setDraggableProps({
        text: leaf.innerText,
        style: { background: 'lightgrey' },
        offset: { x: -15, y: -15 },
        isDragging: true,
        mouseUp: () => setDraggableProps(null),
    } as DraggableProps);
};


const clamp = (num: number, min: number, max: number): number => Math.min(max, Math.max(min, num));


export interface Props {
    text: string,
    offset: PositionType
    isDragging?: boolean,
    style?: CSSProperties,
    // TODO : Move to context
    mouseUp?: (e: MouseEvent) => void
}


const Draggable = ({
    text,
    offset,
    isDragging,
    style = {},
    mouseUp = () => {}
}: Props) => {
    const [position, setPosition] = useState<PositionType>();
    const draggableRef = useRef<HTMLDivElement>();
    const [parent, setParent] = useState<HTMLElement | null>();
    const [xBounds, setXBounds] = useState<MinMaxType>({ min: 0, max: 0});
    const [yBounds, setYBounds] = useState<MinMaxType>({ min: 0, max: 0});

    const startDragging = () => {
        parent?.addEventListener( 'mousemove', mouseMoveHandler );
        parent?.addEventListener( 'mouseup', mouseUpHandler );
        parent?.addEventListener( 'mouseleave', mouseUpHandler );
    }

    useEffect(() => {
        const parentElement: HTMLDivElement = draggableRef?.current?.parentElement as HTMLDivElement;
        const parentWidth: number = parentElement?.offsetWidth as number;
        const parentHeight: number = parentElement?.offsetHeight as number;
        const parentLeft: number = parentElement?.offsetLeft as number;
        const parentTop: number = parentElement?.offsetTop as number;

        setParent(parentElement);

        const draggableWidth: number = draggableRef?.current?.offsetWidth as number;
        const draggableHeight: number = draggableRef?.current?.offsetHeight as number;

        setXBounds({
            min: parentLeft,
            max: parentWidth + parentLeft - draggableWidth,
        });

        setYBounds({
            min: parentTop,
            max: parentHeight + parentTop - draggableHeight,
        });

        return () => { parentElement.style.cursor = "default" };

    }, [draggableRef, setParent, setPosition, setXBounds, setYBounds, offset]);

    useEffect(() => {
        if (isDragging) {
            startDragging();
        }
    }, [isDragging, parent]);

    const mouseDownHandler = (e: rMouseEvent) => {
        if (e.button !== 0) return  // only left mouse button

        startDragging();

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        setPosition({
            x: clamp(e.pageX + offset.x, xBounds?.min, xBounds?.max),
            y: clamp(e.pageY + offset.y, yBounds?.min, yBounds?.max),
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseUpHandler = (e: MouseEvent) => {
        parent?.removeEventListener( 'mousemove', mouseMoveHandler );
        parent?.removeEventListener( 'mouseup', mouseUpHandler );

        mouseUp(e);

        e.stopPropagation();
        e.preventDefault();
    };

    const positionStyle = position && { left: `${position.x}px`, top: `${position.y}px` };
    const draggableStyle = position
        ? { ..._styles.draggable, ...positionStyle, ...style } as CSSProperties
        : { visibility: 'hidden', display: 'none' } as CSSProperties;

    return (
        <div
            ref={draggableRef as MutableRefObject<HTMLDivElement>}
            style={draggableStyle}
            onMouseDown={mouseDownHandler}>
            { text }
        </div>
    );
}


const _styles = {
    draggable: {
        position: 'absolute',
        padding: '2px',
        border: '1px solid black',
        borderRadius: '5px',
    },
};


export default Draggable;