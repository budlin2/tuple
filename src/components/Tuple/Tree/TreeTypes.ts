import { ID } from "../TupleTypes";


export interface BranchT {
    id: ID,
    label: string,
    branches: (ID | BranchT)[],
}

export type TreeT = (ID | BranchT)[];

export interface RootletDisplayT {
    text: string,
    open: boolean,
}
