import {
    ReactNode,
    useState,
    CSSProperties,
    Children,
    useContext,
    DragEvent,
    MouseEvent,
} from 'react';

import { DragSourceT, TupleContextT } from '../TupleTypes';
import { TupleContext } from '..';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
    isDynamicTree: boolean,
    branchClassName?: string,
    branchDragOverClassName?: string,
    branchesClassName?: string,
    branchStyle?: CSSProperties,
    branchDragOverStyle?: CSSProperties,
    branchesStyle?: CSSProperties,
    path?: string[],
}


const Branch = ({
    text,
    children,
    open=false,
    isDynamicTree,
    branchClassName,
    branchesClassName,
    branchDragOverClassName,
    branchStyle={},
    branchDragOverStyle={},
    branchesStyle={},
    path=[]
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

    const onDragOverHandler = (e: DragEvent) => {
        e.stopPropagation();
        if (isDynamicTree)
            setIsDraggedOver(true);
    }
    const onDragLeaveHandler = (e: DragEvent) => {
        e.stopPropagation();
        setIsDraggedOver(false);
    }

    const onDropHandler = (e: DragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'branch');
        }
    };

    const onAddButtonClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        // TODO:
    };

    const onDeleteButtonClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        // TODO:
    };
    
    return (
        <div>
            <div
                className   ={ _branchClassName }
                style       ={ _branchStyle }
                onClick     ={ onClickHandler }
                onDragOver  ={ onDragOverHandler }
                onDragLeave ={ onDragLeaveHandler }
                onDrop      ={ onDropHandler }>
                { text }
                { isDynamicTree && (
                    <div className={_classes.branchButtonContainer}>
                        <div className={_classes.branchButton} onClick={onAddButtonClickHandler}>
                            { "\u271A" }
                        </div>
                        <div className={_classes.branchButton} onClick={onDeleteButtonClickHandler}>
                            {"\u2716" }
                        </div>
                    </div>
                )}
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
