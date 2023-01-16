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
import { open_new_viewport_window, rename_storage_port_key, set_storage_port_open } from '../state/browser-actions';
import { TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    open: boolean,
    openSymbol?: string | ReactNode, //TODO: Maybe a part of context?
    closeSymbol?: string | ReactNode,
    hoverSymbol?: string | ReactNode
}


const Rootlet = ({
    text,
    open,
    closeSymbol='\u25CB',
    openSymbol='\u25CF',
    hoverSymbol='\u25C9'
}: Props) => {
    const [_text, setText] = useState(text);
    const [hoveringSymbol, setHoveringSymbol] = useState(false);
    const textboxRef = useRef<HTMLInputElement>();

    const displaySymbol = open
        ? openSymbol
        : (hoveringSymbol ? hoverSymbol : closeSymbol);

    const { state: {
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const rootletClassName = `
        ${_classes?.rootlet || ''}
        ${classes?.rootlet  || ''}`;

    const symbolContainerClassName = `
        ${_classes?.symbolContainer}
        ${classes?.symbolContainer  || ''}`

    const rootletTextBoxClassName = `
        ${_classes?.rootletTextBox}

        ${classes?.rootletTextBox  || ''}`

    const draggableClass = classes?.draggable || '';


    const dragStartHandler = (e: DragEvent) => {
        setCustomDragImage(e, _text, draggableClass, styles.draggable);
    };

    const dragEndHandler = () => {
        cleanupDraggable();
        open_new_viewport_window(_text);
    }

    const mouseEnterHandler = () => setHoveringSymbol(true);
    const mouseLeaveHandler = () => setHoveringSymbol(false);

    const doubleClickHandler = () => {
        open_new_viewport_window(_text);
    }

    const textChangeHandler = (e: any) => {
        const { value: newText } = e.target;
        const renamed: boolean = rename_storage_port_key(_text, newText);
        if (renamed)
            setText(newText);
    }

    const textDoubleClickHandler = (e: rMouseEvent) => e.stopPropagation();

    return (
        <div
            style={styles.rootlet}
            className={rootletClassName}
            draggable
            onDoubleClick={doubleClickHandler}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}>
            <>
                <div className={symbolContainerClassName} style={styles.symbolContainer}>
                    { displaySymbol }
                </div>

                <input type="text"
                    ref={textboxRef}
                    className={rootletTextBoxClassName}
                    style={styles.rootletTextBox}
                    id={_text}
                    name={_text}
                    value={_text}
                    onDoubleClick={textDoubleClickHandler}
                    onChange={textChangeHandler}
                />
            </>
        </div>
    );
};


export default Rootlet;
