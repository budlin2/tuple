import { ID, StorageView, StorageViews } from "../TupleTypes";
import { SplitViewT, ViewportT, ViewT } from "../Viewport/ViewportTypes";

const STORAGE_ID = 'views';
const VIEWPORT_QUERY_ID = 'v';


//---------------------------------------------------------------------------------------------------------------------
// Storage Actions
//---------------------------------------------------------------------------------------------------------------------

// TODO: Generalize for both local and session storage
//---------------------------------------------------------------------------------------------------------------------
export const get_storage_views = (): StorageViews | null => {
    const storageViews = localStorage.getItem(STORAGE_ID);
    if (storageViews)
        return JSON.parse(storageViews) as StorageViews;

    return null
};


//---------------------------------------------------------------------------------------------------------------------
export const set_storage_views = (id: ID, view: ViewportT, open=true) => {
    const storageViews: StorageViews = get_storage_views() || {};
    storageViews[id] = {
        open,
        view,
    } as StorageView;

    localStorage.setItem(STORAGE_ID, JSON.stringify(storageViews));
}


//---------------------------------------------------------------------------------------------------------------------
const set_storage_view_open = (id: ID, open: boolean = true) => {
    const storageViews: StorageViews = get_storage_views() || {};

    if (id in storageViews) {
        storageViews[id] = { ...storageViews[id], open } as StorageView;
        localStorage.setItem(STORAGE_ID, JSON.stringify(storageViews));
    } else {
        throw new Error(`Could not find id "${id}" in storage.`)
    }
}


//---------------------------------------------------------------------------------------------------------------------
// Window Actions
//---------------------------------------------------------------------------------------------------------------------
const open_new_viewport_window = (viewId: string | number) => {
    const url = new URL(window.location.href);
    url.searchParams.set(VIEWPORT_QUERY_ID, viewId.toString());

    window.open(url, '', `height=${600}, width=${800}`);
}

//---------------------------------------------------------------------------------------------------------------------
// Returns viewport string or null if not found (i.e. is main page)
// TODO: What to do for invalid view id or page is already opened?
// If not a valid id, create new id with blank state
// if already opened, duplicate it and append to views? Probz not.
//  First ask user if they would like to duplicate it... Or close it
// Calling function should handle all this
const get_viewport_from_query_params = (): string | null => {
    const urlParams = new URLSearchParams(location.search);
    const viewportId = urlParams[VIEWPORT_QUERY_ID];
    
    return viewportId || null;
}
