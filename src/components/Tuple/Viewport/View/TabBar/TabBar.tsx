import {
    useContext,
    useEffect,
    useRef,
    DragEvent as rDragEvent
} from 'react';

import { TupleContext } from '../../..';
import { ID, TupleContextT } from '../../../TupleTypes';
import Tab from './Tab';
import { validateDraggable } from '../../../state';
import { addTab } from '../../../state/dispatchers';
import { set_dragged_to_different_viewport } from '../../../state/browser-actions';

import _classes from './tabbar.module.css';
import _global_classes from '../../../../styles.module.css';


interface Props {
    portId: ID,
    pageIds: ID[],
}


const TabBar = ({
    portId,
    pageIds,
}: Props) => {
    const tabbarRef = useRef<HTMLDivElement>();
    const {
        dispatch,
        state:{ classes, styles, viewportId }
    }: TupleContextT = useContext(TupleContext);
    
    const tabBarClassName = `
        ${_global_classes.noScrollbar}
        ${_classes?.tabBar || ''}
        ${classes?.tabBar  || ''}`;

    // Note: Unfortunate, but much of Tuple's CSS relies on tabbar height.
    //       This is a hack in case the user changes it in their custom CSS.
    useEffect(() => {
        const rootCSS = document.querySelector(':root') as HTMLDivElement;
        const tabbarHeight = tabbarRef.current?.clientHeight;
        rootCSS.style.setProperty('--TAB-BAR-HEIGHT', `${tabbarHeight.toString()}px`);
    }, [tabbarRef]);

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const dragOverHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const dropHandler = (e: rDragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateDraggable(e)) return;

        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');
        const dragViewportId = e.dataTransfer && e.dataTransfer.getData('viewportId');

        if (dragViewportId !== viewportId) {
            set_dragged_to_different_viewport(true);
        }

        addTab(dispatch, portId, dragPortId, dragPageId, pageIds.length);
    }

    return (
        <div ref={tabbarRef} 
            className={tabBarClassName}
            style={styles?.tabBar}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            { pageIds.map((pid, i) => (
                <Tab
                    key={pid}
                    portId={portId}
                    index={i}
                    pageId={pid}/>
            ))}
        </div>
    );
};


export default TabBar;