import { useContext, DragEvent as rDragEvent } from 'react';

import { TupleContext } from '../../..';
import { ID, TupleContextT } from '../../../TupleTypes';
import Tab from './Tab';
import * as actions from '../../../state/dispatchers';
import { set_dragged_to_different_viewport } from '../../../state/browser-actions';

import _classes from './tabbar.module.css';
import _global_classes from '../../../../styles.module.css';
import { validateDraggable } from '../../../../Draggable';
import { classNames } from '../../../../../utils';


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
        state:{ classes, styles, viewportId }
    }: TupleContextT = useContext(TupleContext);
    
    const tabBarClassName = classNames(
        _global_classes.noScrollbar,
        _classes?.tabBar_base,
        classes?.tabBar_base,
    );

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

        actions.addTab(dispatch, portId, dragPortId, dragPageId, pageIds.length);
    }

    return (
        <div className={ tabBarClassName }
            style       ={ styles?.tabBar?.base }
            onDragOver  ={ dragOverHandler }
            onDrop      ={ dropHandler }
        >
            { pageIds.map((pid, i) => (
                <Tab key={ pid }
                    portId  ={ portId }
                    index   ={ i }
                    pageId  ={ pid }/>
            ))}
        </div>
    );
};


export default TabBar;