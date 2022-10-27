import {
    createContext,
    Children,
    ReactNode,
} from 'react';

import { getViewsFromStorage } from './TupleState';
import { EventsT, PagesT, TupleClassesT, TupleContextT, TupleStylesT } from './TupleTypes';
import { ViewportT } from './Viewport/ViewportTypes';


// On second thought, this should live in Tuple...
export const TupleContext = createContext({
    pages: {},
    views: null,  // initial views.. Will overwrite with localStorage first
    styles: {},
    classes: {},
    events: {},
} as TupleContextT);


export interface TupleProviderProps {
    pages: PagesT,
    views: ViewportT,

    styles?: TupleStylesT,
    classes?: TupleClassesT,
    events?: EventsT,
    
    children: ReactNode,
};


const TupleProvider = ({
    pages,
    styles,
    classes,
    events,
    views,
    children,
}: TupleProviderProps) => {
    const childrenArr = Children.toArray(children);
    if (childrenArr.length != 1)
        throw 'TupleProvider takes only one child: a Tuple component';

    const initViews = getViewsFromStorage() || views || null;

    const context = {
        pages,
        views: initViews,
        styles: styles || {},
        classes: classes || {},
        events: events || {},
    };


    return (
        <TupleContext.Provider value={context}>
            { children }
        </TupleContext.Provider>
    );
}


export default TupleProvider;
