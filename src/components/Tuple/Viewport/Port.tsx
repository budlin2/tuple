//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { useContext, useEffect } from "react";

import SplitPane from "../../SplitPane";
import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";
import View from "./View/View";
import { TupleContext } from "..";
import { TupleContextT, RemoveViewActionT, TupleActionKind } from "../TupleTypes";
import { PortT } from './ViewportTypes';

//----------------------------------------------------------------------------------------------------------------------
interface PortProps {
    id: ID,
}


const Port = ({ id }: PortProps): JSX.Element => {
    const { dispatch, state: { views } }: TupleContextT = useContext(TupleContext);

    //TODO:  This should be lifted to Viewport.tsx once the viewport actions are lifted to Tuple
    //          Should also be inside of viewport { root, views, defaultView}
    if (views.root == '') {
        return <>No Views. SAD!</>
    }

    const port: PortT = views.ports[id];  // TODO: Should this be in useEffect hook?

    const removeView = () => {
        const removeViewAction: RemoveViewActionT = {
            type: TupleActionKind.REMOVE_VIEW,
            payload: { portId: id }
        }

        dispatch(removeViewAction);
    }

    // When list becomes empty
    useEffect(() => {
        if (port && port.pageIds && port.pageIds.length <= 0) {
            removeView();
        }
    }, [port]);

    //------------------------------------------------------------------------------------------------------------------
    // VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (port && !port.headId) {
        return (
            <View
                portId={id}
                pageIds={port.pageIds as ID[]}
                activePageId={port.activePageId as ID}
            />
        );
    }
    
    //------------------------------------------------------------------------------------------------------------------
    // SPLIT-VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (port && port?.headId) {
        const head = <Port id={port.headId} />
        const tail = <Port id={port.tailId as ID} />

        return (
            <SplitPane
                dir={port.direction as DirectionT}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { port.headId && head }
                { port.tailId && tail }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;