import { CSSProperties, MouseEvent as rMouseEvent } from 'react';
import { DirectionT } from './components/SplitPane/SplitPaneTypes';


export type ID = number | string;

export type ComponentRendererT = (props: any) => JSX.Element;

export interface PageT {
    name: string,
    component: ComponentRendererT,
    props?: object,
}

export type PagesT = { [key: ID]: PageT }


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


//----------------------------------------------------------------------------------------------------------------------
// Type Checkers
//----------------------------------------------------------------------------------------------------------------------
export const isViewT = (v: any) => (v as ViewT).pageIds !== undefined;
export const isSplitViewT = (v: any) => (v as SplitViewT).head !== undefined;
// [DEPR] const isReactComponent = (comp: any) => !!comp?.prototype?.isReactComponent || isValidElement(comp);
export const isID = (id: any) => typeof(id) === 'string' || typeof(id) === 'number';

//----------------------------------------------------------------------------------------------------------------------
// Tuple Context
//----------------------------------------------------------------------------------------------------------------------
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


export interface EventsT {}


export interface TupleContextT {
    pages: PagesT,
    views: ViewportT | null,
    styles: TupleStylesT,
    classes: TupleClassesT,
    events: EventsT,
}
