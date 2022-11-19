import { getUniqueId } from "../../utils";
import { SideT } from "../SplitPane/SplitPaneTypes";
import {
    AddTabPayloadT,
    AddViewPayloadT,
    ChangeActiveViewPayloadT,
    ID,
    RemoveTabPayloadT,
    RemoveViewPayloadT,
    TupleActionKind,
    TupleActionT,
    TupleStateT
} from "./TupleTypes";

import {
    IdPortTupleT,
    PortsT,
    ViewportStateT,
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
const _get_sister_details = (viewportState: ViewportStateT, id: ID): IdPortTupleT | null => {
    const port: PortT = viewportState.ports[id];
    if (!port) return null;

    const isRoot: boolean = port.parentId == null;  // TODO: Do I really need root in PortStateT
    if (isRoot) return null;

    const parent: PortT = viewportState.ports[port.parentId as ID];
    if (!parent) return null;

    const sisterId: ID = port.isHead ? parent.tailId as ID : parent.headId as ID;
    const sister = _get_port_copy(viewportState.ports, sisterId);

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

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = [
        ...pageIds?.slice(0, payload.index),
        payload.pageId,
        ...pageIds?.slice(payload.index),
    ];

    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            pageIds: newPageIds
        }
    }

    return {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    } as TupleStateT;
}

//---------------------------------------------------------------------------------------------------------------------
const _remove_tab = (state: TupleStateT, payload: RemoveTabPayloadT): TupleStateT => {
    console.log('--- Remove Tab ---')
    console.log('state', state)
    console.log('payload', payload)

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');

    const newPageIds = pageIds.filter((_, i) => i !== payload.index);

    const newActivePageId = pageIds[payload.index] != port.activePageId
        ? port.activePageId
        : pageIds[payload.index+1] || pageIds[payload.index-1];
    
    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            pageIds: newPageIds,
            activePageId: newActivePageId,
        }
    }

    return {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    } as TupleStateT;
}


//---------------------------------------------------------------------------------------------------------------------
// Create a new splitview port with children as original port and new tab
/*
    Will turn:
            (Parent)
               |
            (Port)

    Into:
             (Parent)
                |
            (New Port)
              /    \
         (Port)    (New Child)
*/
const _add_view = (state: TupleStateT, payload: AddViewPayloadT): TupleStateT => {
    console.log('--- Add View ---')
    console.log('state', state)
    console.log('payload', payload)

    const newPortId = getUniqueId();
    const newChildId = getUniqueId();

    const port = _get_port_copy(state.viewport.ports, payload.portId);
    const isRoot = !port.parentId;

    // If dropped on same port the drag started from, remove the original pageId to avoid duplicates
    if (payload.dragPortId === payload.portId) {
        port.pageIds = port.pageIds?.filter(item => item !== payload.pageId) as ID[];
    }

    const newChild: PortT = {
        parentId: newPortId,
        isSplitView: false,
        pageIds: [payload.pageId],
        activePageId: payload.pageId,
        direction: null,
        headId: null,
        tailId: null,
        isHead: payload.side === SideT.HEAD,
    };

    const newPort = {
        parentId: port.parentId,
        isSplitView: true,
        pageIds: null,
        activePageId: null,
        direction: payload.direction,
        headId: payload.side === SideT.HEAD ? newChildId : payload.portId,
        tailId: payload.side === SideT.TAIL ? newChildId : payload.portId,
        isHead: port.isHead,
    }

    console.log('parent id', port.parentId)

    const newPorts = {
        ...state.viewport.ports,
        [`${newPortId}`]: newPort,      // parent
        [`${newChildId}`]: newChild,    // child
    }

    // If not the root, handle changes to parent
    if (!isRoot) {
        const parent = _get_port_copy(state.viewport.ports, port.parentId as ID);
        if (port.isHead)
            parent.headId = newPortId;

        if (port.isHead !== null && !port.isHead)
            parent.tailId = newPortId;

        newPorts[port.parentId as ID] = parent;  // grandparent
    }

    // Add back updated port
    port.parentId = newPortId;
    port.isHead = payload.side === SideT.TAIL;
    newPorts[payload.portId] = port;

    console.log('New state', {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    });
    
    return {
        ...state,
        viewport: {
            // ...state.viewport,
            root: isRoot ? newPortId : state.viewport.root,
            ports: newPorts,
        }
    } as TupleStateT;
}

//---------------------------------------------------------------------------------------------------------------------
// Remove => Replace parent with sister component
const _remove_view = (state: TupleStateT, payload: RemoveViewPayloadT): TupleStateT => {
    console.log('--- Remove View ---')
    console.log('state', state)
    console.log('payload', payload)

    let rootId: ID = state.viewport.root;
    let port = _get_port_copy(state.viewport.ports, payload.portId);
    const isRoot = !port.parentId;

    if (isRoot) {
        return {
            ...state,
            viewport: initialViewport,
        }
    }

    const parent = _get_port_copy(state.viewport.ports, port.parentId as ID);
    const parentIsRoot = !parent.parentId;
    const sister = _get_sister_details(state.viewport, payload.portId);

    const newPorts: PortsT = { ...state.viewport.ports };

    if (parentIsRoot) {
        if (sister) {
            rootId = sister.id;

            sister.port.parentId = null;
            sister.port.isHead = null;
            newPorts[sister.id] = sister.port;
        }
    } else {
        const grandparentId: ID = parent.parentId as ID;
        const grandparent  = _get_port_copy(state.viewport.ports, grandparentId);

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
        viewport: {
            //...state.viewport
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

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            activePageId: payload.pageId,
        }
    };

    const newState = {
        ...state,
        viewport: {
            ...state.viewport,
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
        case TupleActionKind.ADD_VIEW:
            return _add_view(state, action.payload as AddViewPayloadT);
        case TupleActionKind.REMOVE_VIEW:
            return _remove_view(state, action.payload as RemoveViewPayloadT);
        case TupleActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}

export const initialViewport: ViewportStateT = { root: '', ports: {} }
