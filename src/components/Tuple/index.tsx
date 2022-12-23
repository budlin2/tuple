//----------------------------------------------------------------------------------------------------------------------
// Both the entry point to Tuple, but also a 'Provider' component
//----------------------------------------------------------------------------------------------------------------------
import {
    createContext,
    ReactNode,
    useMemo,
    useReducer,
    useEffect,
} from 'react';
import { getUniqueId } from '../../utils';
import { TreeT } from './Tree/TreeTypes';
import TupleInner from './TupleInner';

import { initialViewport, reducer } from './state';
import { EventsT, ID, PagesT, TupleClassesT, TupleContextT, TupleStateT, TupleStylesT } from './TupleTypes';
import { isSplitViewT, isViewT, PortsT, ViewportStateT, PortT, SplitViewT, ViewportT, ViewT } from './Viewport/ViewportTypes';

import lannister from './templates/lannister.module.css';
// import { getViewsFromStorage, setViewsToStorage } from './storage';


const getTemplateCss = (template: string | null): CSSModuleClasses | null => {
    switch(template) {
        case 'lannister': return lannister;
        default: return null;
    }
}

export const TupleContext = createContext({
    // dispatch: null,  TODO: do I need to initialize dispatch
    state: {
        pages: {},
        viewport: initialViewport,
        styles: {},
        classes: {},
        template: null,
        events: {},
        tree: {},
    }
} as TupleContextT);


export interface TupleProps {
    pages: PagesT,
    views: ViewportT,
    tree: TreeT,

    styles?: TupleStylesT,
    classes?: TupleClassesT,
    template?: string,
    events?: EventsT,
};


const Tuple = ({
    pages,
    views,
    tree,
    styles,
    classes,
    template,
    events,
}: TupleProps) => {
    // let initViews = getViewsFromStorage() || views || null;
    let initViews = views || null;
    // if (initViews) {

    // } else {
    //     if (views) {
    //         const defaultView = views;
    //         const rootId = 'root';
    //         setViewsToStorage(rootId, defaultView);
    //         initViews = {
    //             [`${rootId}`]: {
    //                 view: views,
    //                 open: true,
    //             }
    //         }
    //     } {
    //         initViews = null;
    //     }
    // }

    const buildPortMap = (
        viewport: ViewportT,
        portMap: PortsT,
        parentId: ID | null = null,
        isHead: boolean | null = null
    ): ID => {
        const id = getUniqueId();

        if (isViewT(viewport)) {
            const view = viewport as ViewT;
            portMap[id] = {
                parentId,
                isSplitView: false,
                pageIds: view.pageIds,
                activePageId: view.activePageId,
                direction: null,
                headId: null,
                tailId: null,
                isHead,
            } as PortT;
        } else if (isSplitViewT(viewport)) {
            const splitview = viewport as SplitViewT;
            portMap[id] = {
                parentId,
                isSplitView: true,
                pageIds: null,
                activePageId: null,
                direction: splitview.direction,
                headId: buildPortMap(splitview.head, portMap, id, true),
                tailId: buildPortMap(splitview.tail as ViewportT, portMap, id, false),
                isHead,
            } as PortT;
        } else {
            throw new Error('All viewport values must be of type ViewT or SplitViewT');
        }

        return id;
    };

    const portMap: PortsT = {};
    const rootId = useMemo(() => buildPortMap(initViews as ViewportT, portMap), []);
    const initViewportState: ViewportStateT = { ...initialViewport, root: rootId, ports: portMap };

    const initState: TupleStateT = {
        pages,
        viewport: initViewportState,
        tree,
        styles: styles || {},
        classes: classes || {},
        template: getTemplateCss(template),
        events: events || {},
    };


    const [state, dispatch] = useReducer(reducer, initState);
    const context = useMemo(() => (
        { state, dispatch }
    ), [state, dispatch]);

    // useEffect(() => {
    //     let foo = window.open(
    //         'https://google.com/',
    //         '_blank',  // TODO: Can I use this??
    //         `height=${600}, width=${800}`,
    //     );
    //     console.log(foo);
    //     const onUnload = (e: any) => {
    //         e.preventDefault();
    //         console.log('hey!')
    //         foo?.close();
    //         e.returnValue = "Are you sure?"
    //         return "Are you sure?"
    //     }
        
    //     window.addEventListener('beforeunload', onUnload);
    //     return window.removeEventListener('beforeunload', onUnload);
    // }, []);

    return (
        <TupleContext.Provider value={context}>
            {/* <TupleInner showTree={false} /> */}
            <TupleInner />
        </TupleContext.Provider>
    );
}


export default Tuple;
