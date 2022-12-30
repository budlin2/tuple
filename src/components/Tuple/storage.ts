import { ID, StorageView, StorageViews } from "./TupleTypes";
import { SplitViewT, ViewportT, ViewT } from "./Viewport/ViewportTypes";


//---------------------------------------------------------------------------------------------------------------------
export const getViewsFromStorage = (): StorageViews | null => {
    const storageViews = localStorage.getItem("views");
    if (storageViews)
        return JSON.parse(storageViews) as StorageViews;

    return null
};


//---------------------------------------------------------------------------------------------------------------------
export const setViewsToStorage = (id: ID, view: ViewportT, open=true) => {
    const existingViews: StorageViews | null = getViewsFromStorage() || {};
    existingViews[id] = {
        open,
        view,
    } as StorageView;
}
