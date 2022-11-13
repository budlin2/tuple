import {
    createContext,
    ReactNode,
} from 'react';
import { TreeT } from './Tree/TreeTypes';
import TupleInner from './TupleInner';

import { getViewsFromStorage } from './TupleState';
import { EventsT, PagesT, TupleClassesT, TupleContextT, TupleStylesT } from './TupleTypes';
import { ViewportT } from './Viewport/ViewportTypes';


export const TupleContext = createContext({
    pages: {},
    views: null,  // initial views.. Will overwrite with localStorage first
    styles: {},
    classes: {},
    events: {},
    tree: {},
} as TupleContextT);


export interface TupleProps {
    pages: PagesT,
    views: ViewportT,
    tree: TreeT,

    styles?: TupleStylesT,
    classes?: TupleClassesT,
    events?: EventsT,
    
    children: ReactNode,
};


const Tuple = ({
    pages,
    views,
    tree,
    styles,
    classes,
    events,
}: TupleProps) => {
    const initViews = getViewsFromStorage() || views || null;

    const context = {
        pages,
        views: initViews,
        tree,
        styles: styles || {},
        classes: classes || {},
        events: events || {},
    };


    return (
        <TupleContext.Provider value={context}>
            <TupleInner />
        </TupleContext.Provider>
    );
}


export default Tuple;
