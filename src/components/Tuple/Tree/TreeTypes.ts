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

// Helper function to distinguishg leaves from branches
export const isLeaf = (node: LeafT | BranchT): boolean => !!(node as LeafT)?.pageId;

export type TreeT = (LeafT | BranchT)[];

export interface RootletDisplayT {
    text: string,
    open: boolean,
}
