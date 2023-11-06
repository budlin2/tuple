import React, { useState } from 'react';

import { PopupItemT } from './PopupTypes';

import _classes from './popup.module.css';
import { classNames } from '../../utils';

export interface ItemClassesT {
    item?:          string,
    itemHover?:     string,
    itemActive?:    string,
};

export interface ItemStylesT {
    item?:          React.CSSProperties,
    itemHover?:     React.CSSProperties,
    itemActive?:    React.CSSProperties,
};

interface Props {
    classes?:       ItemClassesT,
    styles?:        ItemStylesT,
    item:           PopupItemT,
};

const Item = ({
    classes,
    styles,
    item,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const [hovered, setHovered] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const itemClassName = classNames(
        classNames(_classes?.item, classes?.item ),
        hovered && classNames(_classes?.itemHover, classes?.itemHover),
        active && classNames(_classes?.itemActive, classes?.itemActive),
    );

    console.log(itemClassName)
    
    const itemStyle = {
        ...styles?.item,
        ...( hovered ? styles?.itemHover : {} ),
        ...( active ? styles?.itemActive : {} ),
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);

    return (
        <div key={ item.id }
            className       ={ itemClassName }
            style           ={ itemStyle }
            onClick         ={ item.onClick }
            onMouseEnter    ={ handleMouseEnter }
            onMouseLeave    ={ handleMouseLeave }
            onMouseDown     ={ handleMouseDown }
            onMouseUp       ={ handleMouseUp }
        >
            { item.label }
        </div>
    );
};

export default Item;