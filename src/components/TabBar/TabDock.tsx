// TODO: Will probably delete this.

import {
    useRef,
    MutableRefObject,
    MouseEvent as rMouseEvent,
} from 'react';


export interface TabDockProps {}


export const TabDock = ({}) => {
    const tabDockRef = useRef<HTMLDivElement>();

    const handleDragEnter = (e: rMouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: rMouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragOver = (e: rMouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: rMouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    return (
        <div ref={tabDockRef as MutableRefObject<HTMLDivElement> }
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}>
        </div>
    );
};


// TODO : Working here.. need to move these to tabs.module.css
const _styles = {
};


export default TabDock;
