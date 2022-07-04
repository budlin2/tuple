import { useState, useRef, useEffect } from 'react';
import './SplitPane.css'

type Direction = 'horizontal' | 'vertical' | 'none';


interface Props {
    dir: Direction,
    size: number | string,
    resizable: boolean,
    onResize?: (e: Event) => null,
}


const SplitPane = ({
    dir = 'horizontal',
    size = '50%',
    resizable = true,
}: Props) => {
    let [rootLength, setRootLength] = useState(0)
    const rootRef = useRef(null);
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const [length, setLength] = useState<number | string>('50%');
    let [resizing, setResizing] = useState<Boolean>(false);

    useEffect(() => {
        setRootLength(rootRef.current.clientWidth + 32);
    }, [rootLength, rootRef, setRootLength]);

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        setResizing(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizing) return;

        console.log(e.clientX)
        console.log(rootRef)

        const offset = e.clientX;

        setLength(offset); // why 32? idk
    };

    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        setResizing(false);
    }

    // window.addEventListener('resize', () => {
    //    // handle potential window resizing issues...
    //     const length1 = firstRef?.current?.clientWidth;
    //     const length2 = secondRef?.current?.clientWidth;
    //     const totalLength = rootRef?.current?.clientWidth;
    //     if (length1 && length2 && totalLength && length1 + length2 != totalLength) {
    //         console.log(length1);
    //         console.log(totalLength);
    //         setLengths({
    //             first: length1, 
    //             second: totalLength - length2
    //         });
    //     }
    // });

    return (
        <div
            ref={rootRef}
            style={styles.root}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            <div
                ref={firstRef}
                style={{ ...styles.first, width: length }}>
                <div style={styles.dragbar} onMouseDown={handleMouseDown}></div>
            </div>
            <div
                ref={secondRef}
                style={{ ...styles.second, width: rootLength - length }}>
            </div>
        </div>
    )
}


const styles = {
    root: {
        width: '100%',
        height: '100%',
    },
    first: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        background: 'red',
    },
    second: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        background: 'yellow',
    },
    dragbar: {
        top: 0,
        right: '-4px',
        width: '8px',
        height: '100%',
        position: 'absolute',
        opacity: 0,
        cursor: 'w-resize',
        transition: '0.3s ease-in-out 0s, opacity 0.3s ease-in-out 0s',
        zIndex: 1,
    },
};


export default SplitPane;