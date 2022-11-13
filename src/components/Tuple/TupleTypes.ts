import { CSSProperties } from "react";
import { TreeT } from "./Tree/TreeTypes";
import { ViewportT } from "./Viewport/ViewportTypes";


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
}


export interface EventsT {}  // TODO: Implement this


export interface TupleContextT {
    pages: PagesT,
    views: ViewportT | null,
    tree: TreeT,
    styles: TupleStylesT,
    classes: TupleClassesT,
    events: EventsT,
}
