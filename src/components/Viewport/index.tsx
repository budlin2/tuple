import { ReactNode } from 'react';

import { SplitViewT } from '../../types';
import Port from './Port';

export interface Props {
    views: SplitViewT | null,
    defaultView: ReactNode,  // TODO: Also allow ViewT
}


const Viewport = ({
    views,
    defaultView,
}: Props) => {
    // TODO : Show defaultView
    if (!views)
        return (
            <>No Views. SAD!</>
        );

    return (
        <div style = {_styles.root}>
            <Port view={views as SplitViewT} />
        </div>
    );
};


const _styles = {
    root: {
        height: '100%',
        width: '100%',
    }
}


export default Viewport;