import { CSSProperties, ReactNode, useState } from 'react';

import classes from './bubble.module.css';
import global_classes from '../styles.module.css';

export interface Props {
    children?: ReactNode,
    visible?: boolean,
    style?: CSSProperties,
    className?: string,
    onClick?: () => void,
}

// TODO: This component may prevent text from being highlighted if it sits behind this component
// This is because when hidden, the component is still rendered, but with opacity 0
// If this becomes an issue, I may need to use a different approach
const Bubble = ({
    children = null,
    visible = false,
    style,
    className,
    onClick,
}: Props) => {
    const [hidden, setHidden] = useState(!visible);

    const bubbleClassName = `
        ${global_classes.noHighlight}
        ${classes.bubble || ''}
        ${className || ''}
        ${hidden ? classes.bubbleHidden : classes.bubbleVisible}
    `;

    const onMouseLeave = () => {
        if (visible) return; // Always visible. Don't update state
        setHidden(true);
    };

    const onMouseOver = () => {
        if (visible) return; // Always visible. Don't update state
        setHidden(false);
    };

    return (
        <div className={bubbleClassName}
            style={style}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClick}>
            { children || 'Tuple' }
        </div>
    );
}


export default Bubble;