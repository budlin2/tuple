import {
    CSSProperties,
    useState,
    useContext,
} from 'react';

import Tree from '../Tree';
import Viewport from '../Viewport';
import SplitPane from '../SplitPane';
import {
    SplitViewT,
    PagesT,
    TreeT,
} from '../../types';
import { TupleContext } from './TupleProvider';


interface Props {
    pages: PagesT,
    tree: TreeT,
    style?: CSSProperties,
}


const Tuple = ({
    tree,
    style={},
}: Props) => {
    const tupleStyle = {..._styles.tuple, ...style};
    const {pages, views}: {
        pages: PagesT,
        views: SplitViewT | null,
    } = useContext(TupleContext);
    const [_views, setViews] = useState(views)

    // TODO... this needs to be better
    const DefaultView = <>No Views. SAD!</>

    return (
        <div style={tupleStyle}>
            <SplitPane resizerPos='25%'>
                <Tree tree={tree} />
                <Viewport views={views} defaultView={DefaultView} />
            </SplitPane>
        </div>
    );
}


const _styles = {
    tuple: { background: 'red', height: '900px' }
}


export default Tuple;