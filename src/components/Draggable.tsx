import {
    CSSProperties,
    useEffect,
    useRef,
    useState,
    MouseEvent as r_MouseEvent
} from 'react';


interface PositionType {
    x: number,
    y: number,
}


interface MinMaxType {
    min: number,
    max: number,
}


interface Props {
    text: string,
    position: PositionType
    isDragging?: boolean,
    style?: CSSProperties,
}


const clamp = (num: number, min: number, max: number): number => Math.min(max, Math.max(min, num));


const Draggable = ({
    text,
    position,
    style = {},
}: Props) => {
    const [pos, setPos] = useState<PositionType>();
    const draggableRef = useRef<HTMLDivElement>(null);
    const [parent, setParent] = useState<HTMLElement | null>();
    const [xBounds, setXBounds] = useState<MinMaxType>({ min: 0, max: 0});
    const [yBounds, setYBounds] = useState<MinMaxType>({ min: 0, max: 0});

    useEffect(() => {
        const parentElement: HTMLDivElement = draggableRef?.current?.parentElement as HTMLDivElement;
        const parentWidth: number = parentElement?.offsetWidth as number;
        const parentHeight: number = parentElement?.offsetHeight as number;
        const parentLeft: number = parentElement?.offsetLeft as number;
        const parentTop: number = parentElement?.offsetTop as number;

        const draggableWidth: number = draggableRef?.current?.offsetWidth as number;
        const draggableHeight: number = draggableRef?.current?.offsetHeight as number;

        setParent(parentElement);

        setPos({
            x: parentLeft + position.x,
            y: parentTop + position.y
        });

        setXBounds({
            min: parentLeft,
            max: parentWidth + parentLeft - draggableWidth,
        });

        setYBounds({
            min: parentTop,
            max: parentHeight + parentTop - draggableHeight,
        });
    }, [draggableRef, setParent, setPos, setXBounds, setYBounds, position]);

    const mouseDownHandler = (e: r_MouseEvent) => {
        if (e.button !== 0) return  // only left mouse button

        parent?.addEventListener( 'mousemove', mouseMoveHandler );
        parent?.addEventListener( 'mouseup', mouseUpHandler );
        parent?.addEventListener( 'mouseleave', mouseUpHandler );

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        setPos({
            x: clamp(e.pageX, xBounds?.min, xBounds?.max),
            y: clamp(e.pageY, yBounds?.min, yBounds?.max),
        })

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseUpHandler = (e: MouseEvent) => {
        parent?.removeEventListener( 'mousemove', mouseMoveHandler );
        parent?.removeEventListener( 'mouseup', mouseUpHandler );

        e.stopPropagation();
        e.preventDefault();
    };

    const positionStyle = pos && { left: `${pos.x}px`, top: `${pos.y}px` };
    const draggableStyle = { ..._styles.draggable, ...positionStyle, ...style } as CSSProperties;

    return (
        <div
            ref={draggableRef}
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