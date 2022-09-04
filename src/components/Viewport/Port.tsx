//----------------------------------------------------------------------------------------------------------------------
// Recursive component tree of Views and SplitPanes that make up a Viewport
//----------------------------------------------------------------------------------------------------------------------

import {
    ViewT,
    SplitViewT,
    isViewT,
    isSplitViewT,
} from "../../types"
import SplitPane from "../SplitPane";
import View from "./View";


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
}


const Port = ({
    view,
}: PortProps): JSX.Element => {
    if (isViewT(view)) {
        view = view as ViewT;
        return (
            <View
                id={view.id}
                pageIds={view.pageIds}
                activePageId={view.activePageId}
            />
        );
    } else if (isSplitViewT(view)) {
        view = view as SplitViewT;
        validateSplitView(view);
        return (
            <SplitPane
                dir={view.direction}
                resizerPos='50%'>
                {/* TODO: add resizerPos to SplitViewT */}
                { view.head && <Port view={view.head} /> }
                { view.tail && <Port view={view.tail} /> }
            </SplitPane>
        );
    }

    throw Error('Invalid argument. Paramater "view" needs to be SplitViewT or ViewT');
};


export default Port;