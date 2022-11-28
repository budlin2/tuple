import { CSSProperties, DragEvent } from 'react';

import _classes from './draggable.module.css';

export const setCustomDragImage = (
    e: DragEvent<HTMLDivElement>,
    text: string = 'Dragging',
    className: string = '',
    style: CSSProperties | null = null,
) => {
    const elem = document.createElement("div");
    console.log(elem);
    
    elem.innerText = text;
    elem.className = `${_classes.draggable} ${className}`;

    if (style) {  // hacky
        for (const prop in style) {
            elem.style[prop as any] = (style as any)[prop];
        }
    }
    
    document.body.appendChild(elem);
    e.dataTransfer.setDragImage(elem, 20, 10);
}
