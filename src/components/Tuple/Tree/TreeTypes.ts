import { PopupItemsT } from "../../Popup/PopupTypes";
import { ID } from "../TupleTypes";

export interface LeafT {
    id: ID,
    pageId: ID,
}

export interface BranchT {
    id: ID,
    label: string,
    branches: (LeafT | BranchT)[],
}

// Helper functions to distinguishg leaves from branches
export const isLeaf = (node: LeafT | BranchT): boolean => !!(node as LeafT)?.pageId;
export const isBranch = (node: LeafT | BranchT): boolean => !!(node as BranchT)?.branches;

export enum NodeStateT {
    ADDING_LEAF     ='ADDING_LEAF',
    ADDING_BRANCH   ='ADDING_BRANCH',
    NULL            ='NULL',
};

export type TreeT = (LeafT | BranchT)[];

export interface RootletDisplayT {
    id: ID,
    text: string,
    open: boolean,
    name: string,
}

export interface PositionT { x: number, y: number };
export interface PopupDetailsT { items: PopupItemsT, pos: PositionT };
