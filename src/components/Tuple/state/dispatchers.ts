import { Dispatch } from "react";
import { DropSideT } from "../../Dropzone/DropZoneTypes";
import { SideT } from "../../SplitPane/SplitPaneTypes";
import {
    AddNewViewActionT,
    AddNewViewPayloadT,
    AddTabActionT,
    AddViewActionT,
    AddViewPayloadT,
    ChangeActiveViewActionT,
    ID,
    RemoveTabActionT,
    RemoveViewActionT,
    SetTabBarHeightActionT,
    TupleActionKind,
    TupleActionT,
} from "../TupleTypes";


//------------------------------------------------------------------------------------------------------------------
// Actions Dispatchers
//------------------------------------------------------------------------------------------------------------------
export const addTab = (
    dispatch: Dispatch<TupleActionT>,
    portId: ID,
    dragPortId: ID,
    dragPageId: ID,
    index: number = 0,
) => {
    const addTabAction: AddTabActionT = {
        type: TupleActionKind.ADD_TAB,
        payload: { portId, pageId: dragPageId, dragPortId, index: index },
    };

    // TODO: update local storage

    dispatch(addTabAction);
}


//---------------------------------------------------------------------------------------------------------------------
export const removeTab = (
    dispatch: Dispatch<TupleActionT>,
    portId: ID,
    index: number,
) => {
    const removeTabAction: RemoveTabActionT = {
        type: TupleActionKind.REMOVE_TAB,
        payload: { portId, index }
    };

    dispatch(removeTabAction);
}


//---------------------------------------------------------------------------------------------------------------------
export const addNewView = (
    dispatch: Dispatch<TupleActionT>,
    pageId: ID,
) => {
    const addNewViewPayload: AddNewViewPayloadT = { pageId };

    const addNewViewAction: AddNewViewActionT = {
        type: TupleActionKind.ADD_NEW_VIEW,
        payload: addNewViewPayload,
    };

    dispatch(addNewViewAction);
};

//---------------------------------------------------------------------------------------------------------------------
export const addView = (
    dispatch: Dispatch<TupleActionT>,
    portId: ID,
    dragPortId: ID,
    dragPageId: ID,
    side: DropSideT
) => {
    const addViewPayload: AddViewPayloadT = {
        dragPortId,
        portId: portId,
        pageId: dragPageId,
        side: SideT.NULL,
        direction: 'none',
    };

    switch(side) {
        case DropSideT.TOP:
            addViewPayload.side = SideT.HEAD;
            addViewPayload.direction = "vertical";
            break;
        case DropSideT.RIGHT:
            addViewPayload.side = SideT.TAIL;
            addViewPayload.direction = "horizontal";
            break;
        case DropSideT.BOTTOM:
            addViewPayload.side = SideT.TAIL;
            addViewPayload.direction = "vertical";
            break;
        case DropSideT.LEFT:
            addViewPayload.side = SideT.HEAD;
            addViewPayload.direction = "horizontal";
            break;
        default:
            throw Error('Unknown side.')
    }

    const addViewAction: AddViewActionT = {
        type: TupleActionKind.ADD_VIEW,
        payload: addViewPayload,
    };

    dispatch(addViewAction);
}


//---------------------------------------------------------------------------------------------------------------------
export const removeView = (
    dispatch: Dispatch<TupleActionT>,
    portId: ID,
) => {
    const removeViewAction: RemoveViewActionT = {
        type: TupleActionKind.REMOVE_VIEW,
        payload: { portId }
    }

    dispatch(removeViewAction);
}


//---------------------------------------------------------------------------------------------------------------------
export const changeView = (
    dispatch: Dispatch<TupleActionT>,
    portId: ID,
    pageId: ID,
) => {
    const changeActiveViewAction: ChangeActiveViewActionT = {
        type: TupleActionKind.CHANGE_ACTIVE_VIEW,
        payload: { portId, pageId }
    };

    dispatch(changeActiveViewAction); 
}


//---------------------------------------------------------------------------------------------------------------------
export const setTabBarHeight = (
    dispatch: Dispatch<TupleActionT>,
    height: number,
) => {
    const setTabBarHeightAction: SetTabBarHeightActionT = {
        type: TupleActionKind.SET_TAB_BAR_HEIGHT,
        payload: { height }
    };

    dispatch(setTabBarHeightAction);
}
