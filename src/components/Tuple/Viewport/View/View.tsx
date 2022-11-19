import { useContext, useRef, MutableRefObject, DragEvent } from 'react';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { AddViewActionT, AddViewPayloadT, ID, PageT, TupleActionKind, TupleContextT } from '../../TupleTypes';

import _classes from '../viewport.module.css';
import DropZoneSides from '../../../Dropzone/DropZoneSides';
import DropZoneCenter from '../../../Dropzone/DropZoneCenter';
import { DropSideT } from '../../../Dropzone/DropZoneTypes';
import { SideT } from '../../../SplitPane/SplitPaneTypes';


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
    const {
        dispatch,
        state: { pages, styles, classes }
    }: TupleContextT = useContext(TupleContext);

    const activePage: PageT = pages[activePageId];
    const viewClassName = `${_classes?.view} ${classes?.view}`;

    const onDropSideHandler = (e: DragEvent<Element>, side: DropSideT) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const addViewPayload: AddViewPayloadT = {
            dragPortId,
            portId: portId,
            pageId: dragPageId,
            side: SideT.NULL,
            direction: 'none',
        };

        switch(side) {
            case DropSideT.TOP:
                addViewPayload.side = SideT.HEAD;
                addViewPayload.direction = "vertical";
                break;
            case DropSideT.RIGHT:
                addViewPayload.side = SideT.TAIL;
                addViewPayload.direction = "horizontal";
                break;
            case DropSideT.BOTTOM:
                addViewPayload.side = SideT.TAIL;
                addViewPayload.direction = "vertical";
                break;
            case DropSideT.LEFT:
                addViewPayload.side = SideT.HEAD;
                addViewPayload.direction = "horizontal";
                break;
            default:
                throw Error('Unknown side.')
        }

        const addViewAction: AddViewActionT = {
            type: TupleActionKind.ADD_VIEW,
            payload: addViewPayload,
        };

        dispatch(addViewAction);
    }

    const validateDraggable = (e: DragEvent<Element>, side: DropSideT) => {
        // TODO:
    }

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} />
            <DropZoneSides onDropCB={onDropSideHandler}>
                <DropZoneCenter>
                    <activePage.component {...activePage.props } />
                </DropZoneCenter>
            </DropZoneSides>
        </div>
    );
}

export default View;