//----------------------------------------------------------------------------------------------------------------------
// Both the entry point to Tuple, but also a 'Provider' component
//----------------------------------------------------------------------------------------------------------------------
import {
    createContext,
    ReactNode,
    useMemo,
    useReducer,
} from 'react';
import { getUniqueId } from '../../utils';
import { TreeT } from './Tree/TreeTypes';
import TupleInner from './TupleInner';

import { getViewsFromStorage, initialViewport, reducer } from './TupleState';
import { EventsT, ID, PagesT, TupleClassesT, TupleContextT, TupleStateT, TupleStylesT } from './TupleTypes';
import { isSplitViewT, isViewT, PortsT, ViewportStateT, PortT, SplitViewT, ViewportT, ViewT } from './Viewport/ViewportTypes';


export const TupleContext = createContext({
    // dispatch: null,  TODO: do I need to initialize dispatch
    state: {
        pages: {},
        viewport: initialViewport,
        styles: {},
        classes: {},
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
            const splitview = viewport as SplitViewT
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
        events: events || {},
    };


    const [state, dispatch] = useReducer(reducer, initState);
    const context = useMemo(() => ({state, dispatch}), [state, dispatch])

    return (
        <TupleContext.Provider value={context}>
            <TupleInner />
        </TupleContext.Provider>
    );
}


export default Tuple;
