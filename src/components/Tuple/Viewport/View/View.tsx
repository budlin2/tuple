import { useContext, DragEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { ID, PageT, TupleContextT } from '../../TupleTypes';

import { DropSideT } from '../../../Dropzone/DropZoneTypes';
import { addTab, addView } from '../../state/dispatchers';
import { validateDraggable } from '../../state';
import ScrollPane from '../../../ScrollPane';
import DropZone from '../../../Dropzone';
import { DRAGGING_ID, set_dragged_to_different_viewport } from '../../state/browser-actions';

import _classes from './view.module.css';


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
    if (pageIds && pageIds.length <= 0)
        return null;

    const {
        dispatch,
        state: { pages, styles, classes, viewportId }
    }: TupleContextT = useContext(TupleContext);

    const ActivePage: PageT = pages[activePageId];
    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false)

    const viewClassName = `
        ${_classes?.view || ''}
        ${classes?.view  || ''}`;

    const scrollPaneClassName = `
        ${_classes.contentContainer}
        ${classes.scrollPane}`;

    const pageClassName = `
        ${_classes.page}
        ${classes.page}`;

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
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} />
            <DropZone
                dropZoneRootStyle       = {styles.page}
                centerDropZoneStyle     = {styles.dropZoneCenter}
                sidesDropZoneStyle      = {styles.dropZoneSide}
                dropZoneRootClassName   = {classes.page}
                centerDropZoneClassName = {classes.dropZoneCenter}
                sidesDropZoneClassName  = {classes.dropZoneSide}
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