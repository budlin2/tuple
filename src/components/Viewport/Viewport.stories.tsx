import Viewport from '.';
import { PagesT, SplitViewT, ViewT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';

import classes from './view.stories.module.css';

export default {
    title: 'Components/Viewport',
    component: Viewport,
    argTypes: { handleClick: { action: "handleClick" } },
}

//--------
// PAGES
//--------
interface pageProps { text: string }
const page = ({text}: pageProps): JSX.Element => {
    return ( 
        <div>{text}</div>
    );
};

const pages: PagesT = {
    'hello001': { name: 'hello', component: page, props: { text: 'hello' } },
    'hello002': { name: 'HELLO', component: page, props: { text: 'HELLO' } },
    'world001': { name: 'world', component: page, props: { text: 'world' } },
    'world002': { name: 'worlD', component: page, props: { text: 'worlD' } },
    'world003': { name: 'worLd', component: page, props: { text: 'worLd' } },
    'world004': { name: 'worLD', component: page, props: { text: 'worLD' } },
    'world005': { name: 'woRld', component: page, props: { text: 'woRld' } },
    'world006': { name: 'worlddddddd', component: page, props: { text: 'worlddddddd' } },
    'world007': { name: 'worlddddddddddddddddd', component: page, props: { text: 'worlddddddddddddddddd' } },
    'carpe001': { name: 'carpe', component: page, props: { text: 'carpe' } },
    'diem001': { name: 'diem', component: page, props: { text: 'diem' } },
    'monkey001': { name: 'monkey', component: page, props: { text: 'monkey' } },
    'pox001': { name: 'pox', component: page, props: { text: 'pox' } },
};

//--------
// Views
//--------

/******************************
    Views for this structure:
         _________
        |    |____|
        |____|____|
        |    |    |
        |____|____|

*******************************/
const topLeft: ViewT = {
    id: 0,
    pageIds: ['hello001', 'hello002'],
    activePageId: 'hello001',
};

const topRightUpper: ViewT = {
    id: 1,
    pageIds: ['world001', 'world002', 'world003', 'world004', 'world005', 'world006', 'world007'],
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
        classes,
        events: {},
    };
    
    return (
        <TupleContext.Provider value={context}>
            <div style={{ height: '700px' }}>
                <Viewport {...args} />
            </div>
        </TupleContext.Provider>
    );
}

export const Basic = Template.bind({});
Basic.args = {
    views: views,
    defaultView: <>No Views. SAD!</>
};
