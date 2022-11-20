import { CSSProperties, Dispatch } from "react";
import { DirectionT, SideT } from "../SplitPane/SplitPaneTypes";
import { TreeT } from "./Tree/TreeTypes";
import { ViewportStateT } from "./Viewport/ViewportTypes";


export type ID = number | string;
export const isID = (id: any) => typeof(id) === 'string' || typeof(id) === 'number';

export type ComponentRendererT = (props: any) => JSX.Element;

export interface PageT {
    name: string,
    component: ComponentRendererT,
    props?: object,
}

export type PagesT = { [key: ID]: PageT }


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

    tabBar?: CSSProperties,
    tab?: CSSProperties,
    tabLabel?: CSSProperties,
    tabClose?: CSSProperties,

    viewport?: CSSProperties,
    view?: CSSProperties,
    dropZone?: CSSProperties,
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

    tabBar?: string,
    tab?: string,
    tabLabel?: string,
    tabClose?: string,

    viewport?: string,
    view?: string,
    dropZone?: string,
}


export interface EventsT {}  // TODO: Implement this


//----------------------------------------------------------------------------------------------------------------------
// State Types
//----------------------------------------------------------------------------------------------------------------------
export interface TupleStateT {
    pages: PagesT,
    viewport: ViewportStateT,
    tree: TreeT,
    styles: TupleStylesT,
    classes: TupleClassesT,
    events: EventsT,
}

export interface TupleContextT {
    dispatch: Dispatch<TupleActionT>,
    state: TupleStateT,
}

export enum TupleActionKind {
    ADD_TAB = "ADD_TAB",
    REMOVE_TAB = "REMOVE_TAB",
    ADD_VIEW = "ADD_VIEW",
    REMOVE_VIEW = "REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW = "CHANGE_ACTIVE_VIEW",
}

export interface AddTabPayloadT { portId: ID, pageId: ID, dragPortId: ID, index: number };
export interface AddTabActionT { type: TupleActionKind.ADD_TAB, payload: AddTabPayloadT };

export interface RemoveTabPayloadT { portId: ID, index: number };
export interface RemoveTabActionT { type: TupleActionKind.REMOVE_TAB, payload: RemoveTabPayloadT };

// TODO: Do I need this?
export interface AddViewPayloadT { dragPortId: ID, portId: ID, pageId: ID, side: SideT, direction: DirectionT };
export interface AddViewActionT { type: TupleActionKind.ADD_VIEW, payload: AddViewPayloadT };

export interface RemoveViewPayloadT { portId: ID };
export interface RemoveViewActionT { type: TupleActionKind.REMOVE_VIEW, payload: RemoveViewPayloadT };

export interface ChangeActiveViewPayloadT { portId: ID, pageId: ID };
export interface ChangeActiveViewActionT { type: TupleActionKind.CHANGE_ACTIVE_VIEW, payload: ChangeActiveViewPayloadT };

export type TupleActionT = AddTabActionT
                         | RemoveTabActionT
                         | AddViewActionT
                         | RemoveViewActionT
                         | ChangeActiveViewActionT;