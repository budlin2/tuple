import { getUniqueId } from "../../../utils";
import { ID, StoragePort, StoragePorts } from "../TupleTypes";
import { PortsT, PortT } from "../Viewport/ViewportTypes";


export const STORAGE_ID     = 'ports';
const DRAGGED_TO_DIFF_VP_ID = 'dragged_to_tuple';
const VIEWPORT_QUERY_ID     = 'p';
export const DRAGGING_ID    = 'dragging';


//---------------------------------------------------------------------------------------------------------------------
// Storage Actions
//---------------------------------------------------------------------------------------------------------------------

// TODO: Generalize for both local and session storage
//---------------------------------------------------------------------------------------------------------------------
export const get_storage_ports = (): StoragePorts | null => {
    const storagePorts = localStorage.getItem(STORAGE_ID);
    if (storagePorts)
        return JSON.parse(storagePorts) as StoragePorts;

    return null
};

//---------------------------------------------------------------------------------------------------------------------
export const get_storage_port = (id: ID): StoragePort | null => {
    const storage = JSON.parse(localStorage.getItem(STORAGE_ID)) as StoragePort;
    if (storage && storage[id])
        return storage[id];

    return null
};

//---------------------------------------------------------------------------------------------------------------------
export const set_storage_port = (key: ID, ports: PortsT, rootId: ID, open: boolean, name: string) => {
    const storagePorts: StoragePorts = get_storage_ports() || {};
    storagePorts[key] = {
        open,
        ports,
        rootId,
        name,
    } as StoragePort;

    localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));
}

export const remove_storage_port_key = (key: ID) => {
    const storagePorts: StoragePorts = get_storage_ports();
    if (storagePorts) {
        delete storagePorts[key];
    }

    localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));
}

//---------------------------------------------------------------------------------------------------------------------
// Returns true if successfully renamed; false otherwise
export const rename_storage_port = (key: ID, newName: string): boolean => {
    const storagePorts: StoragePorts = get_storage_ports() || {};

    if (key in storagePorts) {
        storagePorts[key] = { ...storagePorts[key], name: newName } as StoragePort;
        localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));
        return true;
    }

    return false;
};

//---------------------------------------------------------------------------------------------------------------------
// Creates a new single-view viewport inside storage and returns its ID
export const set_storage_port_from_page_id = (pageId: ID): ID => {
    const viewportId = getUniqueId();
    const portId = getUniqueId();
    const storagePorts: StoragePorts = get_storage_ports() || {};

    const newPort: PortT = {
        parentId: null,
        isSplitView: false,
        pageIds: [pageId],
        activePageId: pageId,
        direction: null,
        headId: null,
        tailId: null,
        isHead: null,
    };

    const newPorts: PortsT = {
        [portId]: newPort
    }

    storagePorts[viewportId] = {
        open: false,
        ports: newPorts,
        rootId: portId,
        name: portId,
    } as StoragePort;

    localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));

    return viewportId;
}


//---------------------------------------------------------------------------------------------------------------------
export const set_storage_port_open = (id: ID, open: boolean = true) => {
    const storagePorts: StoragePorts = get_storage_ports() || {};

    if (id in storagePorts) {
        storagePorts[id] = { ...storagePorts[id], open } as StoragePort;
        localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));
    } else {
        throw new Error(`Could not find id "${id}" in storage.`)
    }
}


//---------------------------------------------------------------------------------------------------------------------
// Window Actions
//---------------------------------------------------------------------------------------------------------------------
export const open_new_viewport_window = (viewportId: string | number) => {
    const viewport = get_storage_port(viewportId);
    if (viewport.open) { return; }

    const url = new URL(window.location.href);
    url.searchParams.set(VIEWPORT_QUERY_ID, viewportId.toString());

    window.open(url, '', `height=${600}, width=${800}`);
}

//---------------------------------------------------------------------------------------------------------------------
// Returns viewport string or null if not found (i.e. is main page)
// TODO: What to do for invalid view id or page is already opened?
// If not a valid id, create new id with blank state
// if already opened, duplicate it and append to views? Probz not.
//  First ask user if they would like to duplicate it... Or close it
// Calling function should handle all this
export const get_viewport_id_from_query_params = (): string => {
    const urlParams = new URLSearchParams(location.search);
    const viewportId = urlParams.get(VIEWPORT_QUERY_ID);

    return viewportId || '';
}

//---------------------------------------------------------------------------------------------------------------------
// On drop operations we need to know if we dropped the draggable on
// a different viewport than the one the draggable originated from
export const get_dragged_to_different_viewport = async (timeout: number = 0): Promise<boolean> => {
    let ret = false;
    const draggedToDifferentViewport = JSON.parse(
        localStorage.getItem(DRAGGED_TO_DIFF_VP_ID)
    );

    set_dragged_to_different_viewport(false);  // cleanup

    if (draggedToDifferentViewport)
        ret = !!draggedToDifferentViewport;

    return new Promise((resolve, reject) => setTimeout(
        () => { resolve(ret); },
        timeout,
    ));
    
}

//---------------------------------------------------------------------------------------------------------------------
export const set_dragged_to_different_viewport = (draggedToDifferentViewport: boolean) => {
    localStorage.setItem(DRAGGED_TO_DIFF_VP_ID, JSON.stringify(draggedToDifferentViewport));
}