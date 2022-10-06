import { useContext, useRef, MutableRefObject, useReducer, Dispatch } from 'react';

import {
    ID,
    PageT,
    PagesT,
    TupleStylesT,
    TupleClassesT,
    ViewportT,
    ViewT,
} from '../../../../types';
import TabBar from './TabBar';
import { TupleContext } from '../../TupleProvider';
import { ViewportActionT } from '../ViewportTypes';

import _classes from '../viewport.module.css';


interface Props {
    pageIds: ID[],
    activePageId: ID,
    dispatch: Dispatch<ViewportActionT>
}


const View = ({
    pageIds,
    activePageId,
    dispatch,
}: Props) => {
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
            <TabBar pids={pageIds} dispatch={dispatch}/>
            <activePage.component {...activePage.props } />
        </div>
    );
}

export default View;