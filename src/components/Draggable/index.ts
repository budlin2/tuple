import { CSSProperties, DragEvent } from 'react';

import _classes from './draggable.module.css';


const DRAG_ID = 'DRAG_QUEEN_STORY_HOUR_LMAOOOOO';


// Returns id of element, so calling component can remove it later
export const setCustomDragImage = (
    e: DragEvent<HTMLDivElement>,
    text: string = 'Dragging',
    className: string = '',
    style: CSSProperties | null = null,
) => {
    const elem = document.createElement("div");
    
    elem.id = DRAG_ID;
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


export const cleanupDraggable = () => {
    const draggable = document.getElementById(DRAG_ID);
    if (draggable?.parentNode)
        draggable.parentNode.removeChild(draggable);
}
