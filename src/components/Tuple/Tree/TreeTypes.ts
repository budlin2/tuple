import { ID } from "../../../types";


export interface BranchT {
    id: ID,
    label: string,
    branches: (ID | BranchT)[],
}

export type TreeT = (ID | BranchT)[];
