import { createContext, ReactNode, useContext, useReducer, useMemo } from 'react';

import { getUniqueId } from '../../../utils';
import { TupleContext } from '../TupleProvider';
import { ID, TupleClassesT, TupleStylesT } from '../TupleTypes';
import Port from './Port';
import {
    AddTabPayloadT,
    AddViewPayloadT,
    ChangeActiveViewPayloadT,
    IdPortTupleT,
    isSplitViewT,
    isViewT,
    PortsT,
    PortStateT,
    PortT,
    RemoveTabPayloadT,
    RemoveViewPayloadT,
    SideT,
    SplitViewT,
    ViewActionKind,
    ViewportActionT,
    ViewportT,
    ViewT
} from "./ViewportTypes";

import _classes from './viewport.module.css';


//---------------------------------------------------------------------------------------------------------------------
const _get_port_copy = (ports: PortsT, id: ID): PortT => {
    const port = { ...ports[id] };
    return port || null;
}

//---------------------------------------------------------------------------------------------------------------------
const _get_sister_details = (state: PortStateT, id: ID): IdPortTupleT | null => {
    const port: PortT = state.ports[id];
    if (!port) return null;

    const isRoot: boolean = port.parentId == null;  // TODO: Do I really need root in PortStateT
    if (isRoot) return null;

    const parent: PortT = state.ports[port.parentId as ID];
    if (!parent) return null;

    const sisterId: ID = port.isHead ? parent.tailId as ID : parent.headId as ID;
    const sister = _get_port_copy(state.ports, sisterId);

    return {
        id: sisterId,
        port: sister,
    } as IdPortTupleT;
}


//---------------------------------------------------------------------------------------------------------------------
const _add_tab = (state: PortStateT, payload: AddTabPayloadT): PortStateT => {
    console.log('--- Add Tab ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = [
        ...pageIds?.slice(0, payload.index),
        payload.pageId,
        ...pageIds?.slice(payload.index),
    ];

    return {
        ...state,
        ports: {
            ...state.ports,
            [`${payload.portId}`]: {
                ...port,
                pageIds: newPageIds
            }
        }
    } as PortStateT;
}

//---------------------------------------------------------------------------------------------------------------------
const _remove_tab = (state: PortStateT, payload: RemoveTabPayloadT): PortStateT => {
    console.log('--- Remove Tab ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = pageIds.filter((_, i) => i !== payload.index);

    const newActivePageId = pageIds[payload.index] != port.activePageId
        ? port.activePageId
        : pageIds[payload.index+1] || pageIds[payload.index-1]

    console.log('new state', {
        ...state,
        ports: {
            ...state.ports,
            [`${payload.portId}`]: {
                ...port,
                pageIds: newPageIds,
                activePageId: newActivePageId,
            }
        }
    })

    return {
        ...state,
        ports: {
            ...state.ports,
            [`${payload.portId}`]: {
                ...port,
                pageIds: newPageIds,
                activePageId: newActivePageId,
            }
        }
    } as PortStateT;
}


//---------------------------------------------------------------------------------------------------------------------
// const _add_view = (state: PortStateT, payload: AddViewPayloadT): PortStateT => {
//     const newView: ViewT = {
//         pageIds: [payload.pid],
//         activePageId: payload.pid,
//     };

//     return {
//         head: payload.side == SideT.HEAD ? newView : state,
//         tail: payload.side == SideT.TAIL ? newView: state,
//         direction: payload.direction,
//     } as SplitViewT;
// }

//---------------------------------------------------------------------------------------------------------------------
// Replace parent with sister component
const _remove_view = (state: PortStateT, payload: RemoveViewPayloadT): PortStateT => {
    console.log('--- Remove View ---')
    console.log('state', state)
    console.log('payload', payload)

    let rootId: ID = state.root;
    let port = _get_port_copy(state.ports, payload.portId);
    const isRoot = !port.parentId;

    if (isRoot) {
        return initialState;  // TODO:
    }

    const parent = _get_port_copy(state.ports, port.parentId as ID);
    const parentIsRoot = !parent.parentId;
    const sister = _get_sister_details(state, payload.portId);

    let newPorts: PortsT = { ...state.ports };

    if (parentIsRoot) {
        if (sister) {
            rootId = sister.id;

            sister.port.parentId = null;
            sister.port.isHead = null;
            newPorts[sister.id] = sister.port;
        }
    } else {
        const grandparentId: ID = parent.parentId as ID;
        const grandparent  = _get_port_copy(state.ports, grandparentId);

        if (parent.isHead) {
            grandparent.headId = sister?.id as ID;
        } else {
            grandparent.tailId = sister?.id as ID;
        }

        if (sister) {
            sister.port.parentId = grandparentId as ID;
            sister.port.isHead = parent.isHead;

            newPorts[sister.id] = sister.port;
        }

        newPorts[grandparentId] = grandparent;
    }

    delete newPorts[payload.portId];
    delete newPorts[port.parentId as ID];

    console.log('New state', {
        // ...state,
        root: rootId,
        ports: newPorts,
    })

    return {
        // ...state,
        root: rootId,
        ports: newPorts,
    } as PortStateT;
}


//---------------------------------------------------------------------------------------------------------------------
const _change_active_view = (state: PortStateT, payload: ChangeActiveViewPayloadT): PortStateT => {
    console.log('--- Change Active View ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.ports, payload.portId);

    const newState = {
        ...state,
        ports: {
            ...state.ports,
            [`${payload.portId}`]: {
                ...port,
                activePageId: payload.pageId,
            }
        }
    } as PortStateT;

    return newState;
}


// TODO: Move this and actions to PortState.tsx?
//---------------------------------------------------------------------------------------------------------------------
const reducer = (state: PortStateT, action: ViewportActionT): PortStateT => {
    switch(action.type) {
        case ViewActionKind.ADD_TAB:
            return _add_tab(state, action.payload as AddTabPayloadT);
        case ViewActionKind.REMOVE_TAB:
            return _remove_tab(state, action.payload as RemoveTabPayloadT);
        // case ViewActionKind.ADD_VIEW:
        //     return _add_view(state, action.payload as AddViewPayloadT);
        case ViewActionKind.REMOVE_VIEW:
            return _remove_view(state, action.payload as RemoveViewPayloadT);
        case ViewActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}

const initialState: PortStateT = { root: '', ports: {} }
export const ViewportContext = createContext(initialState);


export interface Props {
    views: ViewportT | null,
    defaultView?: ReactNode
    // noDuplicates: boolean // TODO: Specify whether duplicates are allowed in viewport
}


const Viewport = ({
    views,
    defaultView,
}: Props) => {
    const {styles, classes}: {
        styles: TupleStylesT,
        classes: TupleClassesT,
    } = useContext(TupleContext);

    const viewportClassName = `${_classes.viewport} ${classes.viewport}`;

    const buildPortMap = (
        viewport: ViewportT,
        portMap: PortsT,
        parentId: ID | null = null,
        isHead: boolean | null = null
    ): ID => {
        const id = getUniqueId();

        if (isViewT(viewport)) {
            const view = viewport as ViewT;
            portMap[id] = {
                parentId,
                isSplitView: false,
                pageIds: view.pageIds,
                activePageId: view.activePageId,
                direction: null,
                headId: null,
                tailId: null,
                isHead,
            } as PortT;
        } else if (isSplitViewT(viewport)) {
            const splitview = viewport as SplitViewT
            portMap[id] = {
                parentId,
                isSplitView: true,
                pageIds: null,
                activePageId: null,
                direction: splitview.direction,
                headId: buildPortMap(splitview.head, portMap, id, true),
                tailId: buildPortMap(splitview.tail as ViewportT, portMap, id, false),
                isHead,
            } as PortT;
        } else {
            throw new Error('All viewport values must be of type ViewT or SplitViewT');
        }

        return id;
    };

    // TODO: portMap should look like this:
    // {
    //      root: string,
    //      ports: {....} 
    // }
    // Update code to accomodate this structure
    const portMap: PortsT = {};
    const rootId = useMemo(() => buildPortMap(views as ViewportT, portMap), []);
    const portState: PortStateT = {
        root: rootId,
        ports: portMap,
    };
    const [viewportContext, dispatch] = useReducer(reducer, portState);

    // TODO: Show defaultView
    if (viewportContext.root == null) {
        return <>No Views. SAD!</>
    }

    return (
        <div className={viewportClassName} style={styles.viewport}>
            <ViewportContext.Provider value={viewportContext}>
                <Port id={viewportContext.root} dispatch={dispatch}/>
            </ViewportContext.Provider>
        </div>
    );
};


export default Viewport;