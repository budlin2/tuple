//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { useContext, useEffect } from "react";

import SplitPane from "../../SplitPane";
import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";
import View from "./View/View";
import { TupleContext } from "..";
import { TupleContextT } from "../TupleTypes";
import { PortT } from './ViewportTypes';
import { removeView } from "../state/dispatchers";

//----------------------------------------------------------------------------------------------------------------------
interface PortProps { id: ID }


const Port = ({ id }: PortProps): JSX.Element => {
    const {
        dispatch,
        state: { viewport }
    }: TupleContextT = useContext(TupleContext);

    const port: PortT = viewport?.ports && viewport?.ports[id];

    useEffect(() => {  // When list becomes empty
        if (port && port.pageIds && port.pageIds.length <= 0) {
            removeView(dispatch, id);
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
