import {
    useState,
    useEffect,
    useRef,
    useMemo,
    MouseEvent as rMouseEvent,
} from "react";

import { NodeStateT } from "./types";
import { PopupItemsT } from "../../../Popup/PopupTypes";
import { PopupDetailsT } from "../TreeTypes";


// Don't overthink this hook. It merely exists to combine common logic for leaf, branch, and rootlet input components


export const isAddingNode = (nodeState: NodeStateT) => nodeState === NodeStateT.ADDING_BRANCH || nodeState === NodeStateT.ADDING_LEAF;


interface Props {
    initialNodeName:    string,
    setPopupDetails:    (details: PopupDetailsT | null) => void,
    onRename?:          (name: string) => void,
    onDelete?:          () => void,
    onBranchAdd?:       (name: string) => void,
    onLeafAdd?:         (name: string) => void,
};


const useDynamicInputNode = ({
    initialNodeName,
    setPopupDetails,
    onRename,
    onDelete,
    onBranchAdd,
    onLeafAdd,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const newNodeRef = useRef<HTMLInputElement>(null);

    const [nodeName, setNodeName]       = useState(initialNodeName);
    const [newNodeName, setNewNodeName] = useState('');
    const [nodeState, setNodeState]     = useState<NodeStateT>(NodeStateT.NULL);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {  // Event Handlers for renaming node
        if (nodeState == NodeStateT.RENAMING && inputRef.current) {
            inputRef?.current?.focus();
            inputRef?.current?.addEventListener('keydown', onKeyDown_RENAME);
            inputRef?.current?.addEventListener('input', onChange_RENAME);
            document.addEventListener('click', onClickOutside_RENAME);
            document.addEventListener('contextmenu', onClickOutside_RENAME);
        } else {
            inputRef?.current?.blur();
            inputRef?.current?.removeEventListener('keydown', onKeyDown_RENAME);
            inputRef?.current?.removeEventListener('input', onChange_RENAME);
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        }

        return () => {
            inputRef?.current?.removeEventListener('keydown', onKeyDown_RENAME);
            inputRef?.current?.removeEventListener('input', onChange_RENAME);
            document.removeEventListener('click', onClickOutside_RENAME);
            document.removeEventListener('contextmenu', onClickOutside_RENAME);
        };
    }, [nodeState]);

    useEffect(() => { // Event Handlers for adding new node
        if (isAddingNode(nodeState) && newNodeRef.current) {
            newNodeRef?.current?.focus();
            newNodeRef?.current?.addEventListener('keydown', onKeyDown_NEW_NODE);
            newNodeRef?.current?.addEventListener('input', onChange_NEW_NODE);
            document.addEventListener('click', onClickOutside_NEW_NODE);
            document.addEventListener('contextmenu', onClickOutside_NEW_NODE);
        } else {
            newNodeRef?.current?.blur();
            newNodeRef?.current?.removeEventListener('keydown', onKeyDown_NEW_NODE);
            newNodeRef?.current?.removeEventListener('input', onChange_NEW_NODE);
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        }

        return () => {
            newNodeRef?.current?.removeEventListener('keydown', onKeyDown_NEW_NODE);
            newNodeRef?.current?.removeEventListener('input', onChange_NEW_NODE);
            document.removeEventListener('click', onClickOutside_NEW_NODE);
            document.removeEventListener('contextmenu', onClickOutside_NEW_NODE);
        };
    }, [nodeState]);

    //------------------------------------------------------------------------------------------------------------------
    // Rename Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_RENAME = (e: rMouseEvent) => {
        e.stopPropagation();
        setNodeState(NodeStateT.RENAMING);
        setPopupDetails(null);
    };

    const onKeyDown_RENAME = (e: KeyboardEvent) => {
        const { value: inputValue } = e?.target as HTMLInputElement;

        if (e.key === 'Escape') {
            e.preventDefault();
            setNodeState(NodeStateT.NULL);
            return;
        }

        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();

            if (onRename)
                onRename(inputValue);

            setNodeState(NodeStateT.NULL);
            return;
        }
    };

    const onChange_RENAME = (e: Event) => {
        const { value: inputValue } = e?.target as HTMLInputElement;
        setNodeName(inputValue);
    };

    // Stop renaming if click occurs outside of input component
    const onClickOutside_RENAME = (e: MouseEvent) => {
        if (inputRef?.current && !inputRef?.current?.contains(e.target as Node)) {
            setNodeState(NodeStateT.NULL);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // New Node Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onPopupClick_NEW_NODE = (e: rMouseEvent, nodeState: NodeStateT) => {
        e.stopPropagation();
        setNodeState(nodeState);
        setPopupDetails(null);
    };

    // TODO: Probably don't need to pass nodeState in...
    const onKeyDown_NEW_NODE = (e: KeyboardEvent) => {
        const { value: inputValue } = e?.target as HTMLInputElement;

        if (e.key === 'Escape') {
            e.preventDefault();
            setNodeState(NodeStateT.NULL);
            return;
        }

        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();

            if (nodeState == NodeStateT.ADDING_BRANCH && onBranchAdd)
                onBranchAdd(inputValue);

            if (nodeState == NodeStateT.ADDING_LEAF && onLeafAdd)
                onLeafAdd(inputValue);

            setNewNodeName('');
            setNodeState(NodeStateT.NULL);
            return;
        }
    };

    const onChange_NEW_NODE = (e: Event) => {
        const { value: inputValue } = e?.target as HTMLInputElement;
        setNewNodeName(inputValue);
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
        onRename:       ((name: string) => void) | undefined,
        onDelete:       (() => void) | undefined,
        onBranchAdd:    ((name: string) => void) | undefined,
        onLeafAdd:      ((name: string) => void) | undefined,
    ): PopupItemsT => {
        const popupItems: PopupItemsT = [];
        if (onRename)
            popupItems.push({ id: 1, label: 'Rename', onClick: onPopupClick_RENAME });

        if (onDelete)
            popupItems.push({ id: 2, label: 'Delete', onClick: () => onDelete() });

        if (onBranchAdd)
            popupItems.push({ id: 3, label: 'Add Branch', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_BRANCH) });

        if (onLeafAdd)
            popupItems.push({ id: 4, label: 'Add Leaf', onClick: e => onPopupClick_NEW_NODE(e, NodeStateT.ADDING_LEAF) });

        return popupItems;
    };

    const popupItems = useMemo( () => getPopupItems(
        onRename, onDelete, onBranchAdd, onLeafAdd
    ), [onRename, onDelete, onBranchAdd, onLeafAdd] );

    return {
        inputRef,
        newNodeRef,
        nodeName,
        newNodeName,
        nodeState,
        popupItems,
        setNodeState,
    };
};

export default useDynamicInputNode;