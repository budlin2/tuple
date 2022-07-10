import {
    useState,
    useRef,
    MouseEvent,
    ReactNode,
    FC,
    CSSProperties,
    Children
} from 'react'

import '../index.css';

type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir?: Direction,
    width?: number | string,
    height?: number | string,
    headLen?: number | string,
    resizable?: boolean,
    onResize?: (e: MouseEvent) => null,
    children: ReactNode,
}


const SplitPane: FC<Props> = ({
    dir='horizontal',
    width='100%',
    height='20rem',
    headLen='50%',  // todo : just rename to reizerPos
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

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!resizing) return;

        containerRef.current.style.cursor = 'w-resize';

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

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
        containerRef.current.style.cursor = 'default';

        e.stopPropagation();
        e.preventDefault();
    };


    let containerStyle: CSSProperties;
    let headStyle: CSSProperties;
    let resizerStyle: CSSProperties;
    let tailStyle: CSSProperties;
    
    if (dir === 'horizontal') {
        containerStyle = styles.containerHorizontal;
        headStyle = { ...styles.left, width: headLength } as CSSProperties;
        resizerStyle = styles.resizerHorizontal as CSSProperties;
        tailStyle = styles.right;
    } else {
        containerStyle = styles.containerVertical as CSSProperties;
        headStyle = { ...styles.top, height: headLength } as CSSProperties;
        resizerStyle = styles.resizerVertical as CSSProperties; 
        tailStyle = styles.bottom;
    }
    
    return (
        <div
            ref={containerRef}
            style={{...containerStyle, width, height}}
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}>
            <div
                ref={headRef}
                className='noScrollbar'
                style={headStyle}>
                { childrenArr && childrenArr[0] }
                { resizable &&
                    <div
                        ref={resizerRef}
                        style={resizerStyle}
                        onMouseDown={mouseDownHandler}/>
                }
            </div>
            <div
                ref={tailRef}
                className='noScrollbar'
                style={tailStyle}>
                { dir !== 'none' && childrenArr && childrenArr[1] }
            </div>
        </div>
    );
}


const styles = {
    // Horizontal
    containerHorizontal: {
        display: 'flex',
        border: '1px solid #cbd5e0',
        height: '16rem',
        width: '100%',
    },
    left: {
        height: '100%',
        position: 'relative',
        overflow: 'scroll',
        minWidth: '1px',
    },
    right: {
        flex: 1,
        overflow: 'scroll',
        height: '100%',
        minWidth: '1px',
    },
    resizerHorizontal: {
        position: 'absolute',
        top: 0,
        right: '-4px',
        width: '8px',
        cursor: 'w-resize',
        height: '100%',
        opacity: 0
    },

    // VERTICAL
    containerVertical: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #cbd5e0',
        height: '100%',
        width: '100%',
    },
    top: {
        width: '100%',
        position: 'relative',
        overflow: 'scroll',
        minHeight: '1px',
    },
    bottom: {
        flex: 1,
        overflow: 'scroll',
        width: '100%',
        minHeight: '1px',
    },
    resizerVertical: {
        position: 'absolute',
        left: 0,
        bottom: '-4px',
        height: '8px',
        cursor: 'n-resize',
        width: '100%',
        opacity: 0,
    },
};


export default SplitPane;