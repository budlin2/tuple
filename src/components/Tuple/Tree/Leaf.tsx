import { CSSProperties, useContext } from 'react'
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { DRAGGING_ID } from '../state/browser-actions';
import { addTab, addNewView } from '../state/dispatchers';
import { ID, TupleContextT } from '../TupleTypes';
import { PortsT } from '../Viewport/ViewportTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    pageId: ID,
    style?: CSSProperties,
}


const Leaf = ({
    text,
    pageId,
}: Props) => {
    const {
        dispatch,
        state: {
            viewport,
            pages,
            classes,
            styles,
            template,
        }
    }: TupleContextT = useContext(TupleContext);

    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);

    const leafClassName = `
        ${_classes?.leaf || ''}
        ${template?.leaf || ''}
        ${classes?.leaf  || ''}`;

    const draggableClass = `
        ${template?.draggable || ''}
        ${classes?.draggable || ''}`;


    const getTopLeftPortIdHelper = (ports: PortsT, curPortId: ID): ID => {
        const currentPort = ports[curPortId];
        if (!currentPort)
            throw Error(`ID, ${curPortId}, missing from "ports"`);

        if (!ports[curPortId].isSplitView)
            return curPortId;

        return getTopLeftPortIdHelper(ports, currentPort.headId);
    }

    const getTopLeftPortId = (): ID => {
        const {root, ports} = viewport;
        return getTopLeftPortIdHelper(ports, root);
    }

    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
        e.dataTransfer.setData('pageId', pageId);
        setDragging(true);
    };

    const dragEndHandler = () => {
        cleanupDraggable();
        setDragging(false);
    }
    const onClickHandler = () => {
        if (Object.keys(pages).length <= 0) {
            addNewView(dispatch, pageId)
        }

        const topLeftPortId = getTopLeftPortId();
        addTab(dispatch, topLeftPortId, '', pageId);
    }

    return (
        <div
            style={styles.leaf}
            className={leafClassName}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onClick={onClickHandler}>
            { text }
        </div>
    );
};


export default Leaf;
