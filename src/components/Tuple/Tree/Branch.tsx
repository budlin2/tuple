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
import { PopupDetailsT } from './TreeTypes';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';
import { classNames } from '../../../utils';


interface Props {
    id: ID,
    text: string,
    children: ReactNode,
    open?: boolean,
    branchClassName?: string,
    branchHoverClassName?: string,
    branchDragOverClassName?: string,
    branchActiveClassName?: string,
    branchesClassName?: string,
    branchStyle?: CSSProperties,
    branchHoverStyle?: CSSProperties,
    branchDragOverStyle?: CSSProperties,
    branchActiveStyle?: CSSProperties,
    branchesStyle?: CSSProperties,
    path: ID[],
    setPopupDetails?: (details: PopupDetailsT | null) => void,
    onRename?: (path: ID[], newName: string) => void,
    onDelete?: (path: ID[]) => void,
    onDrop?: (e: rDragEvent) => void,
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
    branchStyle={},
    branchHoverStyle={},
    branchDragOverStyle={},
    branchActiveStyle={},
    branchesStyle={},
    path=[],
    setPopupDetails=()=>{},
    onRename,
    onDelete,
    onDrop,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        pages,
        events,
    }}: TupleContextT = useContext(TupleContext);

    const [hovering, setHovering] = useState(false);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [expanded, setExpanded] = useState(open);
    const [branchName, setBranchName] = useState(text);
    const [renaming, setRenaming] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (renaming && inputRef.current) {
            inputRef.current.focus();
            document.addEventListener('click', onClickOutsideHandler);
            document.addEventListener('contextmenu', onClickOutsideHandler);
        } else {
            inputRef.current.blur();
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('contextmenu', onClickOutsideHandler);
        }

        return () => {
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('contextmenu', onClickOutsideHandler);
        };
    }, [renaming]);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    // Branch needs its styling passed in as prop because both branches and roots use this component
    const _branchClassName = classNames(
        _global_classes.noHighlight,
        branchClassName || '',
        hovering ? branchHoverClassName : '',
        isDraggedOver ? branchDragOverClassName : '',
        renaming ? branchActiveClassName : '',
    );

    const _branchStyle = {
        ...branchStyle,
        ...hovering ? branchHoverStyle : {},
        ...(isDraggedOver ? branchDragOverStyle : {}),
        ...(renaming ? branchActiveStyle : {}),
    };

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onClickHandler = (e: rMouseEvent) => {
        e.stopPropagation();
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

    const onRenameClickHandler = (e: rMouseEvent) => {
        e.stopPropagation();
        setRenaming(true);
        setPopupDetails(null);
    };

    const onKeyDownHandler = (e: rKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setRenaming(false);
            if (onRename)
                onRename(path.concat(id), branchName);
        }
      };

    const onChangeHandler = (e: rChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBranchName(value);
    };

    // Close renaming if click occurs outside of input component
    const onClickOutsideHandler = (e: MouseEvent) => {
        // Click occurred outside the component
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setRenaming(false);
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // Popup Items
    //------------------------------------------------------------------------------------------------------------------
    const getPopupItems = (
        onRename: (path: ID[], newName: string) => void,
        onDelete: (path: ID[]) => void,
    ): PopupItemsT => {
        const popupItems: PopupItemsT = [];
        if (onRename)
            popupItems.push({ id: 1, label: 'Rename', onClick: onRenameClickHandler });

        if (onDelete)
            popupItems.push({ id: 2, label: 'Delete', onClick: () => onDelete(path.concat(id)) });

        return popupItems;
    };

    const popupItems = useMemo(() => getPopupItems(onRename, onDelete), [onRename, onDelete]);
    
    return (
        <div>
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
                onKeyDown       ={ onKeyDownHandler }
                onChange        ={ onChangeHandler }/>
            { expanded && (
                <div className={branchesClassName} style={branchesStyle}>
                    { children }
                </div>
            )}
        </div>
    );
}


export default Branch;
