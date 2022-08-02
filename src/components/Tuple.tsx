import { CSSProperties, ReactNode, useState } from 'react';

import Tree, { TreeType } from './Tree';
import { LeafEvent } from './Leaf';
import SplitPane from './SplitPane';
import Draggable, { Props as DraggableProps } from './Draggable';
import TabBar from './TabBar';


interface Props {
    tree: TreeType,
    style?: CSSProperties,
}

// TODO : Delete Me!
const hello = <div>hello</div>;
const world = <div>world</div>;


const Tuple = ({
    tree,
    style={},
}: Props) => {
    const tupleStyle = {..._styles.tuple, ...style};
    const [draggableProps, setDraggableProps] = useState<DraggableProps | null>();

    const createDraggable: LeafEvent = (e, leaf, leafView) => {
        setDraggableProps({
            text: leaf.innerText,
            style: { background: 'lightgrey' },
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null)
        })
    }

    return (
        <div style={tupleStyle}>
            <SplitPane resizerPos='25%'>
                <Tree tree={tree} />
                <SplitPane dir='vertical' resizerPos='50%'>
                    <div style={{ height: '100%', width: '100%', background: 'orange' }}>
                        <TabBar 
                            tabs={[
                                { id: '1', label: 'hello', view: hello },
                                { id: '2', label: 'world', view: world },
                            ]}
                            styles={{
                                tabBar: { background: 'yellow' },
                                tab: { background: 'blue', color: 'white' },
                                tabClose: { background: 'green' },
                            }}
                            createDraggable={createDraggable}
                        />
                    </div>
                    <SplitPane dir='horizontal' resizerPos='50%'>
                        <div style={{ height: '100%', width: '100%', background: 'purple' }}>
                            <TabBar 
                                tabs={[
                                    { id: '1', label: 'hello', view: hello },
                                    { id: '2', label: 'world', view: world },
                                ]}
                                styles={{
                                    tabBar: { background: 'yellow' },
                                    tab: { background: 'blue', color: 'white' },
                                    tabClose: { background: 'green' },
                                }}
                                createDraggable={createDraggable}
                            />
                        </div>
                        <div style={{ height: '100%', width: '100%', background: 'hotpink' }}>
                            <TabBar 
                                tabs={[
                                    { id: '1', label: 'hello', view: hello },
                                    { id: '2', label: 'world', view: world },
                                ]}
                                styles={{
                                    tabBar: { background: 'yellow' },
                                    tab: { background: 'blue', color: 'white' },
                                    tabClose: { background: 'green' },
                                }}
                                createDraggable={createDraggable}
                            />
                        </div>
                    </SplitPane>
                </SplitPane>
            </SplitPane>
            { draggableProps && <Draggable {...draggableProps} /> }
        </div>
    );
}


const _styles = {
    tuple: { background: 'red', height: '900px' }
}


export default Tuple;