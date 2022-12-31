import { ID, StorageView, StorageViews } from "../TupleTypes";
import { SplitViewT, ViewportT, ViewT } from "../Viewport/ViewportTypes";

const STORAGE_ID = 'views';

// TODO: Generalize for both local and session storage
//---------------------------------------------------------------------------------------------------------------------
export const getStorageViews = (): StorageViews | null => {
    const storageViews = localStorage.getItem(STORAGE_ID);
    if (storageViews)
        return JSON.parse(storageViews) as StorageViews;

    return null
};


//---------------------------------------------------------------------------------------------------------------------
export const setStorageViews = (id: ID, view: ViewportT, open=true) => {
    const storageViews: StorageViews = getStorageViews() || {};
    storageViews[id] = {
        open,
        view,
    } as StorageView;

    localStorage.setItem(STORAGE_ID, JSON.stringify(storageViews));
}


//---------------------------------------------------------------------------------------------------------------------
const setStorageViewOpen = (id: ID, open: boolean = true) => {
    const storageViews: StorageViews = getStorageViews() || {};

    if (id in storageViews) {
        storageViews[id] = { ...storageViews[id], open } as StorageView;
        localStorage.setItem(STORAGE_ID, JSON.stringify(storageViews));
    } else {
        throw new Error(`Could not find id "${id}" in storage.`)
    }
}