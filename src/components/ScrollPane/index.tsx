import { CSSProperties, ReactElement } from 'react';

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
    const _className = `${_classes.scrollpane} ${className}`;

    return (
        <div className={_className} style={style}>
            { children }
        </div>
    );
}


export default ScrollPane;