import { ID } from "../Tuple/TupleTypes";

export type HorizontalRuleT = 'hr';

export type PopupItemT = {
    id: ID,
    label: string,
    onClick?: (...args: any[]) => void,
};

export type PopupItemsT = (PopupItemT | HorizontalRuleT)[];