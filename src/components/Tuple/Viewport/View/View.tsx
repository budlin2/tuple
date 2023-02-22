import { useContext, useRef, MutableRefObject, DragEvent } from 'react';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { ID, PageT, TupleContextT } from '../../TupleTypes';

import { DropSideT } from '../../../Dropzone/DropZoneTypes';
import { addTab, addView } from '../../state/dispatchers';
import { validateDraggable } from '../../state';

import _classes from './view.module.css';
import ScrollPane from '../../../ScrollPane';
import DropZone from '../../../Dropzone';
import { DRAGGING_ID, set_dragged_to_different_viewport } from '../../state/browser-actions';
import { useLocalStorage } from 'usehooks-ts';

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
        state: { pages, styles, classes, viewportId, tabBarHeight }
    }: TupleContextT = useContext(TupleContext);

    const ActivePage: PageT = pages[activePageId];
    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false)

    const viewClassName = `
        ${_classes?.view || ''}
        ${classes?.view  || ''}`;

    const scrollPaneClassName = `
        ${_classes.contentContainer}
        ${classes.scrollPane}`;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const dropSideHandler = (e: DragEvent<Element>, side: DropSideT) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        setDragging(false);

        if (dragViewportId !== viewportId) {
            set_dragged_to_different_viewport(true);
        }

        addView(dispatch, portId, dragPortId, dragPageId, side);
    }

    const dropCenterHandler = (e: DragEvent<Element>) => {
        // TODO: Better interface for getting dataTransfer data
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        setDragging(false);

        if (dragViewportId !== viewportId) {
            set_dragged_to_different_viewport(true);
        }

        addTab(dispatch, portId, dragPortId, dragPageId);
    }

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} />
            <DropZone
                parentRef               = {viewRef}
                centerDropZoneStyle     = {styles.dropZoneCenter}
                sidesDropZoneStyle      = {styles.dropZoneSide}
                centerDropZoneClassName = {classes.dropZoneCenter}
                sidesDropZoneClassName  = {classes.dropZoneSide}
                offsetHeight            = {tabBarHeight}
                dropCenterCb            = {dropCenterHandler}
                dropSidesCb             = {dropSideHandler}
                validateDraggable       = {validateDraggable}>

                <ScrollPane className={scrollPaneClassName} style={styles?.scrollPane || null}>
                    <ActivePage.component {...ActivePage.props } />
                </ScrollPane>

            </DropZone>
        </div>
    );
}

export default View;