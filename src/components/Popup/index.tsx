import { CSSProperties, useEffect, useState } from 'react';

import { PopupItemsT } from './PopupTypes';

import _classes from './popup.module.css';
import { classNames } from '../../utils';
import { ID } from '../Tuple/TupleTypes';

export interface PopupStylesT {
    popup?:         CSSProperties,
    itemHover?:     CSSProperties,
    itemActive?:    CSSProperties,
    item?:          CSSProperties,
    hr?:            CSSProperties,
};

export interface PopupClassesT {
    popup?:         string,
    itemHover?:     string,
    itemActive?:    string,
    item?:          string,
    hr?:            string,
};

export interface Props {
    position: { x: number, y: number },
    items: PopupItemsT,
    classes?: PopupClassesT,
    styles?: PopupStylesT,
    onClose?: () => void,
}

const Popup = ({
    position: { x, y },
    items,
    classes,
    styles,
    onClose,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const [hoveredId, setHoveredId] = useState<ID>(null);
    const [activeId, setActiveId] = useState<ID>(null);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const popupClassName = classNames(_classes?.popup, classes?.popup);
    const popupStyle: CSSProperties = { ...styles?.popup, left: x, top: y };

    const itemClassNameBase = classNames(_classes?.item, classes?.item);
    const hrClassName = classNames(_classes?.hr, classes?.hr);

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const handleMouseEnter = (id: ID) => setHoveredId(id);
    const handleMouseLeave = () => setHoveredId(null);
    const handleMouseDown = (id: ID) => setActiveId(id);

    useEffect(() => (() => onClose()), []);

    return (
        <div className={popupClassName} style={popupStyle}>
            { items.map( item => {
                if (item == 'hr')
                    return <hr className={ hrClassName } style={ styles?.hr } />;

                const itemClassName = classNames(
                    itemClassNameBase,
                    hoveredId === item.id && classNames(_classes?.itemHover, classes?.itemHover),
                    activeId === item.id && classNames(_classes?.itemActive, classes?.itemActive),
                );

                const itemStyle = {
                    ...styles?.item,
                    ...( hoveredId === item.id ? styles?.itemHover : {} ),
                    ...( activeId === item.id ? styles?.itemActive : {} ),
                };

                return (
                    <div key={ item.id }
                        className       ={ itemClassName }
                        style           ={ itemStyle }
                        onClick         ={ item.onClick }
                        onMouseEnter    ={ () => handleMouseEnter(item.id) }
                        onMouseLeave    ={ handleMouseLeave }
                        onMouseDown     ={ () => handleMouseDown(item.id) }
                    >
                        { item.label }
                    </div>
                );
            })}
        </div>
    );
}


export default Popup;