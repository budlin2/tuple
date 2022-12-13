import { useContext, DragEvent } from 'react';

import { TupleContext } from '../../..';
import { ID, TupleContextT } from '../../../TupleTypes';
import Tab from './Tab';

import _classes from './tabbar.module.css';
import _global_classes from '../../../../styles.module.css';
import { validateDraggable } from '../../../state';
import { addTab } from '../../../state/dispatchers';


interface Props {
    portId: ID,
    pageIds: ID[],
}


const TabBar = ({
    portId,
    pageIds,
}: Props) => {
    const {
        dispatch,
        state:{ classes, styles, template }
    }: TupleContextT = useContext(TupleContext);
    
    const tabBarClassName = `
        ${_global_classes.noScrollbar}
        ${_classes?.tabBar || ''}
        ${template?.tabBar || ''}
        ${classes?.tabBar  || ''}`;

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

        addTab(dispatch, portId, dragPortId, dragPageId, pageIds.length);
    }

    return (
        <div
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