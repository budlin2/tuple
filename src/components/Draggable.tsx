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


const cleanPx = (str: string | undefined | number):number => typeof str === 'number' ? str : parseInt(str && str?.replace('px', '') || '0');
const clamp = (num: number, min: number, max: number): number => Math.min(max, Math.max(min, num));


const Draggable = ({
    text,
    position,
    style = {},
}: Props) => {
    const [pos, setPos] = useState<PositionType>(position);
    const draggableRef = useRef<HTMLDivElement>(null);
    const [parent, setParent] = useState<HTMLElement | null>();
    const [xBounds, setXBounds] = useState<MinMaxType>({ min: 0, max: 0});
    const [yBounds, setYBounds] = useState<MinMaxType>({ min: 0, max: 0});

    useEffect(() => {
        const parentElement = draggableRef?.current?.parentElement
        const parentWidth = cleanPx(parentElement?.style.width);
        const parentHeight = cleanPx(parentElement?.style.height);
        const parentOffsetLeft = cleanPx(parentElement?.offsetLeft);
        const parentOffsetTop = cleanPx(parentElement?.offsetLeft);
        const draggableWidth = cleanPx(draggableRef.current?.style.width);
        const draggableHeight = cleanPx(draggableRef.current?.style.height);

        setParent(parentElement);
        setXBounds({
            min: parentOffsetLeft,
            max: parentWidth + parentOffsetLeft - draggableWidth,
        });
        setYBounds({
            min: parentOffsetTop,
            max: parentHeight + parentOffsetTop - draggableHeight,
        });
    }, [draggableRef, setParent, setXBounds, setYBounds]);

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

    const positionStyle = { left: `${pos.x}px`, top: `${pos.y}px` }
    const draggableStyle = { ..._styles.draggable, ...positionStyle, ...style } as CSSProperties;

    return (
        <div
            ref={draggableRef}
            style={draggableStyle}
            onMouseDown={mouseDownHandler}>
                {text}
        </div>
    );
}


const _styles = {
    draggable: {
        position: 'absolute',
        padding: '2px',
        border: '1px solid black',
        borderRadius: '5px',
        // height: '50px',
        // width: '50px',
    }
};


export default Draggable;