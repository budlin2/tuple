//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { Dispatch, useContext, useEffect } from "react";

import SplitPane from "../../SplitPane";
import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";
import View from "./View/View";
import { ViewportContext } from "./Viewport";
import { PortStateT, PortT, RemoveViewActionT, ViewActionKind, ViewportActionT } from "./ViewportTypes";

//----------------------------------------------------------------------------------------------------------------------
interface PortProps {
    id: ID,
    dispatch: Dispatch<ViewportActionT>,
}


const Port = ({
    id,
    dispatch,
}: PortProps): JSX.Element => {
    const context: PortStateT = useContext(ViewportContext);

    //TODO:  This should be lifted to Viewport.tsx once the viewport actions are lifted to Tuple
    if (context.root == '') {
        return <>No Views. SAD!</>
    }

    const port: PortT = context.ports[id];  // TODO: Should this be in useEffect hook?

    const removeView = () => {
        const removeViewAction: RemoveViewActionT = {
            type: ViewActionKind.REMOVE_VIEW,
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
                dispatch={dispatch}
            />
        );
    }
    
    //------------------------------------------------------------------------------------------------------------------
    // SPLIT-VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (port && port?.headId) {
        const head = <Port
            id={port.headId}
            dispatch={dispatch}
        />

        const tail = <Port
            id={port.tailId as ID}
            dispatch={dispatch}
        />

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