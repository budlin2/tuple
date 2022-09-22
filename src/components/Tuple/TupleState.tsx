import {
    SplitViewT,
    ViewportT,
    ViewT,
} from '../../types';


export const getViewsFromStorage = (): ViewportT | null => {
    const storageViews = localStorage.getItem("views");
    if (storageViews)
        return JSON.parse(storageViews) as SplitViewT | ViewT;

    return null
};

