import { useState } from 'react';

import {
    ViewT,
    SplitViewT,
    isViewT,
    isSplitViewT,
    DragEvent
} from "../../types"
import SplitPane from "../SplitPane";
import View from "./View";
import Draggable, { Props as DraggableProps } from '../Draggable';


const validateSplitView = (splitView: SplitViewT) => {
    if (splitView.direction == 'none') {
        if (!!splitView.tail) {
            console.warn('Views with diection "none" should have only one child.');
        }
    } else {
        if (!splitView.tail) {
            throw new Error(`"${splitView.direction}" views require two children`);
        }
    }
};


interface PortProps {
    view: SplitViewT | ViewT,
    createDraggable: DragEvent,
}


// TODO : This probably deserves its own file as well...
export const Port = ({
    view,
    createDraggable,
}: PortProps): JSX.Element => {
    if (isViewT(view)) {
        view = view as ViewT;
        return (
            <View
                id={view.id}
                pageIds={view.pageIds}
                activePageId={view.activePageId}
                createDraggable={createDraggable}
            />
        );
    } else if (isSplitViewT(view)) {
        view = view as SplitViewT;
        validateSplitView(view);
        return (
            <SplitPane
                dir={view.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { view.head && <Port view={view.head} createDraggable={createDraggable} /> }
                { view.tail && <Port view={view.tail} createDraggable={createDraggable} /> }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


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
            style: { background: 'lightgrey' },
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