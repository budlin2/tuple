import { createContext } from "react";

import {
    AddTabPayloadT,
    ChangeActiveViewPayloadT,
    ID,
    RemoveTabPayloadT,
    RemoveViewPayloadT,
    TupleActionKind,
    TupleActionT,
    TupleContextT,
    TupleStateT
} from "./TupleTypes";

import {
    IdPortTupleT,
    PortsT,
    PortStateT,
    PortT,
    SplitViewT,
    ViewportT,
    ViewT
} from "./Viewport/ViewportTypes";


//---------------------------------------------------------------------------------------------------------------------
// TODO: What to do with this...?
export const getViewsFromStorage = (): ViewportT | null => {
    const storageViews = localStorage.getItem("views");
    if (storageViews)
        return JSON.parse(storageViews) as SplitViewT | ViewT;

    return null
};

//---------------------------------------------------------------------------------------------------------------------
const _get_port_copy = (ports: PortsT, id: ID): PortT => {
    const port = { ...ports[id] };
    return port || null;
}

//---------------------------------------------------------------------------------------------------------------------
// TODO: Better named types... e.g. PortStateT is poorly named now...
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
const _add_tab = (state: TupleStateT, payload: AddTabPayloadT): TupleStateT => {
    console.log('--- Add Tab ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.views.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = [
        ...pageIds?.slice(0, payload.index),
        payload.pageId,
        ...pageIds?.slice(payload.index),
    ];

    const newPorts = {
        ...state.views.ports,
        [`${payload.portId}`]: {
            ...port,
            pageIds: newPageIds
        }
    }

    return {
        ...state,
        ports: newPorts,
    } as TupleStateT;
}

//---------------------------------------------------------------------------------------------------------------------
const _remove_tab = (state: TupleStateT, payload: RemoveTabPayloadT): TupleStateT => {
    console.log('--- Remove Tab ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.views.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = pageIds.filter((_, i) => i !== payload.index);

    const newActivePageId = pageIds[payload.index] != port.activePageId
        ? port.activePageId
        : pageIds[payload.index+1] || pageIds[payload.index-1];
    
    const newPorts = {
        ...state.views.ports,
        [`${payload.portId}`]: {
            ...port,
            pageIds: newPageIds,
            activePageId: newActivePageId,
        }
    }

    return {
        ...state,
        views: {
            ...state.views,
            ports: newPorts,
        }
    } as TupleStateT;
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
const _remove_view = (state: TupleStateT, payload: RemoveViewPayloadT): TupleStateT => {
    console.log('--- Remove View ---')
    console.log('state', state)
    console.log('payload', payload)

    let rootId: ID = state.views.root;
    let port = _get_port_copy(state.views.ports, payload.portId);
    const isRoot = !port.parentId;

    if (isRoot) {
        return {
            ...state,
            views: initialViews,  // TODO:
        }
    }

    const parent = _get_port_copy(state.views.ports, port.parentId as ID);
    const parentIsRoot = !parent.parentId;
    const sister = _get_sister_details(state.views, payload.portId);

    let newPorts: PortsT = { ...state.views.ports };

    if (parentIsRoot) {
        if (sister) {
            rootId = sister.id;

            sister.port.parentId = null;
            sister.port.isHead = null;
            newPorts[sister.id] = sister.port;
        }
    } else {
        const grandparentId: ID = parent.parentId as ID;
        const grandparent  = _get_port_copy(state.views.ports, grandparentId);

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

    return {
        ...state,
        views: {
            //...state.views
            root: rootId,
            ports: newPorts,
        }
    } as TupleStateT;
}


//---------------------------------------------------------------------------------------------------------------------
const _change_active_view = (state: TupleStateT, payload: ChangeActiveViewPayloadT): TupleStateT => {
    console.log('--- Change Active View ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.views.ports, payload.portId);

    const newPorts = {
        ...state.views.ports,
        [`${payload.portId}`]: {
            ...port,
            activePageId: payload.pageId,
        }
    };

    const newState = {
        ...state,
        views: {
            ...state.views,
            ports: newPorts,
        }
    } as TupleStateT;

    return newState; 
}


// TODO: Move this and actions to PortState.tsx?
//---------------------------------------------------------------------------------------------------------------------
export const reducer = (state: TupleStateT, action: TupleActionT): TupleStateT => {
    switch(action.type) {
        case TupleActionKind.ADD_TAB:
            return _add_tab(state, action.payload as AddTabPayloadT);
        case TupleActionKind.REMOVE_TAB:
            return _remove_tab(state, action.payload as RemoveTabPayloadT);
        // case ViewActionKind.ADD_VIEW:
        //     return _add_view(state, action.payload as AddViewPayloadT);
        case TupleActionKind.REMOVE_VIEW:
            return _remove_view(state, action.payload as RemoveViewPayloadT);
        case TupleActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}

export const initialViews: PortStateT = { root: '', ports: {} }
