import { CSSProperties, useContext } from 'react'

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { addTab } from '../state/dispatchers';
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
            viewportId,
            classes,
            styles,
            template,
        }
    }: TupleContextT = useContext(TupleContext);

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
    };

    const dragEndHandler = (e: any) => cleanupDraggable();
    const onClickHandler = () => {
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
