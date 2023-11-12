import {
    ReactNode,
    useState,
    CSSProperties,
    Children,
    useContext,
    DragEvent as rDragEvent,
    MouseEvent as rMouseEvent,
    KeyboardEvent as rKeyboardEvent,
    ChangeEvent as rChangeEvent,
    useRef,
    useEffect,
    useMemo,
} from 'react';

import { DragSourceT, ID, TupleContextT } from '../TupleTypes';
import { TupleContext } from '..';
import { PopupItemsT } from '../../Popup/PopupTypes';
import { NodeStateT, PopupDetailsT } from './TreeTypes';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';
import { classNames } from '../../../utils';


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
    const inputRef = useRef<HTMLInputElement>(null);
    const newNodeRef = useRef<HTMLInputElement>(null);

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

    const [branchName, setBranchName]       = useState(text);
    const [renaming, setRenaming]           = useState(false);

    // TODO: Add RENAMING to Node State
    const [nodeState, setNodeState]         = useState<NodeStateT>(NodeStateT.NULL);
    const [newNodeName, setNewNodeName]     = useState('');

    // memoize?
    const isAddingNode = (nodeState: NodeStateT) => nodeState === NodeStateT.ADDING_BRANCH || nodeState === NodeStateT.ADDING_LEAF;

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {   // Event Handlers for renaming branch
        if (renaming && inputRef.current) {
            inputRef.current.focus();
            document.addEventListener('click', onClickOutside_RENAME);
            document.addEventListener('contextmenu', onClickOutside_RENAME);
        } else {
            inputRef.current.blur();
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        }

        return () => {
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        };
    }, [renaming]);

    useEffect(() => { // Event Handlers for adding new node
        if (isAddingNode(nodeState) && newNodeRef.current) {
            newNodeRef?.current?.focus();
            document.addEventListener('click', onClickOutside_NEW_NODE);
            document.addEventListener('contextmenu', onClickOutside_NEW_NODE);
        } else {
            newNodeRef?.current?.blur();
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        }

        return () => {
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        };
    }, [nodeState]);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    // Branch needs its styling passed in as prop because both branches and roots use this component
    const _branchClassName = classNames(
        _global_classes.noHighlight,
        branchClassName || '',
        hovering && branchHoverClassName,
        isDraggedOver && branchDragOverClassName,
        renaming && branchActiveClassName,
    );

    const _branchesClassName = classNames(
        branchesClassName,
        hoveringBranches && branchesHoverClassName,
    );

    // TODO: Sharing this class with leafActive is noticeably awkward here... Maybe rethink API
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
        ...(renaming ? branchActiveStyle : {}),
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
    // Rename Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_RENAME = (e: rMouseEvent) => {
        e.stopPropagation();
        setRenaming(true);
        setPopupDetails(null);
    };

    const onKeyDown_RENAME = (e: rKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setRenaming(false);
            return;
        }

        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setRenaming(false);
            if (onRename)
                onRename(path.concat(id), branchName);
        }
    };

    const onChange_RENAME = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBranchName(value);
    };

    // Stop renaming if click occurs outside of input component
    const onClickOutside_RENAME = (e: MouseEvent) => {
        // Click occurred outside the component
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setRenaming(false);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // New Node Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_NEW_NODE = (e: rMouseEvent, nodeState: NodeStateT) => {
        e.stopPropagation();
        setExpanded(true);
        setNodeState(nodeState);
        setPopupDetails(null);
    };

    const onKeyDown_NEW_NODE = (e: rKeyboardEvent<HTMLInputElement>, nodeState: NodeStateT) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setNodeState(NodeStateT.NULL);
            return;
        }

        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();

            setNewNodeName('');

            setNodeState(NodeStateT.NULL);
            if (nodeState == NodeStateT.ADDING_BRANCH && onBranchAdd)
                onBranchAdd(path.concat(id), 0, newNodeName);

            if (nodeState == NodeStateT.ADDING_LEAF && onLeafAdd)
                onLeafAdd(path.concat(id), 0, newNodeName);
        }
    };

    const onChange_NEW_NODE = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewNodeName(value);
    };

    // Stop adding new node if click occurs outside of input component
    const onClickOutside_NEW_NODE = (e: MouseEvent) => {
        if (newNodeRef?.current && !newNodeRef?.current?.contains(e.target as Node)) {
            setNewNodeName('');
            setNodeState(NodeStateT.NULL);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // Popup Items
    //------------------------------------------------------------------------------------------------------------------
    const getPopupItems = (
        onRename:       (path: ID[], newName: string) => void,
        onDelete:       (path: ID[]) => void,
        onBranchAdd:    (path: ID[], position: number, branchName: string) => void,
        onLeafAdd:      (path: ID[], position: number, leafName: string) => void,
    ): PopupItemsT => {
        const popupItems: PopupItemsT = [];
        if (onRename)
            popupItems.push({ id: 1, label: 'Rename', onClick: onPopupClick_RENAME });

        if (onDelete)
            popupItems.push({ id: 2, label: 'Delete', onClick: () => onDelete(path.concat(id)) });

        if (onBranchAdd)
            popupItems.push({ id: 3, label: 'Add Branch', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_BRANCH) });

        if (onLeafAdd)
            popupItems.push({ id: 4, label: 'Add Leaf', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_LEAF) });

        return popupItems;
    };

    const popupItems = useMemo(() => getPopupItems(
        onRename, onDelete, onBranchAdd, onLeafAdd
    ), [onRename, onDelete, onBranchAdd, onLeafAdd]);
    
    return (
        <div style={{ overflow: 'hidden' }}>
            <input ref={inputRef} type="text"
                value           ={ branchName }
                readOnly        ={ !renaming }
                className       ={ _branchClassName }
                style           ={ _branchStyle }
                onClick         ={ onClickHandler }
                onMouseOver     ={ onMouseOverHandler }
                onMouseLeave    ={ onMouseLeaveHandler }
                onDragOver      ={ onDragOverHandler }
                onDragLeave     ={ onDragLeaveHandler }
                onDrop          ={ onDropHandler }
                onContextMenu   ={ onRightClickHandler }
                onKeyDown       ={ onKeyDown_RENAME }
                onChange        ={ onChange_RENAME }
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
                            onKeyDown   ={ e => onKeyDown_NEW_NODE(e, nodeState) }
                            onChange    ={ onChange_NEW_NODE }
                        />
                    )}
                    { children }
                </div>
            )}
        </div>
    );
}


export default Branch;
