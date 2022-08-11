import { CSSProperties, useContext, useState } from 'react';

import { ID, PageT, PagesT } from '../types';
import TabBar, { TabProps, StyleProps } from './TabBar';
import { LeafEvent } from './Leaf';
import { TupleContext } from './Tuple';
import Draggable, { Props as DraggableProps } from './Draggable';


interface Props {
    id: ID,
    pageIds: ID[],
    activePageId: ID,
    // TODO : Move Styles to Context
    styles?: CSSProperties,
}


const View = ({
    id,
    pageIds,
    activePageId,
    styles,
}: Props) => {
    const {pages}: {pages: PagesT} = useContext(TupleContext);
    const activePage: PageT = pages[activePageId];
    
    const [draggableProps, setDraggableProps] = useState<DraggableProps | null>();

    const createDraggable: LeafEvent = (e, leaf, leafView) => {
        console.log(e);
        setDraggableProps({
            text: leaf.innerText,
            style: { background: 'lightgrey' },
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null),
        } as DraggableProps);
    };

    // TODO : Typing could be better here
    const tabs = Object.entries<any>(pages).reduce<any>(
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

    return (
        <div style={_styles.container}>
            <TabBar
                tabs={tabs}
                styles={styles as StyleProps}
                createDraggable={createDraggable}
            />
            {activePage.component}
            { draggableProps && <Draggable {...draggableProps} /> }
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