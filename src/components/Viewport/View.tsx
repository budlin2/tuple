import { CSSProperties, useContext, useState, useRef, MutableRefObject, useEffect } from 'react';

import { ID, PageT, PagesT } from '../../types';
import TabBar, { TabProps, StyleProps } from './TabBar';
import { DragEvent } from '../../types';
import { TupleContext } from '../Tuple';


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
    createDraggable: DragEvent,
}


const View = ({
    id,
    pageIds,
    activePageId,
    styles,
    createDraggable,
}: Props) => {
    const {pages}: {pages: PagesT} = useContext(TupleContext);
    const activePage: PageT = pages[activePageId];

    const viewRef = useRef<HTMLDivElement>();
    const tabs = createTabs(pages, pageIds);

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            style={_styles.container}>
            <TabBar
                tabs={tabs}
                styles={styles as StyleProps}
                createDraggable={createDraggable}
            />
            <activePage.component {...activePage.props} />
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