import View from '../components/View';
import { TupleContext } from '../components/Tuple';
import { PagesT } from '../types';
import { useEffect, useRef, useState } from 'react';
import Draggable, { Props as DraggableProps, DragEvent } from '../components/Draggable';

export default {
    title: 'Components/View',
    component: View,
    argTypes: { handleClick: { action: "handleClick" } }
};


const hello = <div>hello</div>;
const world = <div>world</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;


const pages: PagesT = {
    'a': { name: 'hello', component: hello },
    'b': { name: 'world', component: world },
    'c': { name: 'monkey', component: monkey },
    'd': { name: 'pox', component: pox },
};

// TODO : Styles need to be added to Context
const styles={
    tabBar: { background: 'yellow' },
    tab: { background: 'blue', color: 'white' },
    tabClose: { background: 'green' },
}


const Template = (args: any) => {
    const rootRef = useRef<HTMLElement>(document.createElement('div'));
    const [draggableProps, setDraggableProps] = useState<DraggableProps | null>();

    let context = {
        pages: pages,
        // styles: style,
        // events:
    };

    useEffect(() => {
        context = {
            pages: pages,
            // styles: style,
            // events:
        };
    });

    const createDraggable: DragEvent = (e, leaf, leafView) => {
        setDraggableProps({
            text: leaf.innerText,
            style: { background: 'lightgrey' },
            offset: { x: -15, y: -15 },
            isDragging: true,
            mouseUp: () => setDraggableProps(null),
        } as DraggableProps);
    };

    return (
        <TupleContext.Provider value={context}>
            <div id='test'>
                <div style={{ height: '500px', background: 'pink' }}>
                    <View {...args.top} disableDraggable createDraggable={createDraggable}/>
                </div>
                <div style={{ height: '500px', background: 'pink' }}>
                    <View {...args.bottom} disableDraggable createDraggable={createDraggable}/>
                </div>
                { draggableProps && <Draggable {...draggableProps} /> }
            </div>
        </TupleContext.Provider>
    );
};

export const Basic = Template.bind({});

Basic.args = {
    top: {
        id: 1,
        pageIds: ['a', 'b', 'c'],
        activePageId: 'b',
        styles,
    },
    bottom: {
        id: 2,
        pageIds: ['d'],
        activePageId: 'd',
        styles,
    }
};
