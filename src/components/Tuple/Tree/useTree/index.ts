import { useReducer } from 'react';
import { TreeT } from '../TreeTypes';
import { ID, PagesT } from '../../TupleTypes';
import { treeReducer } from './reducer';
import { TreeActionKind } from './types';

export const useTree = (initialTreeData: TreeT, initialPagesData: PagesT) => {
    const [state, dispatch] = useReducer(treeReducer, {
        tree: initialTreeData,
        pages: initialPagesData,
    });

    const renameBranch = (path: ID[], newName: string) => dispatch({
        type: TreeActionKind.RENAME_BRANCH,
        payload: { path, newName }
    });

    const renameLeaf = (pageId: ID, newName: string) => dispatch({
        type: TreeActionKind.RENAME_LEAF,
        payload: { pageId, newName }
    });

    return {
        tree: state.tree,
        pages: state.pages,
        renameBranch,
        renameLeaf,
    };
}