import { ID } from "../../TupleTypes";
import { BranchT, TreeT } from "../TreeTypes";
import {
    AddNodePayloadT,
    DeleteNodePayloadT,
    MoveNodePayloadT,
    TreeStateT
} from "./types";

export const _rename_branch = (tree: TreeT, path: ID[], newLabel: string): TreeT => {
    return tree.map((node: BranchT) => {
        if (node.id === path[0] && 'label' in node) {
            if (path.length === 1) {
                // Rename the branch when at the end of the path
                return { ...node, label: newLabel };
            } else if ('branches' in node) {
                // Recurse into nested branches with the updated path
                return {
                    ...node,
                    branches: _rename_branch(node.branches, path.slice(1), newLabel),
                };
            }
        }
        return node;
    });
}

export const _delete_node = (state: TreeStateT, payload: DeleteNodePayloadT): TreeStateT => {
    return state;
};

export const _move_node = (state: TreeStateT, payload: MoveNodePayloadT): TreeStateT => {
    return state;
};

export const _add_node = (state: TreeStateT, payload: AddNodePayloadT): TreeStateT => {
    return state;
};