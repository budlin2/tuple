import { SplitViewT, ViewportT, ViewT } from "./Viewport/ViewportTypes";


export const getViewsFromStorage = (): ViewportT | null => {
    const storageViews = localStorage.getItem("views");
    if (storageViews)
        return JSON.parse(storageViews) as SplitViewT | ViewT;

    return null
};

