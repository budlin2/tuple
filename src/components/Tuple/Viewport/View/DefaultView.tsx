import { useContext, DragEvent } from 'react';
import { TupleContext } from '../..';

import DropZoneCenter from '../../../Dropzone/Center/DropZoneCenter';
import { validateDraggable } from '../../state';
import { addNewView } from '../../state/dispatchers';
import { TupleContextT } from '../../TupleTypes';

interface Props {}


const DefaultView = ({}: Props) => {
    const {
        dispatch,
        state: { styles, classes }
    }: TupleContextT = useContext(TupleContext);

    const dropHandler = (e: DragEvent<Element>) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
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
                    alignItems: 'center'
                }}>
                    Welcome to Tuple!
                </div>
        </DropZoneCenter>
    );
}


export default DefaultView;