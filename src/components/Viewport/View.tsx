import { CSSProperties, useContext, useState, useRef, MutableRefObject, useEffect } from 'react';

import { ID, PageT, PagesT, TupleStylesT } from '../../types';
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
    id, // TODO : Does View need an ID?
    pageIds,
    activePageId,
    createDraggable,
}: Props) => {
    const {pages, styles}: {pages: PagesT, styles: TupleStylesT} = useContext(TupleContext);
    const activePage: PageT = pages[activePageId];

    const viewRef = useRef<HTMLDivElement>();
    const tabs = createTabs(pages, pageIds);

    const viewStyle = {..._styles.view, ...styles.view}

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            style={viewStyle}>
            <TabBar
                tabs={tabs}
                createDraggable={createDraggable}
            />
            <activePage.component {...activePage.props} />
        </div>
    );
}


const _styles = {
    view: {
        height: '100%',
        width: '100%',
        background: 'green',
    }
};


export default View;