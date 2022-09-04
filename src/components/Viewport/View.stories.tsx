import View from './View';
import { TupleContext } from '../Tuple/TupleProvider';
import { PagesT } from '../../types';

import classes from './view.stories.module.css';


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
    'a': { name: 'hello', component: () => hello },
    'b': { name: 'world', component: () => world },
    'c': { name: 'monkey', component: () => monkey },
    'd': { name: 'pox', component: () => pox },
};


const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {},
        classes,
        events: {}
    };

    return (
        <TupleContext.Provider value={context}>
            <div style={{ height: '500px' }}>
                <View {...args.top} />
            </div>
            <div style={{ height: '500px' }}>
                <View {...args.bottom} />
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
    },
    bottom: {
        id: 2,
        pageIds: ['d'],
        activePageId: 'd',
    }
};
