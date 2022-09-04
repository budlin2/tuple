import {
    createContext,
    Children,
    ReactNode,
} from 'react';


import {
    EventsT,
    PagesT,
    TupleClassesT,
    TupleContextT,
    TupleStylesT
} from '../../types';


// On second thought, this should live in Tuple...
export const TupleContext = createContext({
    pages: {},
    views: null,
    styles: {},
    classes: {},
    events: {},
} as TupleContextT);


interface TupleProviderProps {
    pages: PagesT,
    styles: TupleStylesT,
    classes: TupleClassesT,
    events: EventsT,
    
    children: ReactNode,
};


const TupleProvider = ({
    pages,
    styles,
    classes,
    events,
    children,
}: TupleProviderProps) => {
    const childrenArr = Children.toArray(children);
    if (childrenArr.length != 1) throw 'TupleProvider takes only one child: a Tuple component';
    // TODO : Check type of Child. Make sure it is Tuple

    // TODO : Save views in local storage
    const views = null;

    const context = {
        pages,
        views,
        styles,
        classes,
        events,
    };


    return (
        <TupleContext.Provider value={context}>
            { children }
        </TupleContext.Provider>
    );
}


export default TupleProvider;