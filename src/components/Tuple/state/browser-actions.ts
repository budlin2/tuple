import { ID, StoragePort, StoragePorts } from "../TupleTypes";
import { PortsT } from "../Viewport/ViewportTypes";


const STORAGE_ID = 'ports';
const VIEWPORT_QUERY_ID = 'p';


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
    const storagePorts = localStorage.getItem(STORAGE_ID);
    if (storagePorts && storagePorts[id])
        return JSON.parse(storagePorts[id]) as StoragePort;

    return null
};


//---------------------------------------------------------------------------------------------------------------------
export const set_storage_ports = (portId: ID, ports: PortsT, rootId: ID, open: boolean) => {
    const storagePorts: StoragePorts = get_storage_ports() || {};
    storagePorts[portId] = {
        open,
        ports,
        rootId,
    } as StoragePort;

    localStorage.setItem(STORAGE_ID, JSON.stringify(storagePorts));
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
export const get_viewport_id_from_query_params = (): string | null => {
    const urlParams = new URLSearchParams(location.search);
    const viewportId = urlParams[VIEWPORT_QUERY_ID];
    
    return viewportId || null;
}
