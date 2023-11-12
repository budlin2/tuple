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
import { PopupDetailsT } from './TreeTypes';
import { NodeStateT } from './useDynamicInputNode/types';
import { classNames } from '../../../utils';
import useDynamicInputNode, { isAddingNode } from './useDynamicInputNode';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    id:                         ID,
    text:                       string,
    path:                       ID[],
    children:                   ReactNode,
    open?:                      boolean,

    branchClassName?:           string,
    branchHoverClassName?:      string,
    branchDragOverClassName?:   string,
    branchActiveClassName?:     string,

    branchesClassName?:         string,
    branchesHoverClassName?:    string,

    branchStyle?:               CSSProperties,
    branchHoverStyle?:          CSSProperties,
    branchDragOverStyle?:       CSSProperties,
    branchActiveStyle?:         CSSProperties,

    branchesStyle?:             CSSProperties,
    branchesHoverStyle?:        CSSProperties,

    setPopupDetails?:           (details: PopupDetailsT | null) => void,
    onRename?:                  (path: ID[], newName: string) => void,
    onDelete?:                  (path: ID[]) => void,
    onBranchAdd?:               (path: ID[], position: number, branchName: string) => void,
    onLeafAdd?:                 (path: ID[], position: number, leafName: string) => void,
    onDrop?:                    (e: rDragEvent) => void,
}


const Branch = ({
    id,
    text,
    children,
    open=false,

    branchClassName,
    branchHoverClassName,
    branchDragOverClassName,
    branchActiveClassName,

    branchesClassName,
    branchesHoverClassName,

    branchStyle={},
    branchHoverStyle={},
    branchDragOverStyle={},
    branchActiveStyle={},

    branchesStyle={},
    branchesHoverStyle,

    path=[],
    setPopupDetails=()=>{},
    onRename,
    onDelete,
    onBranchAdd,
    onLeafAdd,
    onDrop,
}: Props) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        pages,
        events,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const [hovering, setHovering]           = useState(false);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [expanded, setExpanded]           = useState(open);
    const [hoveringBranches, setHoveringBranches] = useState(false);

    const {
        inputRef,
        newNodeRef,
        nodeName,
        newNodeName,
        nodeState,
        popupItems,
        setNodeState,
    } = useDynamicInputNode({
        initialNodeName: text,
        setPopupDetails,
        onRename:       (name: string) => onRename(path.concat(id), name),
        onDelete:       () => onDelete(path.concat(id)),
        onBranchAdd:    (name: string) => onBranchAdd(path.concat(id), 0, name),
        onLeafAdd:      (name: string) => onLeafAdd(path.concat(id), 0, name),
    });

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    // Branch needs its styling passed in as prop because both branches and roots use this component
    const _branchClassName = classNames(
        _global_classes.noHighlight,
        branchClassName || '',
        hovering && branchHoverClassName,
        isDraggedOver && branchDragOverClassName,
        nodeState == NodeStateT.RENAMING && branchActiveClassName,
    );

    const _branchesClassName = classNames(
        branchesClassName,
        hoveringBranches && branchesHoverClassName,
    );

    const newNodeClassName = classNames(
        _classes?.branch_base,
        classes?.branch_base,
        _classes?.branch_renaming,
        classes?.branch_renaming,
    );

    const _branchStyle = {
        ...branchStyle,
        ...hovering ? branchHoverStyle : {},
        ...(isDraggedOver ? branchDragOverStyle : {}),
        ...(nodeState == NodeStateT.RENAMING ? branchActiveStyle : {}),
    };

    const _branchesStyle = {
        ...branchesStyle,
        ...hoveringBranches ? branchesHoverStyle : {},
    };

    const newNodeStyle = {
        ...styles?.branch?.base,
        ...styles?.branch?.renaming,
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onClickHandler = (e: rMouseEvent) => {
        e.stopPropagation();

        // TODO: What to do about click outsides when renaming or adding node?
        setNodeState(NodeStateT.NULL)

        if (Children.count(children))
            setExpanded(cur => !cur);
    };

    const onMouseOverHandler = () => setHovering(true);
    const onMouseLeaveHandler = () => setHovering(false);

    const onDragOverHandler = (e: rDragEvent) => {
        e.stopPropagation();
        const isDynamicTree = !!onDrop;
        if (isDynamicTree)
            setIsDraggedOver(true);
    };

    const onDragLeaveHandler = (e: rDragEvent) => {
        e.stopPropagation();
        setIsDraggedOver(false);
    };

    const onDropHandler = (e: rDragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'branch');
        }
    };

    const onRightClickHandler = (e: rMouseEvent) => {
        if (!popupItems.length) return;

        e.preventDefault();

        const { clientX: x, clientY: y } = e;
        setPopupDetails({
            pos: { x, y },
            items: popupItems,
        });
    };

    const onBranchesMouseOverHandler = () => setHoveringBranches(true);
    const onBranchesMouseLeaveHandler = () => setHoveringBranches(false);

    //------------------------------------------------------------------------------------------------------------------
    // Render
    //------------------------------------------------------------------------------------------------------------------
    
    return (
        <div style={{ overflow: 'hidden' }}>
            <input ref={inputRef} type="text"
                value           ={ nodeName }
                readOnly        ={ !(nodeState == NodeStateT.RENAMING) }
                className       ={ _branchClassName }
                style           ={ _branchStyle }
                onClick         ={ onClickHandler }
                onMouseOver     ={ onMouseOverHandler }
                onMouseLeave    ={ onMouseLeaveHandler }
                onDragOver      ={ onDragOverHandler }
                onDragLeave     ={ onDragLeaveHandler }
                onDrop          ={ onDropHandler }
                onContextMenu   ={ onRightClickHandler }
            />

            { expanded && (
                <div className={ _branchesClassName }
                    style       ={ _branchesStyle }
                    onMouseOver ={ onBranchesMouseOverHandler }
                    onMouseLeave={ onBranchesMouseLeaveHandler }
                >
                    { (isAddingNode(nodeState)) && (
                        <input ref={newNodeRef} type="text"
                            value       ={ newNodeName }
                            className   ={ newNodeClassName }
                            style       ={ newNodeStyle }
                        />
                    )}
                    { children }
                </div>
            )}
        </div>
    );
}


export default Branch;
