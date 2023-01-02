import { ReactNode, useContext, MouseEvent as rMouseEvent, useRef } from 'react'

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { open_new_viewport_window } from '../state/browser-actions';
import { ID, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    treeId: ID,
    open: boolean,
    openSymbol?: string | ReactNode, //TODO: Maybe a part of context?
    closeSymbol?: string | ReactNode,
}


const Rootlet = ({
    text,
    treeId,
    open,
    closeSymbol='\u25CB',
    openSymbol='\u25CF',
}: Props) => {
    const textboxRef = useRef<HTMLInputElement>();

    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const rootletClassName = `
        ${_classes?.rootlet || ''}
        ${template?.rootlet || ''}
        ${classes?.rootlet  || ''}`;

    const symbolContainerClassName = `
        ${_classes?.symbolContainer}
        ${template?.symbolContainer || ''}
        ${classes?.symbolContainer  || ''}`

    const rootletTextBoxClassName = `
        ${_classes?.rootletTextBox}
        ${template?.rootletTextBox || ''}
        ${classes?.rootletTextBox  || ''}`

    const draggableClass = `
        ${template?.draggable || ''}
        ${classes?.draggable || ''}`;


    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
    };

    const onClickHandler = (e: any) => {
        //TODO: Also need to implement this for Leaf... Should be trivial getting topLeft leaf. Just keep traversing the heads of each Port until you get it...
    }

    const dragEndHandler = (e: any) => {
        cleanupDraggable();
        open_new_viewport_window(text);
    }

    // Textbox events
    const onTextClickHandler = (e: rMouseEvent) => {
        textboxRef.current.blur();
    }

    const onTextDoubleClickHandler = (e: rMouseEvent) => {
        textboxRef.current.focus();
    }

    

    return (
        <div
            style={styles.rootlet}
            className={rootletClassName}
            draggable
            onClick={onClickHandler}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}>
            <>
                <div className={symbolContainerClassName} style={styles.symbolContainer}>
                    { open ? openSymbol : closeSymbol }
                </div>

                <input type="text"
                    ref={textboxRef}
                    className={rootletTextBoxClassName}
                    style={styles.rootletTextBox}
                    id={text}
                    name={text}
                    value={text}
                    onClick={onTextClickHandler}
                    onMouseDown={onTextClickHandler}
                    onDoubleClick={onTextDoubleClickHandler}
                />
            </>
        </div>
    );
};


export default Rootlet;
