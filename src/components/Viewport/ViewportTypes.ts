// TODO: Each component should have its own types file.
// Can also have a types file at root, but that is currently getting too bloated;

import { ID } from "../../types";

// Actions
export interface ViewportActionT { type: ViewActionKind, payload: object }; // TODO: object could be mroe specific


export enum ViewActionKind {
    ADD_TAB = "ADD_TAB",
    REMOVE_TAB = "REMOVE_TAB",
    ADD_VIEW = "ADD_VIEW",
    REMOVE_VIEW = "REMOVE_VIEW",
}


export interface AddTabPayloadT {
    pid: ID,
}