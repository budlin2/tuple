import {useState, useRef} from 'react'


type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir: Direction,
    size: number | string,
    resizable: boolean,
    onResize?: (e: Event) => null,
}


const SplitPane2 = ({
    dir = 'horizontal',
    size = '50%',
    resizable = true,
}: Props) => {
    // Query the element
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const resizerRef = useRef(null);
    const rightRef = useRef(null);

    const [resizing, setResizing] = useState(false);
    const [leftWidth, setLeftWidth] = useState(0);
    const [xPos, setXPos] = useState(0);

    const mouseDownHandler = (e: MouseEvent) => {
        setResizing(true);
        setXPos(e.clientX);
        setLeftWidth(leftRef.current.clientWidth);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!resizing) return;
        // How far the mouse has been moved
        const dx = e.clientX - xPos;
        // const dy = e.clientY - y;  // TODO

        const newLeftWidth = ((leftWidth + dx) * 100) / containerRef.current.clientWidth;
        console.log(newLeftWidth);
        leftRef.current.style.width = `${newLeftWidth}%`;
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
    };

    
    return (
        <div ref={containerRef} style={styles.container} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}>
            <div ref={leftRef} style={styles.left}>Left</div>
            <div ref={resizerRef} style={styles.resizer} onMouseDown={mouseDownHandler}></div>
            <div ref={rightRef} style={styles.right}>Right</div>
        </div>
    );
}


const styles = {
    container: {
        display: "flex",
        border: "1px solid #cbd5e0",
        height: "16rem",
        width: "100%"
    },
    resizer: {
        backgroundColor: "#cbd5e0",
        cursor: "w-resize",
        height: "100%",
        width: "2px",
        opacity: 0
    },
    left: {
        background: 'red',
    },
    right: {
        flex: 1,
        background: 'yellow',
    }
};


export default SplitPane2;