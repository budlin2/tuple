import { getUniqueId } from "../../../../utils";
import { ID, PageT } from "../../TupleTypes";
import { BranchT, LeafT, TreeT } from "../TreeTypes";
import {
    _add_node,
    _delete_branch,
    _delete_leaf,
    _rename_branch,
    _rename_leaf,
} from "./actions";

import {
    AddBranchPayloadT,
    AddLeafPayloadT,
    DeleteBranchPayloadT,
    DeleteLeafPayloadT,
    RenameBranchPayloadT,
    RenameLeafPayloadT,
    TreeActionKind,
    TreeActionT,
    TreeStateT
} from "./types";

export const initialTree: TreeT = [];

export const treeReducer = (state: TreeStateT, action: TreeActionT): TreeStateT => {
    const { type, payload } = action;
    switch(type) {
        case TreeActionKind.RENAME_BRANCH:
            const { path, newName: newBranchName } = payload as RenameBranchPayloadT;
            return {
                ...state,
                tree: _rename_branch(state.tree, path, newBranchName),
            };

        case TreeActionKind.RENAME_LEAF:
            const { pageId, newName: newLeafName }: RenameLeafPayloadT = payload;
            return {
                ...state,
                pages: _rename_leaf(state.pages, pageId, newLeafName),
            }

        case TreeActionKind.DELETE_BRANCH:
            const { path: branchPath }: DeleteBranchPayloadT = payload;
            return _delete_branch(state.tree, state.pages, branchPath);

        case TreeActionKind.DELETE_LEAF:
            const { path: leafPath }: DeleteLeafPayloadT = payload;
            return _delete_leaf(state.tree, state.pages, leafPath);

        case TreeActionKind.ADD_BRANCH:
            const { path: addBranchPath, position: branchPos, name: branchName }: AddBranchPayloadT = payload;
            const newBranch: BranchT = {
                id: getUniqueId(),
                label: branchName,
                branches: []
            };

            return {
                ...state,
                tree: _add_node(state.tree, addBranchPath, branchPos, newBranch),
            };

        case TreeActionKind.ADD_LEAF:
            const { path: addLeafPath, position: leafPos, name: leafName, component, props }: AddLeafPayloadT = payload;

            const pid: ID = getUniqueId();
            const lid: ID = getUniqueId();

            const newPage: PageT = { id: pid, name: leafName, component, props };
            const newLeaf: LeafT = { id: lid, pageId: pid };

            const newPages = { ...state.pages, [pid]: newPage };

            return {
                // ...state,
                tree: _add_node(state.tree, addLeafPath, leafPos, newLeaf),
                pages: newPages,
            };

        default:
            return state;
    }
}
