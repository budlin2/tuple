import { ReactNode } from "react";


export type ID = number | string;


export interface PageT {
    name: string,
    // props: TODO
    component: ReactNode,
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
