//----------------------------------------------------------------------------------------------------------------------
// Both the entry point to Tuple, but also a context 'Provider' component
//----------------------------------------------------------------------------------------------------------------------
import {
    createContext,
    useMemo,
    useReducer,
    ReactElement,
    useEffect,
} from 'react';
import { getUniqueId, isObject } from '../../utils';
import { TreeT } from './Tree/TreeTypes';
import TupleInner from './TupleInner';
import { initialViewport, reducer } from './state';

import {
    EventsT,
    ID,
    PagesT,
    PortMapT,
    StoragePort,
    TupleClassesT,
    TupleContextT,
    TupleStateT,
    TupleStylesT
} from './TupleTypes';

import {
    isSplitViewT,
    isViewT,
    PortsT,
    ViewportStateT,
    PortT,
    SplitViewT,
    ViewportT,
    ViewT,
} from './Viewport/ViewportTypes';

import {
    get_storage_port,
    get_storage_ports,
    get_viewport_id_from_query_params,
    set_storage_port,
    set_storage_port_open,
} from './state/browser-actions';
import { TreeProps } from './Tree/Tree';
import { setPages } from './state/dispatchers';

export const ROOT_PORT_ID = 'root';

export const TupleContext = createContext({
    state: {
        pages: {},
        viewport: initialViewport,
        viewportId: '',
        tree: {},
        styles: {},
        classes: {},
        events: {},
    }
} as TupleContextT);


export interface TupleProps {
    pages: PagesT,
    tree?: TreeT,
    children?: ReactElement<TreeProps>,

    views?: ViewportT,
    styles?: TupleStylesT,
    classes?: TupleClassesT,
    events?: EventsT,  // TODO: Remove?

    enableTrashcan?: boolean,

    onTreeUpdate?: (tree: TreeT) => void,
    onViewportUpdate?: (viewport: ViewportT) => void,
};

// TODO: Check that every pageId in the tree is in the pages object
// The user should be able to disbale the check as it may be expensive
const validateProps = ({
    pages,
    tree,
    views,
    children,
} : TupleProps) => {
    if (!isObject(pages))
        throw Error('"pages" props should be of the form, PagesT.');

    if (views && !(isViewT(views) || isSplitViewT(views)))
        throw Error('"views" props should be of type - ViewT or SplitViewT.');

    if (tree && children)
        console.warn('Both "tree" and "children" props were passed to Tuple. "tree" will be ignored.');

    if (!tree && !children)
        throw Error('Either "tree" or "children" props must be passed to Tuple.');

    if (tree && !Array.isArray(tree))
        throw Error('"tree" prop must be an array.');
}


const Tuple = ({
    pages,
    views,
    tree,
    styles,
    classes,
    events,
    enableTrashcan=false,
    children=null,
}: TupleProps) => {
    validateProps({ pages, views, tree, children });

    const viewportId = get_viewport_id_from_query_params();

    window.addEventListener("beforeunload", () => {
        set_storage_port_open(viewportId || 'root', false);
    }, false);

    //------------------------------------------------------------------------------------------------------------------
    const buildPortMapHelper = (
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
                headId: buildPortMapHelper(splitview.head, portMap, id, true),
                tailId: buildPortMapHelper(splitview.tail as ViewportT, portMap, id, false),
                isHead,
            } as PortT;
        } else {
            throw new Error('All viewport values must be of type ViewT or SplitViewT');
        }

        return id;
    };

    const buildPortMap = (viewport: ViewportT): PortMapT => {
        const ports: PortsT = {};
        const rootId = useMemo(() => buildPortMapHelper(viewport, ports), []);

        return { ports, rootId };
    }

    //------------------------------------------------------------------------------------------------------------------
    const getPortMap = (): PortMapT | null => {
        const emptyPortMap: PortMapT = { ports: {}, rootId: '' };

        // Query Paramater
        if (viewportId) {
            const urlParamPorts: StoragePort = get_storage_port(viewportId);
            if (urlParamPorts?.ports && urlParamPorts?.rootId) {
                set_storage_port_open(viewportId);
                const { ports, rootId } = urlParamPorts;
                return { ports, rootId };
            }

            // TODO: Add ID to storage?
            return emptyPortMap;  // ID found in URL Query paramaters, but not in storage
        }

        // Storage
        const storagePorts = get_storage_ports();
        if (storagePorts) {
            if (storagePorts[ROOT_PORT_ID]) {
                set_storage_port_open(ROOT_PORT_ID);
                const { ports, rootId } = storagePorts[ROOT_PORT_ID];
                return { ports, rootId };
            }
        }

        // Props
        if (views) {
            const { ports, rootId } = buildPortMap(views);
            set_storage_port(ROOT_PORT_ID, ports, rootId, true);
            return { ports, rootId };
        }

        // No ports found. Create new root
        set_storage_port(ROOT_PORT_ID, {}, null, true);
        return emptyPortMap;
    };

    const { ports, rootId } = getPortMap();
    const initViewportState: ViewportStateT = { ...initialViewport, root: rootId, ports };

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const initState: TupleStateT = {
        pages,
        viewport: initViewportState,
        viewportId,
        tree,
        styles: styles || {},
        classes: classes || {},
        events: events || {},
    };

    const [state, dispatch] = useReducer(reducer, initState);
    const context = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    useEffect(() => setPages(dispatch, pages), [pages]);

    //------------------------------------------------------------------------------------------------------------------

    return (
        <TupleContext.Provider value={context}>
            <TupleInner enableTrashcan={ enableTrashcan }>
                { children }
            </TupleInner>
        </TupleContext.Provider>
    );
}


export default Tuple;
