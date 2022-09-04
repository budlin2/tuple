import Tuple from '../components/Tuple';
import { TreeT, PagesT, SplitViewT, ViewT } from '../types';
import { TupleContext } from '../components/Tuple/TupleProvider';



export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
}

//--------
// PAGES
//--------

const hello = <div>hello</div>;
const world = <div>world</div>;
const carpe = <div>carpe</div>;
const diem = <div>diem</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;

const pages: PagesT = {
    'hello001': { name: 'hello', component: () => hello },
    'hello002': { name: 'HELLO', component: () => hello },
    'world001': { name: 'world', component: () => world },
    'world002': { name: 'worlD', component: () => world },
    'world003': { name: 'worLd', component: () => world },
    'world004': { name: 'worLD', component: () => world },
    'world005': { name: 'woRld', component: () => world },
    'world006': { name: 'woRlD', component: () => world },
    'carpe001': { name: 'carpe', component: () => carpe },
    'diem001': { name: 'diem', component: () => diem },
    'monkey001': { name: 'monkey', component: () => monkey },
    'pox001': { name: 'pox', component: () => pox },
};

//--------
// TREE
//--------

const tree: TreeT = [
    'hello001',
    'world001',
    { label: 'foo', branches: [
        'hello001',
        'world001',
        { label: 'bar', branches: [
            'hello002',
            'carpe001',
            'diem001',
            { label: 'noah', branches: [
                'monkey001',
                'pox001',
            ]}
        ]}
    ]},
    'world002',
    'world003',
    'world004',
    'world005',
    'world006',
];
//--------
// Views
//--------

/*
    Views for this structure:
         _________
        |    |____|
        |____|____|
        |    |    |
        |____|____|

*/
const topLeft: ViewT = {
    id: 0,
    pageIds: ['hello001', 'hello002'],
    activePageId: 'hello001',
};

const topRightUpper: ViewT = {
    id: 1,
    pageIds: ['world001', 'world002', 'world003', 'world004', 'world005', 'world006'],
    activePageId: 'world002',
};

const topRightLower: ViewT = {
    id: 2,
    pageIds: ['carpe001'],
    activePageId: 'carpe001',
};

const bottomLeft: ViewT = {
    id: 3,
    pageIds: ['diem001'],
    activePageId: 'diem001',
};

const bottomRight: ViewT = {
    id: 4,
    pageIds: ['monkey001', 'pox001'],
    activePageId: 'monkey001',
};

const topRight: SplitViewT = { head: topRightUpper, tail: topRightLower, direction: 'vertical' };
const top: SplitViewT = { head: topLeft, tail: topRight, direction: 'horizontal'};
const bottom: SplitViewT = { head: bottomLeft, tail: bottomRight, direction: 'horizontal' };
const views: SplitViewT = { head: top, tail: bottom, direction: 'vertical' };



const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {},
        classes: {},
        events: {},
    };

    return (
        <TupleContext.Provider value={context}>
            <Tuple {...args} />
        </TupleContext.Provider>
    );
}

export const Basic = Template.bind({});
Basic.args = {
    pages: pages,
    tree: tree,
    views: views,
    events: {},
    styles: {},
};