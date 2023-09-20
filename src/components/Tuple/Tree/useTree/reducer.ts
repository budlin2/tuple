import { TreeT } from "../TreeTypes";
import {
    _add_node,
    _delete_node,
    _move_node,
    _rename_branch,
    _rename_leaf,
} from "./actions";

import {
    AddNodePayloadT,
    DeleteNodePayloadT,
    MoveNodePayloadT,
    RenameBranchPayloadT,
    TreeActionKind,
    TreeActionT,
    TreeStateT
} from "./types";

export const initialTree: TreeT = [];

export const treeReducer = (state: TreeStateT, action: TreeActionT): TreeStateT => {
    switch(action.type) {
        case TreeActionKind.RENAME_BRANCH:
            const { path, newName } = action.payload as RenameBranchPayloadT;
            return {
                ...state,
                tree: _rename_branch(state.tree, path, newName),
            };
        case TreeActionKind.RENAME_LEAF:
            return {
                ...state,
                pages: _rename_leaf(state.pages, action.payload.pageId, action.payload.newName),
            }
        case TreeActionKind.DELETE_NODE:
            return _delete_node(state, action.payload as DeleteNodePayloadT);
        case TreeActionKind.MOVE_NODE:
            return _move_node(state, action.payload as MoveNodePayloadT);
        case TreeActionKind.ADD_NODE:
            return _add_node(state, action.payload as AddNodePayloadT);
        default:
            return state;
    }
}
