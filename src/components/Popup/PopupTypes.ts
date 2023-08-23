import { ID } from "../Tuple/TupleTypes";

export type HorizontalRuleT = 'hr';

export type PopupItemT = {
    id: ID,
    label: string,
    onClick?: () => void,
};

export type PopupItemsT = (PopupItemT | HorizontalRuleT)[];