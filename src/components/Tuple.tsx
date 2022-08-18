import { CSSProperties, ReactNode, useState, createContext } from 'react';

import Tree from './Tree/Tree';
import SplitPane from './SplitPane';
import Draggable, { Props as DraggableProps } from './Draggable';
import TabBar from './Viewport/TabBar';
import { SplitViewT, PagesT, TreeT, DragEvent } from '../types';


interface TupleContextT {
    pages: PagesT,
}

// TODO : This should move elsewhere
export const TupleContext = createContext({
    pages: {},
} as TupleContextT);


interface Props {
    pages: PagesT,
    tree: TreeT,
    views: SplitViewT,
    style?: CSSProperties,
}


const Tuple = ({
    pages,
    tree,
    views,
    style={},
}: Props) => {
    const tupleStyle = {..._styles.tuple, ...style};
    const [draggableProps, setDraggableProps] = useState<DraggableProps | null>();

    const createDraggable: DragEvent = (e, leaf, leafView) => {
        setDraggableProps({
            text: leaf.innerText,
            style: { background: 'lightgrey' },
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null)
        });
    };

    const context = {
        pages: pages,
        // styles: style,
        // events:
    }

    return (
        <TupleContext.Provider value={context}>
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
        </TupleContext.Provider>
    );
}


const _styles = {
    tuple: { background: 'red', height: '900px' }
}


export default Tuple;