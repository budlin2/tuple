import {
    ReactNode,
    useState,
    CSSProperties,
    Children,
    useContext,
    DragEvent as rDragEvent,
    MouseEvent as rMouseEvent,
} from 'react';

import { DragSourceT, ID, TupleContextT } from '../TupleTypes';
import { TupleContext } from '..';
import { PopupItemsT } from '../../Popup/PopupTypes';
import { PopupDetailsT } from './TreeTypes';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    id: ID,
    text: string,
    children: ReactNode,
    open?: boolean,
    branchClassName?: string,
    branchDragOverClassName?: string,
    branchesClassName?: string,
    branchStyle?: CSSProperties,
    branchDragOverStyle?: CSSProperties,
    branchesStyle?: CSSProperties,
    path: ID[],
    setPopupDetails?: (details: PopupDetailsT | null) => void,
    onRename?: (path: ID[], newName: string) => void,
    onDrop?: (e: rDragEvent) => void,
}


const Branch = ({
    id,
    text,
    children,
    open=false,
    branchClassName,
    branchesClassName,
    branchDragOverClassName,
    branchStyle={},
    branchDragOverStyle={},
    branchesStyle={},
    path=[],
    setPopupDetails=()=>{},
    onRename,
    onDrop,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        pages,
        events,
    }}: TupleContextT = useContext(TupleContext);

    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [expanded, setExpanded] = useState(open);

    // Set popup menu items
    const popupItems: PopupItemsT = [];
    if (onRename)
        popupItems.push({ id: 1, label: 'Rename', onClick: () => onRename(path.concat(id), 'foo')});  // TODO: How to rename?

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    // Branch needs its styling passed in as prop because both branches and roots use this component
    const _branchClassName = `
        ${_global_classes.noHighlight}
        ${branchClassName || ''}
        ${isDraggedOver ? branchDragOverClassName : ''}`;

    const _branchStyle = {
        ...branchStyle,
        // TODO: Hover styling
        ...(isDraggedOver ? branchDragOverStyle : {})
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onClickHandler = () => {
        if (Children.count(children))
            setExpanded(cur => !cur);
    }

    const onDragOverHandler = (e: rDragEvent) => {
        e.stopPropagation();
        const isDynamicTree = !!onDrop;
        if (isDynamicTree)
            setIsDraggedOver(true);
    }
    const onDragLeaveHandler = (e: rDragEvent) => {
        e.stopPropagation();
        setIsDraggedOver(false);
    }

    const onDropHandler = (e: rDragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'branch');
        }
    };

    const onRightClick = (event: rMouseEvent) => {
        if (!popupItems.length) return;


        event.preventDefault();

        const { clientX: x, clientY: y } = event;
        setPopupDetails({
            pos: { x, y },
            items: popupItems,
        });
    };
    
    return (
        <div>
            <div
                className       ={ _branchClassName }
                style           ={ _branchStyle }
                onClick         ={ onClickHandler }
                onDragOver      ={ onDragOverHandler }
                onDragLeave     ={ onDragLeaveHandler }
                onDrop          ={ onDropHandler }
                onContextMenu   ={ onRightClick }
            >
                { text }
            </div>
            { expanded && (
                <div className={branchesClassName} style={branchesStyle}>
                    { children }
                </div>
            )}
        </div>
    );
}


export default Branch;
