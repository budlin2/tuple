import { CSSProperties, useContext, useRef, MutableRefObject } from 'react';

import { ID, PageT, PagesT, TupleStylesT, TupleClassesT } from '../../types';
import TabBar from '../TabBar';
import { TabProps } from '../TabBar/Tab';
import { TupleContext } from '../Tuple/TupleProvider';

import _classes from './views.module.css';


interface Props {
    id: ID,
    pageIds: ID[],
    activePageId: ID,
    // TODO : Move Styles to Context
    styles?: CSSProperties,
}


const View = ({
    id, // TODO : Does View need an ID?
    pageIds,
    activePageId,
}: Props) => {
    const viewRef = useRef<HTMLDivElement>();
    const {pages, styles, classes}: {
        pages: PagesT,
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const activePage: PageT = pages[activePageId];

    // TODO : Probably want to memoize buildXxxx() functions
    const buildTabs = (pageIds: ID[]) => pageIds.map(
        (pid: ID) => ({
            pageId: pid,
            removeTab: (id: ID) => {},
        })
    );

    const tabs = buildTabs(pageIds);
    const viewClassName = `${_classes?.view} ${classes?.view}`;

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar tabs={tabs} />
            <activePage.component {...activePage.props} />
        </div>
    );
}


export default View;