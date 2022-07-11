import { FC, CSSProperties } from 'react';

import Tree from './Tree';
import SplitPane from './SplitPane';
import Draggable from './Draggable';


interface Props {
    tree: object,
    style?: CSSProperties,
}


const Tuple: FC<Props> = ({
    tree,
    style={},
}: Props) => {
    const tupleStyle = {..._styles.tuple, ...style}

    return (
        <div style={tupleStyle}>
            <SplitPane headLen='25%'>
                <Tree tree={tree} />
                <div style={{ height: '100%', borderLeft: '2px solid black' }}>Window View</div>
            </SplitPane>
            <Draggable
                text='Foo'
                style={{ background: 'lightgrey' }}
                position={{x: 20, y: 30}}
            />
        </div>
    );
}


const _styles = {
    tuple: { background: 'red' }
}


export default Tuple;