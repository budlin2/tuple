import { MouseEvent as rMouseEvent } from 'react';


//---------------------------------------------------------------------------------------------------------------------


export interface PositionType {
    x: number,
    y: number,
}

export interface MinMaxType {
    min: number,
    max: number,
}


//---------------------------------------------------------------------------------------------------------------------


export type DragEvent = (e: MouseEvent | rMouseEvent, leaf: HTMLElement, leafView: ReactNode) => void;


//---------------------------------------------------------------------------------------------------------------------


export type ID = number | string;

export interface PageT {
    name: string,
    // TODO: Better typing thany any? Probz not tbh...
    component: (props: any) => JSX.Element,
    props?: object,
}
export type PagesT = { [key: ID]: PageT }


interface BranchT {
    label: string,
    pageIds: (ID | BranchT)[],
}
export type TreeT = (ID | BranchT)[];


export interface ViewT {
    id: ID,
    pageIds: ID[],
    activePageId: ID
}
export const isViewT = (v: any) => {
    return (v as ViewT).pageIds !== undefined;
}


export type DirectionT = 'horizontal' | 'vertical' | 'none';


export interface SplitViewT {
    head: ViewT | SplitViewT,
    tail: ViewT | SplitViewT | null,
    direction: DirectionT,
}
export const isSplitViewT = (v: any) => {
    return (v as SplitViewT).head !== undefined;
}
