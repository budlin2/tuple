import {useState, useRef, MouseEvent, ReactNode, FC, CSSProperties, Children} from 'react'


type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir: Direction,
    width: number | string,
    height: number | string,
    headLen: number | string,
    resizable: boolean,
    onResize?: (e: MouseEvent) => null,
    children: ReactNode,
}


const SplitPane: FC<Props> = ({
    dir='horizontal',
    width='100%',
    height='16rem',
    headLen='50%',
    resizable=true,
    onResize=null,
    children,
}) => {
    const containerRef = useRef<any>(null);
    const headRef = useRef<any>(null);
    const resizerRef = useRef(null);
    const tailRef = useRef(null);

    const [resizing, setResizing] = useState(false);
    const [headLength, setHeadLength] = useState<number | string>(headLen);
    const [mousePos, setMousePos] = useState<number>(0);

    const childrenArr = Children.toArray(children);

    const mouseDownHandler = (e: MouseEvent) => {
        if (dir === 'horizontal') {
            setResizing(true);
            setMousePos(e.clientX);
            setHeadLength(headRef.current.clientWidth);
        } else if (dir === 'vertical') {
            setResizing(true);
            setMousePos(e.clientY);
            setHeadLength(headRef.current.clientHeight);
        }
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!resizing) return;

        if (dir === 'horizontal') {
            const dx = e.clientX - mousePos;
            const newHeadLength = typeof(headLength) === 'number'
                && ((headLength + dx) * 100) / containerRef.current.clientWidth;
            headRef.current.style.width = `${newHeadLength}%`;
        } else if (dir === 'vertical') {
            const dy = e.clientY - mousePos;
            const newHeadLength = typeof(headLength) === 'number'
                && ((headLength + dy) * 100) / containerRef.current.clientHeight;
            headRef.current.style.height = `${newHeadLength}%`;
        }

        if (onResize) {
            onResize(e);
        }
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
    };

    const containerStyle = dir === 'horizontal'
        ? styles.containerHorizontal
        : styles.containerVertical;
    const headStyle = dir === 'horizontal'
        ? { ...styles.left, width: headLength } as CSSProperties
        : { ...styles.top, height: headLength } as CSSProperties;
    const resizerStyle = dir === 'horizontal'
        ? styles.resizerHorizontal as CSSProperties
        : styles.resizerVertical as CSSProperties; 
    const tailStyle = dir === 'horizontal'
        ? styles.right
        : styles.bottom;
    
    return (
        <div
            ref={containerRef}
            style={{...containerStyle, width, height}}
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}>
            <div ref={headRef} style={headStyle}>
                { childrenArr && childrenArr[0] }
                { resizable &&
                    <div ref={resizerRef} style={resizerStyle} onMouseDown={mouseDownHandler} />
                }
            </div>
            <div ref={tailRef} style={tailStyle}>
                { dir !== 'none' && childrenArr && childrenArr[1] }
            </div>
        </div>
    );
}


const styles = {
    // Horizontal
    containerHorizontal: {
        display: "flex",
        border: "1px solid #cbd5e0",
        height: "16rem",
        width: "100%"
    },
    left: {
        height: '100%',
        position: 'relative',
    },
    right: {
        flex: 1,
        height: '100%',
    },
    resizerHorizontal: {
        position: 'absolute',
        top: 0,
        right: '-4px',
        width: "8px",
        cursor: "w-resize",
        height: "100%",
        opacity: 0
    },

    // VERTICAL
    containerVertical: {
        display: "flex",
        flexDirection: 'column',
        border: "1px solid #cbd5e0",
        height: "100%",
        width: "100%"
    },
    top: {
        width: '100%',
        position: 'relative',
    },
    bottom: {
        flex: 1,
        width: '100%',
    },
    resizerVertical: {
        position: 'absolute',
        left: 0,
        bottom: '-4px',
        height: '8px',
        cursor: "n-resize",
        width: "100%",
        opacity: 0,
    },
};


export default SplitPane;