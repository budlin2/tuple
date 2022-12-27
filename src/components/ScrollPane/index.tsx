import { CSSProperties, ReactElement, useState, useEffect } from 'react';

import _classes from './ScrollPane.module.css';


export interface Props {
    style?      : CSSProperties,
    className?  : string,
    children    : ReactElement,
}


const ScrollPane = ({
    style,
    className,
    children,
}: Props) => {
    const scrollPaneClasses = `${_classes.scrollpane} ${className}`;
    const [_className, setClassName] = useState(scrollPaneClasses);
    const [isScrolling, setIsScrolling] = useState(false);

    const onScrollHandler = () => setIsScrolling(true);

    useEffect(() => {
        if (isScrolling) {
           setClassName(scrollPaneClasses);
           setTimeout(() => setIsScrolling(false), 1000);
        } else {
            setClassName(`${scrollPaneClasses} ${_classes.scrollpaneHidden}`);
        }
    }, [isScrolling]);

    return (
        <div className={_className} style={style} onScroll={onScrollHandler}>
            { children }
        </div>
    );
}


export default ScrollPane;