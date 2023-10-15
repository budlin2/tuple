//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { useContext, useEffect, useState } from "react";

import SplitPane from "../../SplitPane";
import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";
import View from "./View/View";
import { TupleContext } from "..";
import { TupleContextT } from "../TupleTypes";
import { PortT } from './ViewportTypes';
import { removeTab, removeView } from "../state/dispatchers";

//----------------------------------------------------------------------------------------------------------------------
interface PortProps { id: ID }


const Port = ({ id }: PortProps): JSX.Element => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const {
        dispatch,
        state: { viewport, pages }
    }: TupleContextT = useContext(TupleContext);

    const port: PortT = viewport?.ports && viewport?.ports[id];

    const [validPageIds, setValidPageIds] = useState<ID[]>([]);
    const [missingPageIds, setMissingPageIds] = useState<ID[]>([]);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    // NOTE: PageIds can be missing from "pages" for any number of intentional or
    //       unintenional reasons. We do our best to handle this gracefully here.
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {  // When list becomes empty
        if (port && port.pageIds && port.pageIds.length <= 0) {
            removeView(dispatch, id);
        }
    }, [port]);

    // Set missing page IDs
    useEffect(() => {
        const { pageIds: portPageIds } = port;
        const allPageIds: ID[] = Object.keys(pages);
        const _mpids = portPageIds?.filter( (ppid: ID) => !allPageIds.includes(ppid) ) || [];
        setMissingPageIds(_mpids);
    }, [port.pageIds, pages, setMissingPageIds]);

    // Set valid page IDs
    useEffect(() => {
        const { pageIds: portPageIds } = port;
        const allPageIds: ID[] = Object.keys(pages);
        const _vpids = portPageIds?.filter( (ppid: ID) => allPageIds.includes(ppid) ) || [];
        setValidPageIds(_vpids);
    }, [port.pageIds, pages, setValidPageIds]);

    // Remove any missing pageIds
    useEffect(() => {
        if (missingPageIds.length) {
            const { pageIds: portPageIds } = port;
            missingPageIds.forEach( mpid => {
                removeTab(dispatch, id, portPageIds.indexOf(mpid));
            });
        }
    }), [missingPageIds, port.pageIds];

    //------------------------------------------------------------------------------------------------------------------
    // VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (port && !port.headId) {
        return (
            <View
                portId      ={ id }
                pageIds     ={ validPageIds as ID[] }
                activePageId={ port.activePageId as ID }
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
