import {
    ReactNode,
    useContext,
    MouseEvent as rMouseEvent,
    useRef,
    DragEvent,
    useState
} from 'react'

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { open_new_viewport_window, remove_storage_port_key, rename_storage_port, set_storage_port } from '../state/browser-actions';
import { ID, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';
import useContextMenu, { isAddingNode } from './useContextMenu';
import { PopupDetailsT } from './TreeTypes';
import { NodeStateT } from './useContextMenu/types';


interface Props {
    id:                 ID,
    text:               string,
    open:               boolean,
    openSymbol?:        string | ReactNode, //TODO: Maybe a part of context?
    closeSymbol?:       string | ReactNode,
    hoverSymbol?:       string | ReactNode,
    setPopupDetails?:   (details: PopupDetailsT | null) => void,
    onDelete?:          (id: ID) => void,
}


const Rootlet = ({
    id,
    text,
    open,
    closeSymbol ='\u25CB',
    openSymbol  ='\u25CF',
    hoverSymbol ='\u25C9',
    setPopupDetails,
    onDelete,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const [hovering, setHovering] = useState(false);
    const { state: { classes, styles } }: TupleContextT = useContext(TupleContext);

    const {
        inputRef,
        newNodeRef,
        nodeName,
        newNodeName,
        nodeState,
        popupItems,
    } = useContextMenu({
        initialNodeName: text,
        setPopupDetails,
        onRename:       (name: string) => rename_storage_port(id, name),
        onDelete:       () => onDelete(id),
    });

    const displaySymbol = open
        ? openSymbol
        : ( hovering
            ? hoverSymbol
            : closeSymbol
        );

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const symbolContainerClassName = classNames(_classes?.symbolContainer, classes?.symbolContainer);
    const rootletTextBoxClassName = classNames(_classes?.rootletTextBox, classes?.rootletTextBox);
    const draggableClass = classes?.draggable || '';

    const newNodeClassName = classNames(
        _classes?.rootlet_base,
        classes?.rootlet_base,
        _classes?.rootlet_renaming,
        classes?.rootlet_renaming
    );

    const rootletClassName = classNames(
        _classes?.rootlet_base,
        classes?.rootlet_base,
        hovering && _classes?.rootlet_hover,
        hovering && classes?.rootlet_hover,
    );

    const rootletStyle = {
        ...styles?.rootlet?.base,
        ...styles?.rootlet?.hover,
        ...(hovering ? styles?.rootlet?.hover : {})
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onMouseEnterHandler = () => setHovering(true);
    const onMouseLeaveHandler = () => setHovering(false);

    const onDragStartHandler = (e: DragEvent) => {
        // TODO:
        setCustomDragImage(e, nodeName, draggableClass, styles.draggable);
    }

    const onDragEndHandler = () => {
        // TODO:
        cleanupDraggable();
        open_new_viewport_window(nodeName);
    }

    const onRightClickHandler = (event: rMouseEvent) => {
        if (!popupItems.length) return;

        event.preventDefault();
        const { clientX: x, clientY: y } = event;

        setPopupDetails({
            items: popupItems,
            pos: { x, y }
        });
    };

    const onDoubleClickHandler = () => open_new_viewport_window(id);

    return (
        <div className={ rootletClassName } style={ rootletStyle }>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className={symbolContainerClassName} style={styles.symbolContainer}>
                    <strong>{ displaySymbol }</strong>
                </div>
                <input ref={ inputRef } type="text" draggable
                    value           ={ nodeName }
                    readOnly        ={ !(nodeState == NodeStateT.RENAMING) }
                    className       ={ rootletTextBoxClassName }
                    style           ={ styles.rootletTextBox }
                    onDoubleClick   ={ onDoubleClickHandler }
                    onMouseOver     ={ onMouseEnterHandler }
                    onMouseLeave    ={ onMouseLeaveHandler }
                    onDragStart     ={ onDragStartHandler }
                    onDragEnd       ={ onDragEndHandler }
                    onContextMenu   ={ onRightClickHandler }
                />
            </div>
            { (isAddingNode(nodeState)) && (
                <input ref={ newNodeRef } type="text"
                    value       ={ newNodeName }
                    className   ={ newNodeClassName }
                    style       ={ styles?.leaf?.renaming }
                />
            )}
        </div>
    );
};


export default Rootlet;
