import { CSSProperties, Dispatch, DragEvent } from "react";
import { DirectionT, SideT } from "../SplitPane/SplitPaneTypes";
import { TreeT } from "./Tree/TreeTypes";
import { PortsT, ViewportStateT } from "./Viewport/ViewportTypes";


export type ID = number | string;
export const isID = (id: any) => typeof(id) === 'string' || typeof(id) === 'number';

export type ComponentRendererT = (props: Record<string, any>) => JSX.Element;

export interface PageT {
    id: ID,
    name: string,
    component: ComponentRendererT,
    props?: Record<string, any>,
}

export type PagesT = { [key: ID]: PageT }

export type PortMapT = { ports: PortsT, rootId: ID };


// Should always have same fields as TupleClassesT
export interface TupleStylesT {
    // Tuple
    tuple?:             CSSProperties,
    draggable?:         CSSProperties,
    splitpane?:         CSSProperties,

    // Viewport
    viewport?:          CSSProperties,
    view?:              CSSProperties,
    dropZoneCenter?:    CSSProperties,
    dropZoneSide?:      CSSProperties,
    scrollPane?:        CSSProperties,
    pane?:              CSSProperties,       // TODO: Probably remove this

    // TabBar
    tabBar?: {
        base?:          CSSProperties,
        dragOver?:      CSSProperties,
        // active?:     CSSProperties  // TODO: When viewport is active
    },
    tab?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
        dragOver?:      CSSProperties,
        active?:        CSSProperties,
    },
    tabLabel?:          CSSProperties,
    tabClose?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
    },

    // Tree
    tree?:              CSSProperties,
    branch?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
        dragOver?:      CSSProperties,
        renaming?:      CSSProperties,
    },
    branches?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
    },
    leafContainer?:     CSSProperties,
    leaf?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
        dragOver?:      CSSProperties,
        renaming?:      CSSProperties,
    },
    root?:              CSSProperties,
    rootlet?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
        renaming?:      CSSProperties,
    },
    rootlets?:          CSSProperties,
    rootletTextBox?:    CSSProperties,
    rootletContainer?:  CSSProperties,
    symbolContainer?:   CSSProperties,

    // Other
    popup?:             CSSProperties,
    popupItem?: {
        base?:          CSSProperties,
        hover?:         CSSProperties,
        active?:        CSSProperties,
    },
    popupHr?:           CSSProperties,
    trashcan?:          CSSProperties,  // Idk about this one still...
}


export interface TupleClassesT {
    // Tuple
    splitpane?:             string,
    tuple?:                 string,
    draggable?:             string,

    // Viewport
    viewport?:              string,
    view?:                  string,
    dropZoneCenter?:        string,
    dropZoneSide?:          string,
    scrollPane?:            string,
    pane?:                  string,       // TODO: Probably remove this

    // TabBar
    tabBar_base?:           string,
        tabBar_dragOver?:   string,
        // tabBar_active?:  string  // TODO: When viewport is active
    tab_base?:              string,
        tab_hover?:         string,
        tab_dragOver?:      string,
        tab_active?:        string,

    tabLabel?:              string,
    tabClose_base?:         string,
        tabClose_hover?:    string,

    // Tree
    tree?:                  string,
    branch_base?:           string,
        branch_hover?:      string,
        branch_dragOver?:   string,
        branch_renaming?:   string,
    branches_base?:         string,
        branches_hover?:    string,
    leafContainer?:         string,
    leaf_base?:             string,
        leaf_hover?:        string,
        leaf_dragOver?:     string,
        leaf_renaming?:     string,
    root?:                  string,
    rootlet_base?:          string,
        rootlet_hover?:     string,
        rootlet_renaming?:  string,
    rootlets?:              string,
    rootletTextBox?:        string,
    rootletContainer?:      string,
    symbolContainer?:       string,

    // Other
    popup?:                 string,
    popupItem_base?:        string,
        popupItem_hover?:   string,
        popupItem_active?:  string,
    popupHr?:               string,
    trashcan?:              string, // Idk about this one still...
}


//----------------------------------------------------------------------------------------------------------------------
// Events
//----------------------------------------------------------------------------------------------------------------------
export type DragSourceT = 'tree' | 'viewport';
export type DropDestinationT = 'branch' | 'leaf';

// I think we're going to do away with Events...
// All user really needs is onTreeUpdate, and onViewportUpdate
export interface EventsT {
    onTreeDrop?: (
        e: DragEvent,
        destinationItem: string,
        path: ID[],
        sourceItem: string,
        sourceType: DragSourceT,
        destinationType: DropDestinationT,
    ) => void
}


//----------------------------------------------------------------------------------------------------------------------
// Local Storage
//----------------------------------------------------------------------------------------------------------------------
export interface StoragePort {
    open: boolean,
    ports: PortsT,
    rootId: ID,
    name: string,
}

export interface StoragePorts { [key: ID]: StoragePort }


//----------------------------------------------------------------------------------------------------------------------
// State Types
//----------------------------------------------------------------------------------------------------------------------
export interface TupleStateT {
    pages: PagesT,
    viewport: ViewportStateT,
    viewportId: string,
    tree: TreeT,
    styles: TupleStylesT,
    classes: TupleClassesT,
    events: EventsT,
    darkMode: boolean,
}

export interface TupleContextT {
    dispatch: Dispatch<TupleActionT>,
    state: TupleStateT,
}

export enum TupleActionKind {
    // Viewport
    ADD_TAB="ADD_TAB",
    REMOVE_TAB="REMOVE_TAB",

    ADD_NEW_VIEW="ADD_NEW_VIEW",
    ADD_VIEW="ADD_VIEW",
    REMOVE_VIEW="REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW="CHANGE_ACTIVE_VIEW",

    // Other
    SET_PAGES="SET_PAGES",
}

export interface AddTabPayloadT { portId: ID, pageId: ID, dragPortId: ID, index: number };
export interface AddTabActionT { type: TupleActionKind.ADD_TAB, payload: AddTabPayloadT };

export interface RemoveTabPayloadT { portId: ID, index: number };
export interface RemoveTabActionT { type: TupleActionKind.REMOVE_TAB, payload: RemoveTabPayloadT };

export interface AddNewViewPayloadT { pageId: ID };
export interface AddNewViewActionT { type: TupleActionKind.ADD_NEW_VIEW, payload: AddNewViewPayloadT };

export interface AddViewPayloadT { dragPortId: ID, portId: ID, pageId: ID, side: SideT, direction: DirectionT };
export interface AddViewActionT { type: TupleActionKind.ADD_VIEW, payload: AddViewPayloadT };

export interface RemoveViewPayloadT { portId: ID };
export interface RemoveViewActionT { type: TupleActionKind.REMOVE_VIEW, payload: RemoveViewPayloadT };

export interface ChangeActiveViewPayloadT { portId: ID, pageId: ID };
export interface ChangeActiveViewActionT { type: TupleActionKind.CHANGE_ACTIVE_VIEW, payload: ChangeActiveViewPayloadT };

export interface SetPagesPayloadT { pages: PagesT };
export interface SetPagesActionT { type: TupleActionKind.SET_PAGES, payload: SetPagesPayloadT };

export type TupleActionT = AddTabActionT
                         | RemoveTabActionT
                         | AddNewViewActionT
                         | AddViewActionT
                         | RemoveViewActionT
                         | ChangeActiveViewActionT
                         | SetPagesActionT;
