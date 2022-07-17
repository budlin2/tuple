import { CSSProperties } from 'react';

import Tree, { TreeType } from './Tree';
import SplitPane from './SplitPane';
import Draggable from './Draggable';
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
    const tupleStyle = {..._styles.tuple, ...style}

    return (
        <div style={tupleStyle}>
            <SplitPane resizerPos='25%'>
                <Tree tree={tree} />
                <SplitPane dir='vertical' resizerPos='50%'>
                    <div style={{ height: '100%', width: '100%', background: 'orange' }}>
                        <TabBar 
                            tabs={[
                                { label: 'hello', view: hello },
                                { label: 'world', view: world },
                            ]}
                            styles={{
                                tabBar: { background: 'yellow' },
                                tab: { background: 'blue', color: 'white' },
                                tabClose: { background: 'green' },
                            }}
                        />
                    </div>
                    <SplitPane dir='horizontal' resizerPos='50%'>
                        <div style={{ height: '100%', width: '100%', background: 'purple' }}>
                            <TabBar 
                                tabs={[
                                    { label: 'hello', view: hello },
                                    { label: 'world', view: world },
                                ]}
                                styles={{
                                    tabBar: { background: 'yellow' },
                                    tab: { background: 'blue', color: 'white' },
                                    tabClose: { background: 'green' },
                                }}
                            />
                        </div>
                        <div style={{ height: '100%', width: '100%', background: 'hotpink' }}>
                            <TabBar 
                                tabs={[
                                    { label: 'hello', view: hello },
                                    { label: 'world', view: world },
                                ]}
                                styles={{
                                    tabBar: { background: 'yellow' },
                                    tab: { background: 'blue', color: 'white' },
                                    tabClose: { background: 'green' },
                                }}
                            />
                        </div>
                    </SplitPane>
                </SplitPane>
            </SplitPane>
            <Draggable
                text='Foo'
                style={{ background: 'lightgrey' }}
                position={{ x: 20, y: 30 }}
            />
        </div>
    );
}


const _styles = {
    tuple: { background: 'red', height: '900px' }
}


export default Tuple;