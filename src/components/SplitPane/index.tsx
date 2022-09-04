import {
    useState,
    useRef,
    MouseEvent,
    ReactNode,
    CSSProperties,
    Children,
    useEffect,
    MutableRefObject,
} from 'react'

import _classes from './splitpane.module.css';


// TODO: Remove
type Direction = 'horizontal' | 'vertical' | 'none';


const validateProps = (props: Props) => {

}


interface Props {
    dir?: Direction,
    width?: number | string,
    height?: number | string,
    style?: CSSProperties
    resizerPos?: number | string,
    resizable?: boolean,
    children: ReactNode,
    onResize?: ((e: MouseEvent) => null) | null,
}


const SplitPane = ({
    dir='horizontal',
    width='100%',
    height='100%',
    style={},
    resizerPos='50%',
    resizable=true,
    children,
    onResize=null,
}: Props) => {
    const childrenArr = Children.toArray(children);
    if (childrenArr.length > 2) throw 'SplitPane can only take a maximum of two children';
    if (childrenArr.length < 1) throw 'SplitPane needs at least one child';

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

        if (dir === 'horizontal') {
            const deltaX = e.clientX - mousePos;
            const offsetWidth = containerRef.current?.offsetWidth as number;
            const newHeadLength = (((headLength as number) + deltaX) * 100) / offsetWidth;
            container.style.cursor = 'w-resize';
            head.style.width = `${newHeadLength}%`;
        } else if (dir === 'vertical') {
            const deltaY = e.clientY - mousePos;
            const offsetHeight = containerRef.current?.offsetHeight as number;
            const newHeadLength = (((headLength as number) + deltaY) * 100) / offsetHeight;
            container.style.cursor = 'n-resize';
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
        containerStyle = { ..._styles.containerHorizontal, ...style };
        headStyle = { ..._styles.left, width: headLength } as CSSProperties;
        resizerStyle = _styles.resizerHorizontal as CSSProperties;
        tailStyle = _styles.right;
    } else {
        containerStyle = { ..._styles.containerVertical, ...style } as CSSProperties;
        headStyle = { ..._styles.top, height: headLength } as CSSProperties;
        resizerStyle = _styles.resizerVertical as CSSProperties; 
        tailStyle = _styles.bottom;
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
                className={_classes.noScrollbar}
                style={{...headStyle, overflow: 'hidden'}}>
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
                className={_classes.noScrollbar}
                style={tailStyle}>
                { dir !== 'none' && childrenArr && childrenArr[1] }
            </div>
        </div>
    );
}


const _styles = {
    // Horizontal
    containerHorizontal: {
        display: 'flex',
        height: '100%',
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