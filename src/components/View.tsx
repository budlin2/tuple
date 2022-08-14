import { CSSProperties, useContext, useState, useRef, MutableRefObject, useEffect } from 'react';

import { ID, PageT, PagesT } from '../types';
import TabBar, { TabProps, StyleProps } from './TabBar';
import { DragEvent } from './Draggable';
import { TupleContext } from './Tuple';
import Draggable, { Props as DraggableProps } from './Draggable';


// TODO : Typing could be better here
const createTabs = (pages: PagesT, pageIds: ID[]) => Object.entries<any>(pages).reduce<any>(
    (acc, [key, value]) => {
        if (pageIds.includes(key)) {
            acc.push({
                id: key,
                label: value.name,
                view: value.component,
            } as TabProps);
        }
        return acc;
    }
    , [] as TabProps[]
);


interface Props {
    id: ID,
    pageIds: ID[],
    activePageId: ID,
    // TODO : Move Styles to Context
    styles?: CSSProperties,
    disableDraggable?: boolean,
    createDraggable?: DragEvent | null,
}


const View = ({
    id,
    pageIds,
    activePageId,
    styles,
    disableDraggable,
    createDraggable,
}: Props) => {
    // TODO : memoize this and check pageIDs against ids in context
    const validateProps = () => {
        if (createDraggable && !disableDraggable) {
            throw 'Local draggable needs to be disabled via "disableDraggable" prop when passing in "createDraggable" callback';
        }
    }

    validateProps();

    const {pages}: {pages: PagesT} = useContext(TupleContext);
    const activePage: PageT = pages[activePageId];

    const viewRef = useRef<HTMLDivElement>();
    const [draggableProps, setDraggableProps] = useState<DraggableProps | null>();

    const createLocalDraggable: DragEvent = (e, leaf, leafView) => {
        setDraggableProps({
            text: leaf.innerText,
            style: { background: 'lightgrey' },
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null),
        } as DraggableProps);
    };

    const tabs = createTabs(pages, pageIds);

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            style={_styles.container}>
            <TabBar
                tabs={tabs}
                styles={styles as StyleProps}
                createDraggable={createDraggable || createLocalDraggable}
            />
            {activePage.component}
            { !disableDraggable && draggableProps && <Draggable {...draggableProps} /> }
        </div>
    );
}


const _styles = {
    container: {
        height: '100%',
        width: '100%',
        background: 'green',
    }
};


export default View;