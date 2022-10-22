//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { useEffect, useReducer } from "react";
import {
    ViewT,
    SplitViewT,
    isViewT,
    isSplitViewT,
    ViewportT,
} from "../../../types";
import SplitPane from "../../SplitPane";
import View from "./View";
import { AddTabPayloadT, AddViewPayloadT, ChangeActiveViewPayloadT, RemoveTabPayloadT, RemoveViewActionT, RemoveViewPayloadT, SideT, ViewActionKind, ViewportActionT } from "./ViewportTypes";


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

// TODO : Throwing console errors and tabs dissapearing after removeView called
//---------------------------------------------------------------------------------------------------------------------
const _remove_view = (state: SplitViewT, payload: RemoveViewPayloadT): ViewportT => {
    console.log('--- Remove Tab ---')
    console.log('state', state)
    console.log('payload', payload)
    return payload.side == SideT.HEAD ? state.tail : state.head
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
        case ViewActionKind.ADD_VIEW:
            return _add_view(state as ViewT, action.payload as AddViewPayloadT);
        case ViewActionKind.REMOVE_VIEW:
            return _remove_view(state as SplitViewT, action.payload as RemoveViewPayloadT);
        case ViewActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state as ViewT, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}


//----------------------------------------------------------------------------------------------------------------------
const validateSplitView = (splitView: SplitViewT) => {
    if (splitView.direction == 'none') {
        if (!!splitView.tail) {
            console.warn('Views with diection "none" should have only one child.');
        }
    } else {
        if (!splitView.tail) {
            throw new Error(`"${splitView.direction}" views require two children`);
        }
    }
};


//----------------------------------------------------------------------------------------------------------------------


interface PortProps {
    viewport: SplitViewT | ViewT,
    removeView?: () => void,
}


const Port = ({ viewport, removeView=()=>{} }: PortProps): JSX.Element => {
    const [_viewport, dispatch] = useReducer(reducer, viewport);

    useEffect(() => {
        if (isViewT(_viewport)) {
            const view = _viewport as ViewT;
            if (view.pageIds.length == 0) {
                removeView();
            }
        }
    }, [_viewport]);

    // VIEW
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
    
    // SPLIT-VIEW
    if (isSplitViewT(_viewport)) {
        const splitview = _viewport as SplitViewT;
        validateSplitView(splitview);

        const removeSide = (side: SideT) => {
            const removeSideAction: RemoveViewActionT = {
                type: ViewActionKind.REMOVE_VIEW,
                payload: { side },
            };
    
            // TODO : update local storage
    
            dispatch(removeSideAction);
        }

        return (
            <SplitPane
                dir={splitview.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { splitview.head &&
                    <Port
                        viewport={splitview.head}
                        removeView={ ()=>removeSide(SideT.HEAD) } />
                }
                { splitview.tail &&
                    <Port
                        viewport={splitview.tail}
                        removeView={ ()=>removeSide(SideT.TAIL) } />
                }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;