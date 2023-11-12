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
import { open_new_viewport_window, rename_storage_port_key } from '../state/browser-actions';
import { TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';


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
    const textboxRef = useRef<HTMLInputElement>();

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const [_text, setText] = useState(text);
    const [hoveringSymbol, setHoveringSymbol] = useState(false);
    const {
        state: { classes, styles }
    }: TupleContextT = useContext(TupleContext);

    const displaySymbol = open
        ? openSymbol
        : (hoveringSymbol ? hoverSymbol : closeSymbol);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const rootletClassName = classNames(_classes?.rootlet, classes?.rootlet);
    const symbolContainerClassName = classNames(_classes?.symbolContainer, classes?.symbolContainer);
    const rootletTextBoxClassName = classNames(_classes?.rootletTextBox, classes?.rootletTextBox);
    const draggableClass = classes?.draggable || '';

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const mouseEnterHandler = () => setHoveringSymbol(true);
    const mouseLeaveHandler = () => setHoveringSymbol(false);

    const doubleClickHandler = () => open_new_viewport_window(_text);
    const textDoubleClickHandler = (e: rMouseEvent) => e.stopPropagation();

    const textChangeHandler = (e: any) => {
        const { value: newText } = e.target;
        const renamed: boolean = rename_storage_port_key(_text, newText);
        if (renamed)
            setText(newText);
    }

    const dragStartHandler = (e: DragEvent) => {
        setCustomDragImage(e, _text, draggableClass, styles.draggable);
    }

    const dragEndHandler = () => {
        cleanupDraggable();
        open_new_viewport_window(_text);
    }

    return (
        <div draggable className={ rootletClassName }
            style           ={ styles.rootlet }
            onDoubleClick   ={ doubleClickHandler }
            onDragStart     ={ dragStartHandler }
            onDragEnd       ={ dragEndHandler }
            onMouseEnter    ={ mouseEnterHandler }
            onMouseLeave    ={ mouseLeaveHandler }>
            <>
                <div className={symbolContainerClassName} style={styles.symbolContainer}>
                    { displaySymbol }
                </div>

                <input type="text" ref={ textboxRef }
                    id              ={ _text }
                    name            ={ _text }
                    value           ={ _text }
                    className       ={ rootletTextBoxClassName }
                    style           ={ styles.rootletTextBox }
                    onDoubleClick   ={ textDoubleClickHandler }
                    onChange        ={ textChangeHandler }
                />
            </>
        </div>
    );
};


export default Rootlet;
