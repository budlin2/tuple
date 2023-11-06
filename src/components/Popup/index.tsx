import { CSSProperties, useEffect } from 'react';

import { PopupItemsT } from './PopupTypes';
import { classNames, getUniqueId } from '../../utils';
import Item, { ItemClassesT, ItemStylesT } from './Item';

import _classes from './popup.module.css';

export interface PopupStylesT extends ItemStylesT {
    popup?:         CSSProperties,
    hr?:            CSSProperties,
};

export interface PopupClassesT extends ItemClassesT {
    popup?:         string,
    hr?:            string,
};

export interface Props {
    position:   { x: number, y: number },
    items:      PopupItemsT,
    classes?:   PopupClassesT,
    styles?:    PopupStylesT,
    onClose?:   () => void,
}

const Popup = ({
    position: { x, y },
    items,
    classes,
    styles,
    onClose,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const popupClassName = classNames(_classes?.popup, classes?.popup);
    const popupStyle: CSSProperties = { ...styles?.popup, left: x, top: y };

    const itemClasses = {
        item:       classes?.item,
        itemHover:  classes?.itemHover,
        itemActive: classes?.itemActive,
    };

    const itemStyles = {
        item:       styles?.item,
        itemHover:  styles?.itemHover,
        itemActive: styles?.itemActive,
    };

    const hrClassName = classNames(_classes?.hr, classes?.hr);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    // TODO: WTF is this?
    useEffect(() => (() => onClose()), []);

    return (
        <div className={popupClassName} style={popupStyle}>
            { items.map( item => {
                if (item == 'hr')
                    return <hr key={ getUniqueId() } className={ hrClassName } style={ styles?.hr } />;

                return (
                    <Item key={ item.id }
                        classes ={ itemClasses }
                        styles  ={ itemStyles }
                        item    ={ item }
                    />
                );
            })}
        </div>
    );
}


export default Popup;