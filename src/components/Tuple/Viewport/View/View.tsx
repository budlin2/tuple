import { useContext, useRef, MutableRefObject, Dispatch } from 'react';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { ViewportActionT } from '../ViewportTypes';

import _classes from '../viewport.module.css';
import { ID, PagesT, PageT, TupleClassesT, TupleStylesT } from '../../TupleTypes';


interface Props {
    portId: ID,
    pageIds: ID[],
    activePageId: ID,
    dispatch: Dispatch<ViewportActionT>,
}


const View = ({
    portId,
    pageIds,
    activePageId,
    dispatch,
}: Props) => {
    if (pageIds && pageIds.length <= 0) return null;

    const viewRef = useRef<HTMLDivElement>();
    const {pages, styles, classes}: {
        pages: PagesT,
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const activePage: PageT = pages[activePageId];
    const viewClassName = `${_classes?.view} ${classes?.view}`;

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} dispatch={dispatch}/>
            <activePage.component {...activePage.props } />
        </div>
    );
}

export default View;