import { ID, PagesT } from "../../TupleTypes";
import { BranchT, LeafT, TreeT, isBranch, isLeaf } from "../TreeTypes";
import {
    AddNodePayloadT,
    MoveNodePayloadT,
    TreeStateT
} from "./types";

export const _rename_branch = (tree: TreeT, path: ID[], newLabel: string): TreeT => {
    return tree.map((node: BranchT) => {
        if (node.id === path[0] && 'label' in node) {
            if (path.length === 1) {  // We've reached the end of the path. Rename the branch
                return {
                    ...node,
                    label: newLabel
                };
            } else if ('branches' in node) {  // We're not at the end of the path. Recurse
                return {
                    ...node,
                    branches: _rename_branch(node.branches, path.slice(1), newLabel),
                };
            }
        }

        // Not on path. Return node unchanged
        return node;
    });
};

export const _rename_leaf = (pages: PagesT, pageId: ID, newName: string): PagesT => {
    return {
        ...pages,
        [pageId]: { ...pages[pageId], name: newName },
    };
};

// Fetches all leaves' pageIds in a branch
const _get_nested_page_ids = (tree: TreeT): ID[] => {
    return tree.reduce((acc, node) => {
        if (isLeaf(node))
            return acc.concat((node as LeafT).pageId);

        return acc.concat(_get_nested_page_ids( (node as BranchT).branches ));
    }, []);
};

export const _delete_branch = (tree: TreeT, pages: PagesT, path: ID[]): TreeStateT => {
    let newPages = pages;

    const newTree = tree.reduce((acc, node) => {
        if (isBranch(node) && node.id === path[0]) {
            const branch = node as BranchT;

            // We've reached the end of the path. Delete the branch
            if (path.length === 1) {
                const nestedPageIds: ID[] = _get_nested_page_ids(branch.branches);
                newPages = { ...pages };
                nestedPageIds.forEach((pageId) => {
                    delete newPages[pageId];
                });
                return acc;
            }

            // Recurse into nested branches
            const { tree: updatedBranches, pages: updatedPages } = _delete_branch(
                branch.branches,
                newPages,
                path.slice(1),
            );
            branch.branches = updatedBranches;
            newPages = updatedPages;
        }

        // Keep leaves and branches that are not being deleted
        acc.push(node);
        return acc;
    }, []);

    return {
        tree: newTree,
        pages: newPages
    };
}

export const _delete_leaf = (tree: TreeT, pages: PagesT, path: ID[]): TreeStateT => {
    let newPages = pages;

    const newTree = tree.reduce((acc, node) => {
        if (isLeaf(node) && path.length == 1 && node.id === path[0]) {
            const leaf = node as LeafT;
            newPages = { ...pages };
            delete newPages[leaf.pageId];

            return acc;
        };

        if (isBranch(node) && node.id === path[0]) {
            const branch = node as BranchT;

            // Recurse into nested branches
            const { tree: updatedBranches, pages: updatedPages } = _delete_leaf(
                branch.branches,
                newPages,
                path.slice(1),
            );
            branch.branches = updatedBranches;
            newPages = updatedPages;
        }

        // Keep leaves and branches that are not being deleted
        acc.push(node);
        return acc;
    }, []);

    return {
        tree: newTree,
        pages: newPages,
    };
};

export const _move_node = (state: TreeStateT, payload: MoveNodePayloadT): TreeStateT => {
    return state;
};

export const _add_node = (state: TreeStateT, payload: AddNodePayloadT): TreeStateT => {
    return state;
};