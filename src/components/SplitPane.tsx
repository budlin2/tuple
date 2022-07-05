import {useState, useRef, MouseEvent, Component} from 'react'


type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir: Direction,
    width: number | string,
    height: number | string,
    initialLength: number | string,
    resizable: boolean,
    onResize?: (e: Event) => null,
    child1: Component,
    child2: Component,
}


const SplitPane2 = ({
    dir = 'horizontal',
    width = '100%',
    height = '16rem',
    initialLength = '50%',
    resizable = true,
    child1,
    child2,
}: Props) => {
    // Query the element
    const containerRef = useRef<any>(null);
    const firstRef = useRef<any>(null);
    const resizerRef = useRef(null);
    const secondRef = useRef(null);

    const [resizing, setResizing] = useState(false);
    const [firstLength, setFirstLength] = useState<number | string>(initialLength);
    const [mousePos, setMousePos] = useState<number>(0);

    const mouseDownHandler = (e: MouseEvent) => {
        if (dir === 'horizontal') {
            setResizing(true);
            setMousePos(e.clientX);
            setFirstLength(firstRef.current.clientWidth);
        } else if (dir === 'vertical') {
            setResizing(true);
            setMousePos(e.clientY);
            setFirstLength(firstRef.current.clientHeight);
        }
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!resizing) return;

        if (dir === 'horizontal') {
            const dx = e.clientX - mousePos;
            const newFirstLength = typeof(firstLength) === 'number'
                && ((firstLength + dx) * 100) / containerRef.current.clientWidth;
            firstRef.current.style.width = `${newFirstLength}%`;
        } else if (dir === 'vertical') {
            const dy = e.clientY - mousePos;
            const newFirstLength = typeof(firstLength) === 'number'
                && ((firstLength + dy) * 100) / containerRef.current.clientHeight;
            firstRef.current.style.height = `${newFirstLength}%`;
        }
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
    };

    const containerStyle = dir === 'horizontal'
        ? styles.containerHorizontal
        : styles.containerVertical;
    const leftStyle = dir === 'horizontal'
        ? { ...styles.left, width: firstLength }
        : { ...styles.top, height: firstLength }
    const resizerStyle = dir === 'horizontal'
        ? styles.resizerHorizontal
        : styles.resizerVertical;
    const rightStyle = dir === 'horizontal'
        ? styles.right
        : styles.bottom;
    
    return (
        <div
            ref={containerRef}
            style={{...containerStyle, width, height}}
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}>
            <div ref={firstRef} style={leftStyle}>
                Left
            </div>
            <div ref={resizerRef}
                style={resizerStyle}
                onMouseDown={mouseDownHandler} />
            <div ref={secondRef} style={rightStyle}>
                Right
            </div>
        </div>
    );
}


const styles = {
    containerHorizontal: {
        display: "flex",
        border: "1px solid #cbd5e0",
        height: "16rem",
        width: "100%"
    },
    resizerHorizontal: {
        backgroundColor: "#cbd5e0",
        cursor: "w-resize",
        height: "100%",
        width: "2px",
        // opacity: 0
    },
    left: {
        background: 'red',
        height: '100%',
    },
    right: {
        flex: 1,
        background: 'yellow',
        height: '100%',
    },
    containerVertical: {
        display: "flex",
        flexDirection: 'column',
        border: "1px solid #cbd5e0",
        height: "100%",
        width: "100%"
    },
    resizerVertical: {
        backgroundColor: "#cbd5e0",
        cursor: "n-resize",
        height: "2px",
        width: "100%",
        // opacity: 0
    },
    top: {
        background: 'red',
        width: '100%',
    },
    bottom: {
        flex: 1,
        background: 'yellow',
        width: '100%',
    }
};


export default SplitPane2;