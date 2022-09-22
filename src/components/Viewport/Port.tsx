//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import { useReducer } from "react";
import {
    ViewT,
    SplitViewT,
    isViewT,
    isSplitViewT,
    ViewportT,
} from "../../types"
import SplitPane from "../SplitPane";
import View from "./View/View";
import { AddTabPayloadT, ViewActionKind, ViewportActionT } from "./ViewportTypes";


//---------------------------------------------------------------------------------------------------------------------
const _add_tab = (state: ViewT, payload: AddTabPayloadT): ViewT => {
    console.log('_add_tab state', state);
    console.log('_add_tab payload', payload);

    state.pageIds.push(payload.pid);

    return {...state} as ViewT;
}

//---------------------------------------------------------------------------------------------------------------------
const reducer = (state: ViewportT, action: ViewportActionT): ViewportT => {
    switch(action.type) {
        case ViewActionKind.ADD_TAB: return _add_tab(state as ViewT, action.payload as AddTabPayloadT);
        case ViewActionKind.REMOVE_TAB: break;
        case ViewActionKind.ADD_VIEW: break;
        case ViewActionKind.REMOVE_VIEW: break;
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
    view: SplitViewT | ViewT,
    path: string,
}


const Port = ({ view, path='' }: PortProps): JSX.Element => {
    if (isViewT(view)) {
        view = view as ViewT;
        const [viewport, dispatch] = useReducer(reducer, view);
        
        return (
            <View
                pageIds={view.pageIds}
                activePageId={view.activePageId}
                path={path}
                dispatch={dispatch}
            />
        );
    } else if (isSplitViewT(view)) {
        view = view as SplitViewT;
        validateSplitView(view);

        const HEAD_PATH = `${path}h`;
        const TAIL_PATH = `${path}t`;

        return (
            <SplitPane
                dir={view.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { view.head && <Port view={view.head} path={HEAD_PATH}/> }
                { view.tail && <Port view={view.tail} path={TAIL_PATH}/> }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;