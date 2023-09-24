import { ID, PagesT } from "../../TupleTypes";
import { TreeT } from "../TreeTypes";

export interface TreeStateT {
    tree: TreeT,
    pages: PagesT,
};

export enum TreeActionKind {
    RENAME_BRANCH='RENAME_BRANCH',
    RENAME_LEAF='RENAME_LEAF',
    DELETE_BRANCH='DELETE_BRANCH',
    MOVE_NODE='MOVE_NODE',
    ADD_NODE='ADD_NODE',
}

export interface RenameBranchPayloadT { path: ID[], newName: string };
export interface RenameBranchActionT { type: TreeActionKind.RENAME_BRANCH, payload: RenameBranchPayloadT };

export interface RenameLeafPayloadT { pageId: ID, newName: string };
export interface RenameLeafActionT { type: TreeActionKind.RENAME_LEAF, payload: RenameLeafPayloadT };

export interface DeleteBranchPayloadT { path: ID[] };
export interface DeleteBranchActionT { type: TreeActionKind.DELETE_BRANCH, payload: DeleteBranchPayloadT };

export interface MoveNodePayloadT { };
export interface MoveNodeActionT { type: TreeActionKind.MOVE_NODE, payload: MoveNodePayloadT };

export interface AddNodePayloadT { };
export interface AddNodeActionT { type: TreeActionKind.ADD_NODE, payload: AddNodePayloadT };

export type TreeActionT = RenameBranchActionT
                        | RenameLeafActionT
                        | DeleteBranchActionT
                        | MoveNodeActionT
                        | AddNodeActionT;
