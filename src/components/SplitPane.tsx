import { useState, useRef } from 'react';
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
    const rootRef = useRef(null);
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const [lengths, setLengths] = useState({first: '50%', second: '50%'});

    let [resizing, setResizing] = useState<Boolean>(false);

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        setResizing(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizing) return;

        console.log(e.clientX)
        console.log(rootRef)

        const offset = e.clientX;
        const rightWidth = rootRef.current.clientWidth - offset;

        setLengths({ first: offset, second: rightWidth + 32}); // why 32? idk
    };

    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        setResizing(false);
    }

    return (
        <div
            id="root"
            ref={rootRef}
            style={styles.root}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            <section style={{ ...styles.first, width: lengths.first }}>
                <div style={styles.dragbar} onMouseDown={handleMouseDown}></div>
            </section>
            <div style={{ ...styles.second, width: lengths.second }}>
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