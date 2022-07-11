import {
    useState,
    useRef,
    MouseEvent,
    ReactNode,
    FC,
    CSSProperties,
    Children,
    useEffect,
    MutableRefObject,
} from 'react'

import '../index.css';


type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir?: Direction,
    width?: number | string,
    height?: number | string,
    resizerPos?: number | string,
    resizable?: boolean,
    onResize?: (e: MouseEvent) => null,
    children: ReactNode,
}


const SplitPane: FC<Props> = ({
    dir='horizontal',
    width='100%',
    height='20rem',
    resizerPos='50%',  // todo : just rename to reizerPos
    resizable=true,
    onResize=null,
    children,
}) => {
    const childrenArr = Children.toArray(children);
    if (childrenArr.length > 2) throw 'SplitPane can only take a maximum of two children';

    const containerRef = useRef<HTMLDivElement>();
    const headRef = useRef<HTMLDivElement>();
    const resizerRef = useRef<HTMLDivElement>();
    const tailRef = useRef<HTMLDivElement>();

    const [resizing, setResizing] = useState<boolean>(false);
    const [headLength, setHeadLength] = useState<number | string>(resizerPos);
    const [mousePos, setMousePos] = useState<number>(0);

    useEffect(() => {
        // After first render, make sure headLength is number
        const headLen = dir === 'horizontal'
            ? headRef.current?.offsetWidth as number
            : headRef.current?.offsetHeight as number;
        setHeadLength(headLen);
    }, [resizerPos, headRef, setHeadLength]);

    const mouseDownHandler = (e: MouseEvent) => {
        if (dir === 'horizontal') {
            setResizing(true);
            setMousePos(e.clientX);
            setHeadLength(headRef.current?.offsetWidth as number);
        } else if (dir === 'vertical') {
            setResizing(true);
            setMousePos(e.clientY);
            setHeadLength(headRef.current?.offsetHeight as number);
        }

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!resizing) return;

        const container = containerRef.current as HTMLDivElement;
        const head = headRef.current as HTMLDivElement;

        container.style.cursor = 'w-resize';

        if (dir === 'horizontal') {
            const deltaX = e.clientX - mousePos;
            const offsetWidth = containerRef.current?.offsetWidth as number;
            const newHeadLength = (((headLength as number) + deltaX) * 100) / offsetWidth;
            head.style.width = `${newHeadLength}%`;
        } else if (dir === 'vertical') {
            const deltaY = e.clientY - mousePos;
            const offsetHeight = containerRef.current?.offsetHeight as number;
            const newHeadLength = (((headLength as number) + deltaY) * 100) / offsetHeight;
            head.style.height = `${newHeadLength}%`;
        }

        onResize && onResize(e);

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
        const container = containerRef.current as HTMLDivElement;
        container.style.cursor = 'default';

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
            ref={ containerRef as MutableRefObject<HTMLDivElement> }
            style={{...containerStyle, width, height}}
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}>
            <div
                ref={ headRef as MutableRefObject<HTMLDivElement> }
                className='noScrollbar'
                style={headStyle}>
                { childrenArr && childrenArr[0] }
                { resizable &&
                    <div
                        ref={ resizerRef as MutableRefObject<HTMLDivElement> }
                        style={resizerStyle}
                        onMouseDown={mouseDownHandler}/>
                }
            </div>
            <div
                ref={ tailRef  as MutableRefObject<HTMLDivElement> }
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