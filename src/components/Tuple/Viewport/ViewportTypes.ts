import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";


//----------------------------------------------------------------------------------------------------------------------
// Data Types
//----------------------------------------------------------------------------------------------------------------------
export interface ViewT {
    pageIds: ID[],
    activePageId: ID
}

export interface SplitViewT {
    head: ViewT | SplitViewT,
    tail: ViewT | SplitViewT | null,
    direction: DirectionT,
}

export type ViewportT = SplitViewT | ViewT;

export const isViewT = (v: any) => (v as ViewT).pageIds !== undefined;
export const isSplitViewT = (v: any) => (v as SplitViewT).head !== undefined;

export interface PortT {
    parentId: ID | null,  // null if root
    isSplitView: boolean,
    pageIds: ID[] | null,
    activePageId: ID | null,
    direction: DirectionT | null,
    headId: ID | null,
    tailId: ID | null,
    isHead: boolean | null,  // null if root
};

// One element of type ID, which is root - used to identify root id
export type PortsT = { [key: ID]: PortT };

export interface PortStateT {
    root: ID,
    ports: PortsT,
};

export interface IdPortTupleT {  // TODO: This name leaves something to be desired
    id: ID,
    port: PortT,
};

//----------------------------------------------------------------------------------------------------------------------
// State Types
//----------------------------------------------------------------------------------------------------------------------
export enum ViewActionKind {
    ADD_TAB = "ADD_TAB",
    REMOVE_TAB = "REMOVE_TAB",
    ADD_VIEW = "ADD_VIEW",
    REMOVE_VIEW = "REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW = "CHANGE_ACTIVE_VIEW",
}


export enum SideT {
    HEAD = "head",
    TAIL = "tail",
}


export interface AddTabPayloadT { portId: ID, pageId: ID, index: number };
export interface AddTabActionT { type: ViewActionKind.ADD_TAB, payload: AddTabPayloadT };

export interface RemoveTabPayloadT { portId: ID, index: number };
export interface RemoveTabActionT { type: ViewActionKind.REMOVE_TAB, payload: RemoveTabPayloadT };

// TODO: Do I need this?
export interface AddViewPayloadT { portId: ID, pageId: ID, side: SideT, direction: DirectionT };
export interface AddViewActionT { type: ViewActionKind.ADD_VIEW, payload: AddViewPayloadT };

export interface RemoveViewPayloadT { portId: ID };
export interface RemoveViewActionT { type: ViewActionKind.REMOVE_VIEW, payload: RemoveViewPayloadT };

export interface ChangeActiveViewPayloadT { portId: ID, pageId: ID };
export interface ChangeActiveViewActionT { type: ViewActionKind.CHANGE_ACTIVE_VIEW, payload: ChangeActiveViewPayloadT };

export type ViewportActionT = AddTabActionT
                            | RemoveTabActionT
                            | AddViewActionT
                            | RemoveViewActionT
                            | ChangeActiveViewActionT;
