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

//----------------------------------------------------------------------------------------------------------------------
// State Types
//----------------------------------------------------------------------------------------------------------------------
export enum ViewActionKind {
    ADD_TAB = "ADD_TAB",
    REMOVE_TAB = "REMOVE_TAB",
    REPLACE_WITH_VIEW = "REPLACE_WITH_VIEW",
    REPLACE_WITH_SPLITVIEW = "REPLACE_WITH_SPLITVIEW",
    ADD_VIEW = "ADD_VIEW",
    REMOVE_VIEW = "REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW = "CHANGE_ACTIVE_VIEW",
}


export enum SideT {
    HEAD = "head",
    TAIL = "tail",
}


export interface AddTabPayloadT { pid: ID, index: number };
export interface AddTabActionT { type: ViewActionKind.ADD_TAB, payload: AddTabPayloadT };

export interface RemoveTabPayloadT { index: number };
export interface RemoveTabActionT { type: ViewActionKind.REMOVE_TAB, payload: RemoveTabPayloadT };

export type ReplaceWithViewPayloadT = ViewT;
export interface ReplaceWithViewT { type: ViewActionKind.REPLACE_WITH_VIEW, payload: ReplaceWithViewPayloadT };

export type ReplaceWithSplitviewPayloadT = SplitViewT;
export interface ReplaceWithSplitviewT { type: ViewActionKind.REPLACE_WITH_SPLITVIEW, payload: ReplaceWithSplitviewPayloadT };

// TODO: Do I need this?
export interface AddViewPayloadT { pid: ID, side: SideT, direction: DirectionT };
export interface AddViewActionT { type: ViewActionKind.ADD_VIEW, payload: AddViewPayloadT };

export interface ChangeActiveViewPayloadT { pid: ID };
export interface ChangeActiveViewActionT { type: ViewActionKind.CHANGE_ACTIVE_VIEW, payload: ChangeActiveViewPayloadT };


export type ViewportActionT = AddTabActionT
                            | RemoveTabActionT
                            | AddViewActionT
                            | ReplaceWithViewT
                            | ReplaceWithSplitviewT // Todo working on this
                            | ChangeActiveViewActionT;
