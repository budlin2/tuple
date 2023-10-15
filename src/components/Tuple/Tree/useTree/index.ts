import { useReducer } from 'react';
import { TreeT } from '../TreeTypes';
import { ComponentRendererT, ID, PagesT } from '../../TupleTypes';
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

    const deleteBranch = (path: ID[]) => dispatch({
        type: TreeActionKind.DELETE_BRANCH,
        payload: { path },
    });

    const deleteLeaf = (path: ID[]) => dispatch({
        type: TreeActionKind.DELETE_LEAF,
        payload: { path },
    });

    const addBranch = (
        path:       ID[],
        position:   number,
        name:       string
    ) => dispatch({
        type: TreeActionKind.ADD_BRANCH,
        payload: {
            path,
            position,
            name
        },
    });

    const addLeaf = (
        path:       ID[],
        position:   number,
        name:       string,
        component:  ComponentRendererT,
        props:      Record<string, any>
    ) => dispatch({
        type: TreeActionKind.ADD_LEAF,
        payload: {
            path,
            position,
            name,
            component,
            props,
        },
    })

    return {
        tree: state.tree,
        pages: state.pages,
        renameBranch,
        renameLeaf,
        deleteBranch,
        deleteLeaf,
        addBranch,
        addLeaf,
    };
}