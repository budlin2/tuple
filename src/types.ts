import { CSSProperties, MouseEvent as rMouseEvent } from 'react';
import ViewStories from './components/Tuple/Viewport/View/View.stories';

//----------------------------------------------------------------------------------------------------------------------
// Types
//----------------------------------------------------------------------------------------------------------------------
export type DragEvent = (e: MouseEvent | rMouseEvent, page: PageT) => void;  // TODO: Remove if unused
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
export type ComponentRendererT = (props: any) => JSX.Element;  // TODO: Will I need this for Leaf component?
export interface PageT {
    name: string,
    // TODO: Better typing thany any? Probz not tbh...
    component: ComponentRendererT,
    props?: object,
}
export type PagesT = { [key: ID]: PageT }
//----------------------------------------------------------------------
export interface BranchT {
    id: ID,
    label: string,
    branches: (ID | BranchT)[],
}
export type TreeT = (ID | BranchT)[];
//----------------------------------------------------------------------

export interface ViewT {
    pageIds: ID[],
    activePageId: ID
}

export interface SplitViewT {
    head: ViewT | SplitViewT,
    tail: ViewT | SplitViewT,
    direction: DirectionT,
}

export type ViewportT = SplitViewT | ViewT;

//-----------------------------------------------
export type ViewStateT = ViewT;

export interface SplitViewStateT {
    direction: DirectionT,
}

export type ViewportStateT = SplitViewStateT | ViewStateT;

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
    // TODO : draggable style?
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
    port?: CSSProperties, // TODO : Do I need this?
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
    port?: string, // TODO : Do I need this?
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
