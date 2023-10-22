import { CSSProperties, ReactElement, useState, useEffect } from 'react';

import _classes from './ScrollPane.module.css';
import { classNames } from '../../utils';


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
    // State
    const [isScrolling, setIsScrolling] = useState(false);

    // Effects
    useEffect(() => {
        if (isScrolling) {
           setTimeout(() => setIsScrolling(false), 750);
        }
    }, [isScrolling, setIsScrolling]);

    // Styling
    const scrollPaneClassName = classNames(
        className,
        _classes.scrollpane,
        !isScrolling && _classes.scrollpaneHidden,
    );

    // Event Handlers
    const onScrollHandler = () => setIsScrolling(true);

    return (
        <div className={scrollPaneClassName}
            style={style}
            onScroll={onScrollHandler}
        >
            { children }
        </div>
    );
}


export default ScrollPane;