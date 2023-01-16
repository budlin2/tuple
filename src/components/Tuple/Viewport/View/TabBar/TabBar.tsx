import { useContext, DragEvent, useRef, useEffect } from 'react';

import { TupleContext } from '../../..';
import { ID, TupleContextT } from '../../../TupleTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';
import _global_classes from '../../../../styles.module.css';
import { validateDraggable } from '../../../state';
import { addTab, setTabBarHeight } from '../../../state/dispatchers';
import { set_dragged_to_different_viewport } from '../../../state/browser-actions';


interface Props {
    portId: ID,
    pageIds: ID[],
}


const TabBar = ({
    portId,
    pageIds,
}: Props) => {
    const tabBarRef = useRef();

    const {
        dispatch,
        state:{ classes, styles, viewportId }
    }: TupleContextT = useContext(TupleContext);
    
    const tabBarClassName = `
        ${_global_classes.noScrollbar}
        ${_classes?.tabBar || ''}
        ${classes?.tabBar  || ''}`;

    useEffect(() => {
        const { offsetHeight: height } = tabBarRef?.current as HTMLDivElement;
        setTabBarHeight(dispatch, height);
    }, [tabBarRef, setTabBarHeight, dispatch]);

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
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
        <div ref={tabBarRef}
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