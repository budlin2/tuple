import { CSSProperties, MouseEvent as rMouseEvent, ReactNode } from 'react';

//----------------------------------------------------------------------------------------------------------------------
// Types
//----------------------------------------------------------------------------------------------------------------------
export type DragEvent = (e: MouseEvent | rMouseEvent, leaf: HTMLElement, leafView: ReactNode) => void;
export type ID = number | string;
export type DirectionT = 'horizontal' | 'vertical' | 'none';


//----------------------------------------------------------------------------------------------------------------------
// Interfaces
//----------------------------------------------------------------------------------------------------------------------
export interface PositionT {  // todo should this be PositionI?
    x: number,
    y: number,
}

export interface MinMaxT {
    min: number,
    max: number,
}

//----------------------------------------------------------------------
export interface PageT {
    name: string,
    // TODO: Better typing thany any? Probz not tbh...
    component: (props: any) => JSX.Element,
    props?: object,
}
export type PagesT = { [key: ID]: PageT }
//----------------------------------------------------------------------
export interface BranchT {
    label: string,
    pageIds: (ID | BranchT)[],
}
export type TreeT = (ID | BranchT)[];
//----------------------------------------------------------------------

export interface ViewT {
    id: ID,
    pageIds: ID[],
    activePageId: ID
}

export interface SplitViewT {
    head: ViewT | SplitViewT,
    tail: ViewT | SplitViewT | null,
    direction: DirectionT,
}


//----------------------------------------------------------------------------------------------------------------------
// Type Checkers
//----------------------------------------------------------------------------------------------------------------------
export const isViewT = (v: any) => (v as ViewT).pageIds !== undefined;
export const isSplitViewT = (v: any) => (v as SplitViewT).head !== undefined;


//----------------------------------------------------------------------------------------------------------------------
// Tuple Context
//----------------------------------------------------------------------------------------------------------------------

// Should always have same fields as TupleStylesT
export interface TupleStylesT {
    tuple?: CSSProperties,
    tree?: CSSProperties,
    branch?: CSSProperties,
    branches?: CSSProperties,
    leaf?: CSSProperties,
    tab?: CSSProperties,
    tabBar?: CSSProperties,
    tabClose?: CSSProperties,


    port?: CSSProperties, // TODO : Do I need this?
    view?: CSSProperties,
    viewport?: CSSProperties,
    draggable?: CSSProperties,
    splitpane?: CSSProperties,
}


export interface TupleClassnamesT {
    tuple?: CSSProperties,
    tree?: CSSProperties,
    branch?: CSSProperties,
    branches?: CSSProperties,
    leaf?: CSSProperties,
    tab?: CSSProperties,
    tabBar?: CSSProperties,
    tabClose?: CSSProperties,

    port?: CSSProperties, // TODO : Do I need this?
    view?: CSSProperties,
    viewport?: CSSProperties,
    draggable?: CSSProperties,
    splitpane?: CSSProperties,
}


export interface events {

}


export interface TupleContextT {
    pages: PagesT,
    styles: TupleStylesT,
}