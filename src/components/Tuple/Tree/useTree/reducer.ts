import { TreeT } from "../TreeTypes";
import {
    _add_node,
    _delete_branch,
    _move_node,
    _rename_branch,
    _rename_leaf,
} from "./actions";

import {
    AddNodePayloadT,
    DeleteBranchPayloadT,
    MoveNodePayloadT,
    RenameBranchPayloadT,
    TreeActionKind,
    TreeActionT,
    TreeStateT
} from "./types";

export const initialTree: TreeT = [];

export const treeReducer = (state: TreeStateT, action: TreeActionT): TreeStateT => {
    const { type, payload } = action;
    switch(type) {
        case TreeActionKind.RENAME_BRANCH:
            const { path, newName } = payload as RenameBranchPayloadT;
            return {
                ...state,
                tree: _rename_branch(state.tree, path, newName),
            };
        case TreeActionKind.RENAME_LEAF:
            return {
                ...state,
                pages: _rename_leaf(state.pages, payload.pageId, payload.newName),
            }
        case TreeActionKind.DELETE_BRANCH:
            return _delete_branch(state.tree, state.pages, payload.path);
        case TreeActionKind.MOVE_NODE:
            return _move_node(state, action.payload as MoveNodePayloadT);
        case TreeActionKind.ADD_NODE:
            return _add_node(state, action.payload as AddNodePayloadT);
        default:
            return state;
    }
}
