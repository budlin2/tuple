import { useState } from 'react';

import {
    SplitViewT,
    DragEvent
} from '../../types';
import Port from './Port';
import Draggable, { Props as DraggableProps } from '../Draggable';


export interface Props {
    views: SplitViewT,
    createDraggable?: DragEvent,
}


const Viewport = ({
    views,
    createDraggable,
}: Props) => {
    // if parent passes in createDraggable, it is responsible
    // for the draggable, otherwise this component is
    const [draggableProps, setDraggableProps] = createDraggable
        ? [null, null]
        : useState<DraggableProps | null>();

    const createLocalDraggable: DragEvent = (e, leaf, leafView) => {
        setDraggableProps && setDraggableProps({
            text: leaf.innerText,
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null),
        } as DraggableProps);
    };

    return (
        <div style = {_styles.root}>
            <Port view={views} createDraggable={createDraggable || createLocalDraggable} />
            { draggableProps && <Draggable {...draggableProps} /> }
        </div>
    )
};


const _styles = {
    root: {
        height: '100%',
        width: '100%',
    }
}


export default Viewport;