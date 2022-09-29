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
import { AddTabPayloadT, AddViewPayloadT, RemoveTabPayloadT, RemoveViewPayloadT, ViewActionKind, ViewportActionT } from "./ViewportTypes";


//---------------------------------------------------------------------------------------------------------------------
const _add_tab = (state: ViewT, payload: AddTabPayloadT): ViewT => {
    const newPageIds = [
        ...state.pageIds.slice(0, payload.index),
        payload.pid,
        ...state.pageIds.slice(payload.index),
    ];

    return {
        ...state,
        pageIds: newPageIds,
    } as ViewT;
}

// TODO : Working for all but alst element... hmmm. weird...
//---------------------------------------------------------------------------------------------------------------------
const _remove_tab = (state: ViewT, payload: RemoveTabPayloadT): ViewT => {
    console.log("state.pageIds.length", state.pageIds.length, "payload.index", payload.index)
    console.log(state.pageIds);
    const newPageIds = state.pageIds.filter((_, i) => i !== payload.index);

    console.log("newPageIds", newPageIds);

    return {
        ...state,
        pageIds: newPageIds,
    } as ViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _add_view = (state: ViewT, payload: AddViewPayloadT): SplitViewT => {
    return {} as SplitViewT;
}


//---------------------------------------------------------------------------------------------------------------------
const _remove_view = (state: SplitViewT, payload: RemoveViewPayloadT): ViewportT => {
    return payload.side == "head"
        ? state.tail
        : state.head
    }



//---------------------------------------------------------------------------------------------------------------------
// TODO : I don't think I need path at all actually
const reducer = (state: ViewportT, action: ViewportActionT): ViewportT => {
    switch(action.type) {
        case ViewActionKind.ADD_TAB:
            // TODO: state.push was working
            return _add_tab(state as ViewT, action.payload as AddTabPayloadT);
        case ViewActionKind.REMOVE_TAB:
            return _remove_tab(state as ViewT, action.payload as RemoveTabPayloadT);
        case ViewActionKind.ADD_VIEW:
            return _add_view(state as ViewT, action.payload as AddViewPayloadT);
        case ViewActionKind.REMOVE_VIEW:
            return _remove_view(state as SplitViewT, action.payload as RemoveViewPayloadT);
        default:
            return state;
    }
    return state;
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
    path: string,
}


const Port = ({ viewport, path='' }: PortProps): JSX.Element => {
    const [_viewport, dispatch] = useReducer(reducer, viewport);

    // VIEW
    if (isViewT(_viewport)) {
        const view = _viewport as ViewT;
        
        return (
            <View
                pageIds={view.pageIds}
                activePageId={view.activePageId}
                path={path}
                dispatch={dispatch}
            />
        );
    }
    
    // SPLIT-VIEW
    if (isSplitViewT(_viewport)) {
        const splitview = _viewport as SplitViewT;
        validateSplitView(splitview);

        const HEAD_PATH = `${path}h`;
        const TAIL_PATH = `${path}t`;

        return (
            <SplitPane
                dir={splitview.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { splitview.head && <Port viewport={splitview.head} path={HEAD_PATH}/> }
                { splitview.tail && <Port viewport={splitview.tail} path={TAIL_PATH}/> }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;