import { useContext, useRef, MutableRefObject } from 'react';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { ID, PageT, TupleContextT } from '../../TupleTypes';

import _classes from '../viewport.module.css';
import DropZoneSides from '../../../Dropzone/DropZoneSides';
import DropZoneCenter from '../../../Dropzone/DropZoneCenter';


interface Props {
    portId: ID,
    pageIds: ID[],
    activePageId: ID,
}


const View = ({
    portId,
    pageIds,
    activePageId,
}: Props) => {
    if (pageIds && pageIds.length <= 0) return null;

    const viewRef = useRef<HTMLDivElement>();
    const {state: { pages, styles, classes }}: TupleContextT = useContext(TupleContext);

    const activePage: PageT = pages[activePageId];
    const viewClassName = `${_classes?.view} ${classes?.view}`;

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} />
            <DropZoneSides>
                <DropZoneCenter>
                    <activePage.component {...activePage.props } />
                </DropZoneCenter>
            </DropZoneSides>
        </div>
    );
}

export default View;