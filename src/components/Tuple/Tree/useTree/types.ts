import { ID, PagesT } from "../../TupleTypes";
import { TreeT } from "../TreeTypes";

export interface TreeStateT {
    tree: TreeT,
    pages: PagesT,
};

export enum TreeActionKind {
    RENAME_BRANCH='RENAME_BRANCH',
    RENAME_LEAF='RENAME_LEAF',
    DELETE_NODE='DELETE_NODE',
    MOVE_NODE='MOVE_NODE',
    ADD_NODE='ADD_NODE',
}

export interface RenameBranchPayloadT { path: ID[], newName: string };
export interface RenameBranchActionT { type: TreeActionKind.RENAME_BRANCH, payload: RenameBranchPayloadT };

export interface RenameLeafPayloadT { pageId, newName: string };
export interface RenameLeafActionT { type: TreeActionKind.RENAME_LEAF, payload: RenameLeafPayloadT };

export interface DeleteNodePayloadT { };
export interface DeleteNodeActionT { type: TreeActionKind.DELETE_NODE, payload: DeleteNodePayloadT };

export interface MoveNodePayloadT { };
export interface MoveNodeActionT { type: TreeActionKind.MOVE_NODE, payload: MoveNodePayloadT };

export interface AddNodePayloadT { };
export interface AddNodeActionT { type: TreeActionKind.ADD_NODE, payload: AddNodePayloadT };

export type TreeActionT = RenameBranchActionT
                        | RenameLeafActionT
                        | DeleteNodeActionT
                        | MoveNodeActionT
                        | AddNodeActionT;
