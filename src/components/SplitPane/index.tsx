import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './splitpane.module.css';

export type DirectionT = 'horizontal' | 'vertical' | 'none';

export interface Props {
    dir?: DirectionT;
    width?: number | string;
    height?: number | string;
    resizerPos?: number | string;
    resizable?: boolean;
    paneStyle?: React.CSSProperties;
    paneClassName?: string;
    children: React.ReactNode;
    onResize?: ((e: MouseEvent) => null) | null;
}

const SplitPane: React.FC<Props> = ({
    dir = 'horizontal',
    width = '100%',
    height = '100%',
    resizerPos = '50%',
    resizable = true,
    paneStyle = {},
    paneClassName = '',
    children,
    onResize = null,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [paneSize, setPaneSize] = useState(resizerPos);
    const [isResizing, setIsResizing] = useState(false);
    const isHorizontal = dir === 'horizontal';

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const size = isHorizontal ? rect.width : rect.height;
            const offset = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
            const newSize = ((offset / size) * 100).toFixed(2) + '%';

            setPaneSize(newSize);

            if (onResize) {
                onResize(e);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, isHorizontal, onResize]);

    const handleMouseDown = () => {
        setIsResizing(true);
    };

    const childrenArray = React.Children.toArray(children);

    if ((dir !== 'none' && childrenArray.length !== 2) || (dir === 'none' && childrenArray.length !== 1)) {
        console.error(`SplitPane requires exactly ${dir === 'none' ? 'one' : 'two'} child(ren) when direction is set to ${dir}.`);
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isHorizontal ? styles.horizontal : styles.vertical}`}
            style={{ width, height }}
        >
            {dir !== 'none' ? (
                <>
                    <div
                        className={`${styles.pane} ${paneClassName}`}
                        style={{
                            ...paneStyle,
                            [isHorizontal ? 'width' : 'height']: paneSize,
                            [isHorizontal ? 'height' : 'width']: '100%',
                        }}
                    >
                        {childrenArray[0]}
                    </div>
                    {resizable && (
                        <div
                            className={styles.resizer}
                            onMouseDown={handleMouseDown}
                        />
                    )}
                    <div
                        className={`${styles.pane} ${paneClassName}`}
                        style={{
                            ...paneStyle,
                            [isHorizontal ? 'width' : 'height']: `calc(100% - ${paneSize})`,
                            [isHorizontal ? 'height' : 'width']: '100%',
                        }}
                    >
                        {childrenArray[1]}
                    </div>
                </>
            ) : (
                <div className={`${styles.pane} ${paneClassName}`} style={{ ...paneStyle }}>
                    {childrenArray[0]}
                </div>
            )}
        </div>
    );
};

export default SplitPane;
