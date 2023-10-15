import { ComponentRendererT, ID, PagesT } from "../../TupleTypes";
import { TreeT } from "../TreeTypes";

export interface TreeStateT {
    tree: TreeT,
    pages: PagesT,
};

export enum TreeActionKind {
    RENAME_BRANCH='RENAME_BRANCH',
    RENAME_LEAF='RENAME_LEAF',
    DELETE_BRANCH='DELETE_BRANCH',
    DELETE_LEAF='DELETE_LEAF',
    ADD_BRANCH='ADD_BRANCH',
    ADD_LEAF='ADD_LEAF',
    MOVE_NODE='MOVE_NODE',
    ADD_NODE='ADD_NODE',
}

export interface RenameBranchPayloadT { path: ID[], newName: string };
export interface RenameBranchActionT { type: TreeActionKind.RENAME_BRANCH, payload: RenameBranchPayloadT };

export interface RenameLeafPayloadT { pageId: ID, newName: string };
export interface RenameLeafActionT { type: TreeActionKind.RENAME_LEAF, payload: RenameLeafPayloadT };

export interface DeleteBranchPayloadT { path: ID[] };
export interface DeleteBranchActionT { type: TreeActionKind.DELETE_BRANCH, payload: DeleteBranchPayloadT };

export interface DeleteLeafPayloadT { path: ID[] };
export interface DeleteLeafActionT { type: TreeActionKind.DELETE_LEAF, payload: DeleteLeafPayloadT };

export interface AddBranchPayloadT { path: ID[], position: number, name: string };
export interface AddBranchActionT { type: TreeActionKind.ADD_BRANCH, payload: AddBranchPayloadT };

export interface AddLeafPayloadT { path: ID[], position: number, name: string, component: ComponentRendererT, props: Record<string, any> };
export interface AddLeafActionT { type: TreeActionKind.ADD_LEAF, payload: AddLeafPayloadT };

export interface MoveNodePayloadT { };
export interface MoveNodeActionT { type: TreeActionKind.MOVE_NODE, payload: MoveNodePayloadT };

export type TreeActionT = RenameBranchActionT
                        | RenameLeafActionT
                        | DeleteBranchActionT
                        | DeleteLeafActionT
                        | AddBranchActionT
                        | AddLeafActionT
                        | MoveNodeActionT;
