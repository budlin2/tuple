import { useContext, DragEvent } from 'react';
import { TupleContext } from '../..';

import DropZoneCenter from '../../../Dropzone/Center/DropZoneCenter';
import { set_dragged_to_different_viewport } from '../../state/browser-actions';
import { addNewView } from '../../state/dispatchers';
import { TupleContextT } from '../../TupleTypes';
import { validateDraggable } from '../../../Draggable';

interface Props {}


const DefaultView = ({}: Props) => {
    const {
        dispatch,
        state: { styles, classes, viewportId }
    }: TupleContextT = useContext(TupleContext);

    const dropHandler = (e: DragEvent<Element>) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');

        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        if (dragViewportId !== viewportId) {
            set_dragged_to_different_viewport(true);
        }

        addNewView(dispatch, dragPageId);
    }

    return (
        <DropZoneCenter
            style={styles.dropZoneCenter}
            className={classes.dropZoneCenter}
            onDropCB={dropHandler}
            validateDraggable={validateDraggable}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    Welcome to Tuple!
                </div>
        </DropZoneCenter>
    );
}


export default DefaultView;