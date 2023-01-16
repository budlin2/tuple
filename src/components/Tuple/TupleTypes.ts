import { CSSProperties, Dispatch, DragEvent } from "react";
import { DirectionT, SideT } from "../SplitPane/SplitPaneTypes";
import { TreeT } from "./Tree/TreeTypes";
import { PortsT, ViewportStateT, ViewportT } from "./Viewport/ViewportTypes";


export type ID = number | string;
export const isID = (id: any) => typeof(id) === 'string' || typeof(id) === 'number';

export type ComponentRendererT = (props: any) => JSX.Element;

export interface PageT {
    name: string,
    component: ComponentRendererT,
    props?: object,
}

export type PagesT = { [key: ID]: PageT }

export type PortMapT = { ports: PortsT, rootId: ID };


// Should always have same fields as TupleClassesT
export interface TupleStylesT {
    tuple?: CSSProperties,
    draggable?: CSSProperties,
    splitpane?: CSSProperties,

    tree?: CSSProperties,
    branch?: CSSProperties,
    branches?: CSSProperties,
    leafContainer?: CSSProperties,
    leaf?: CSSProperties,
    root?: CSSProperties,
    rootlet?: CSSProperties,
    rootlets?: CSSProperties,
    rootletTextBox?: CSSProperties,
    rootletContainer?: CSSProperties,
    symbolContainer?: CSSProperties,
    trashcan?: CSSProperties,

    tabBar?: CSSProperties,
    tabBarDragOver?: CSSProperties,
    // tabBarActive?: CSSProperties,  // TODO: when user has selected current view
    tab?: CSSProperties,
    tabDragOver?: CSSProperties,
    tabActive?: CSSProperties,
    tabLabel?: CSSProperties,
    tabClose?: CSSProperties,

    viewport?: CSSProperties,
    view?: CSSProperties,
    dropZoneCenter?: CSSProperties,
    dropZoneSide?: CSSProperties,
    scrollPane?: CSSProperties,
}


export interface TupleClassesT {
    tuple?: string,
    draggable?: string,
    splitpane?: string,

    tree?: string,
    branch?: string,
    branches?: string,
    leafContainer?: string,
    leaf?: string,
    root?: string,
    rootlet?: string,
    rootlets?: string,
    rootletTextBox?: string,
    rootletContainer?: string,
    symbolContainer?: string,
    trashcan?: string,

    tabBar?: string,
    tabBarDragOver?: string,
    // tabBarActive?: string,  // TODO: when user has selected current view
    tab?: string,
    tabDragOver?: string,
    tabActive?: string,
    tabLabel?: string,
    tabClose?: string,

    viewport?: string,
    view?: string,
    dropZoneCenter?: string,
    dropZoneSide?: string,
    scrollPane?: string,
}


//----------------------------------------------------------------------------------------------------------------------
// Events
//----------------------------------------------------------------------------------------------------------------------
export type DragSourceT = 'tree' | 'viewport';
export type DropDestinationT = 'branch' | 'leaf';

export interface EventsT {
    onTreeDrop?: (
        e: DragEvent,
        destinationItem: string,
        path: string[],
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
    tabBarHeight: number,  // kinda gross, but a lot of styling is dependent on the tab bar height
}

export interface TupleContextT {
    dispatch: Dispatch<TupleActionT>,
    state: TupleStateT,
}

export enum TupleActionKind {
    ADD_TAB="ADD_TAB",
    REMOVE_TAB="REMOVE_TAB",

    ADD_NEW_VIEW="ADD_NEW_VIEW",
    ADD_VIEW="ADD_VIEW",
    REMOVE_VIEW="REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW="CHANGE_ACTIVE_VIEW",

    SET_TAB_BAR_HEIGHT="SET_TAB_BAR_HEIGHT",
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

export interface SetTabBarHeightPayloadT { height: number };
export interface SetTabBarHeightActionT { type: TupleActionKind.SET_TAB_BAR_HEIGHT, payload: SetTabBarHeightPayloadT };

export type TupleActionT = AddTabActionT
                         | RemoveTabActionT
                         | AddNewViewActionT
                         | AddViewActionT
                         | RemoveViewActionT
                         | ChangeActiveViewActionT
                         | SetTabBarHeightActionT;
