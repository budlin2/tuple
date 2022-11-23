import {
    AddTabPayloadT,
    AddViewPayloadT,
    ChangeActiveViewPayloadT,
    RemoveTabPayloadT,
    RemoveViewPayloadT,
    TupleActionKind,
    TupleActionT,
    TupleStateT
} from "../TupleTypes";

import { ViewportStateT } from "../Viewport/ViewportTypes";
import { _add_tab, _add_view, _change_active_view, _remove_tab, _remove_view } from "./actions";


export const initialViewport: ViewportStateT = { root: '', ports: {}, skipTabRemoval: false }


export const reducer = (state: TupleStateT, action: TupleActionT): TupleStateT => {
    switch(action.type) {
        case TupleActionKind.ADD_TAB:
            return _add_tab(state, action.payload as AddTabPayloadT);
        case TupleActionKind.REMOVE_TAB:
            return _remove_tab(state, action.payload as RemoveTabPayloadT);
        case TupleActionKind.ADD_VIEW:
            return _add_view(state, action.payload as AddViewPayloadT);
        case TupleActionKind.REMOVE_VIEW:
            return _remove_view(state, action.payload as RemoveViewPayloadT);
        case TupleActionKind.CHANGE_ACTIVE_VIEW:
            return _change_active_view(state, action.payload as ChangeActiveViewPayloadT);
        default:
            return state;
    }
}
