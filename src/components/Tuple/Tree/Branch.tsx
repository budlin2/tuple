import {
    ReactNode,
    useState,
    CSSProperties,
    Children,
    useContext,
    DragEvent,
} from 'react';

import { DragSourceT, TupleContextT } from '../TupleTypes';
import { TupleContext } from '..';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
    branchClassName?: string,
    branchesClassName?: string,
    branchStyle?: CSSProperties,
    branchesStyle?: CSSProperties,
    path?: string[],
}


const Branch = ({
    text,
    children,
    open=false,
    branchClassName,
    branchesClassName,
    branchStyle={},
    branchesStyle={},
    path=[]
}: Props) => {
    const { state: {
        pages,
        events,
    }}: TupleContextT = useContext(TupleContext);

    const [expanded, setExpanded] = useState(open);

    // Branch needs its styling passed in as prop because both branches and roots use this component
    const _branchClassName = `
        ${_global_classes.noHighlight}
        ${branchClassName || ''}`;

    const clickHandler = () => {
        if (Children.count(children))
            setExpanded(cur => !cur);
    }

    const dragOverHandler = (e: DragEvent) => {
        if (events?.onTreeDrop)
            e.preventDefault();
    }

    const dropHandler = (e: DragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'branch');
        }
    }
    
    return (
        <div>
            <div
                className={_branchClassName}
                style={branchStyle}
                onClick={clickHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}>
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
