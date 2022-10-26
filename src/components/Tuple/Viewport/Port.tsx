//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { Dispatch, useEffect, useReducer, useState } from "react";
import {
    ViewT,
    SplitViewT,
    isViewT,
    isSplitViewT,
    ViewportT,
} from "../../../types";
import SplitPane from "../../SplitPane";
import View from "./View";
import {
    AddTabPayloadT,
    AddViewPayloadT,
    ChangeActiveViewPayloadT,
    RemoveTabPayloadT,
    ReplaceWithSplitviewPayloadT,
    ReplaceWithSplitviewT,
    ReplaceWithViewPayloadT,
    ReplaceWithViewT,
    SideT,
    ViewActionKind,
    ViewportActionT
} from "./ViewportTypes";


//---------------------------------------------------------------------------------------------------------------------
const _add_tab = (state: ViewT, payload: AddTabPayloadT): ViewT => {
    console.log('--- Add Tab ---')
    console.log('state', state)
    console.log('payload', payload)
    const newPageIds = [
        ...state.pageIds.slice(0, payload.index),
        payload.pid,
        ...state.pageIds.slice(payload.index),
    ];

    return {
        // ...state,
        pageIds: newPageIds,
        activePageId: payload.pid,
    } as ViewT;
}

//---------------------------------------------------------------------------------------------------------------------
const _remove_tab = (state: ViewT, payload: RemoveTabPayloadT): ViewT => {
    const newPageIds = state.pageIds.filter((_, i) => i !== payload.index);

    const newActivePageId = state.pageIds[payload.index] != state.activePageId
        ? state.activePageId
        : state.pageIds[payload.index+1] || state.pageIds[payload.index-1]

    return {
        // ...state,
        pageIds: newPageIds,
        activePageId: newActivePageId,
    } as ViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _replace_with_view = (state: SplitViewT, payload: ReplaceWithViewPayloadT): ViewT => {
    console.log('_replace_with_view')
    console.log(state)
    console.log(payload)
    return {
        pageIds: payload.pageIds,
        activePageId: payload.activePageId,
    } as ViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _replace_with_splitview = (state: SplitViewT, payload: ReplaceWithSplitviewPayloadT): SplitViewT => {
    console.log('_replace_with_splitview')
    console.log(state)
    console.log(payload)
    return {
        head: payload.head,
        tail: payload.tail,
        direction: payload.direction,
    } as SplitViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _add_view = (state: ViewT, payload: AddViewPayloadT): SplitViewT => {
    const newView: ViewT = {
        pageIds: [payload.pid],
        activePageId: payload.pid,
    };

    return {
        head: payload.side == SideT.HEAD ? newView : state,
        tail: payload.side == SideT.TAIL ? newView: state,
        direction: payload.direction,
    } as SplitViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _change_active_view = (state: ViewT, payload: ChangeActiveViewPayloadT): ViewT => {
    return {
        ...state,
        activePageId: payload.pid,
    };
}


// TODO: Move this and actions to PortState.tsx
//---------------------------------------------------------------------------------------------------------------------
const reducer = (state: ViewportT, action: ViewportActionT): ViewportT => {
    switch(action.type) {
        case ViewActionKind.ADD_TAB:
            return _add_tab(state as ViewT, action.payload as AddTabPayloadT);
        case ViewActionKind.REMOVE_TAB:
            return _remove_tab(state as ViewT, action.payload as RemoveTabPayloadT);
        case ViewActionKind.REPLACE_WITH_VIEW:
            return _replace_with_view(state as SplitViewT, action.payload as ReplaceWithViewPayloadT)
        case ViewActionKind.REPLACE_WITH_SPLITVIEW:
            return _replace_with_splitview(state as SplitViewT, action.payload as ReplaceWithSplitviewPayloadT)
        case ViewActionKind.ADD_VIEW:
            return _add_view(state as ViewT, action.payload as AddViewPayloadT);
        case ViewActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state as ViewT, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}


//----------------------------------------------------------------------------------------------------------------------
interface PortProps {
    viewport: SplitViewT | ViewT,
    propogateUp?: boolean,  // Replace parent with self
    onTabListEmptyCb?: () => void
    dispatchParent: Dispatch<ViewportActionT>
}


const Port = ({
    viewport,
    propogateUp = false,
    onTabListEmptyCb=()=>{},
    dispatchParent=()=>{},
}: PortProps): JSX.Element => {
    const [_viewport, dispatch] = useReducer(reducer, viewport);
    const [replaceWithHead, setReplaceWithHead] = useState(false);
    const [replaceWithTail, setReplaceWithTail] = useState(false);

    // When list becomes empty
    useEffect(() => {
        if (isViewT(_viewport)) {
            const view = _viewport as ViewT;
            if (view.pageIds.length == 0) {
                onTabListEmptyCb();
            }
        }
    }, [_viewport, isViewT, onTabListEmptyCb]);

    // When other side of parent (which is a splitview) is being removed
    useEffect(() => {
        if (propogateUp) {
            if (isViewT(_viewport)) {
                const view = _viewport as ViewT;
                const replaceParentWithViewAction: ReplaceWithViewT = {
                    type: ViewActionKind.REPLACE_WITH_VIEW,
                    payload: { pageIds: view.pageIds, activePageId: view.activePageId },
                };
                // TODO : update local storage
                dispatchParent(replaceParentWithViewAction);
            }

            if (isSplitViewT(_viewport)) {
                const splitview = _viewport as SplitViewT;
                const replaceParentWithSplitviewAction: ReplaceWithSplitviewT = {
                    type: ViewActionKind.REPLACE_WITH_SPLITVIEW,
                    payload: {
                        head: splitview.head,
                        tail: splitview.tail,  // TODO: this is outdated... and probably the issue...
                        // perhaps I need to propgate all the way down and then back up?
                        direction: splitview.direction,
                    },
                };
                // TODO : update local storage
                dispatchParent(replaceParentWithSplitviewAction);
            }
        }
    }, [propogateUp, _viewport, isViewT, isSplitViewT, dispatchParent]);

    //------------------------------------------------------------------------------------------------------------------
    // VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (isViewT(_viewport)) {
        const view = _viewport as ViewT;

        return (
            <View
                pageIds={view.pageIds}
                activePageId={view.activePageId}
                dispatch={dispatch}
            />  
        );
    }
    
    //------------------------------------------------------------------------------------------------------------------
    // SPLIT-VIEW
    //------------------------------------------------------------------------------------------------------------------
    if (isSplitViewT(_viewport)) {
        const splitview = _viewport as SplitViewT;

        const head = <Port
            viewport={splitview.head as SplitViewT | ViewT}
            propogateUp={replaceWithHead}
            onTabListEmptyCb={() => setReplaceWithTail(true)}
            dispatchParent={dispatch}
        />

        const tail = <Port
            viewport={splitview.tail as SplitViewT | ViewT}
            propogateUp={replaceWithTail}
            onTabListEmptyCb={() => setReplaceWithHead(true)}
            dispatchParent={dispatch}
        />

        return (
            <SplitPane
                dir={splitview.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { splitview.head && head }
                { splitview.tail && tail }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;