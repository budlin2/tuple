import { Meta, Story } from "@storybook/react";

import Tuple from '.';
import TupleProvider, { TupleProviderProps } from './TupleProvider';
import { PagesT, SplitViewT, ViewT } from '../../types';

import classes from './tuple.stories.module.css';
import { TreeT } from "./Tree/TreeTypes";


export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// PAGES
//----------------------------------------------------------------------------------------------------------------------

const hello = <div>hello</div>;
const world = <div>world</div>;
const ford = <div>ford</div>;
const jeep = <div>jeep</div>;
const chrysler = <div>chrysler</div>;
const ferrari = <div>ferrari</div>;
const gm = <div>gm</div>;
const honda = <div>honda</div>;
const carpe = <div>carpe</div>;
const diem = <div>diem</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;
const apple = <div>apple</div>;
const banana = <div>banana</div>;
const carrot = <div>carrot</div>;
const brocoli = <div>brocoli</div>;
const tomato = <div>tomato</div>;
const orange = <div>orange</div>;

const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'HELLO', component: () => world },
    'ford': { name: 'ford', component: () => ford },
    'jeep': { name: 'jeep', component: () => jeep },
    'chrysler': { name: 'chrysler', component: () => chrysler },
    'ferrari': { name: 'ferrari', component: () => ferrari },
    'gm': { name: 'gm', component: () => gm },
    'honda': { name: 'honda', component: () => honda },
    'carpe': { name: 'carpe', component: () => carpe },
    'diem': { name: 'diem', component: () => diem },
    'monkey': { name: 'monkey', component: () => monkey },
    'pox': { name: 'pox', component: () => pox },
    'apple': { name: 'apple', component: () => apple },
    'banana': { name: 'banana', component: () => banana },
    'carrot': { name: 'carrot', component: () => carrot },
    'brocoli': { name: 'brocoli', component: () => brocoli },
    'tomato': { name: 'tomato', component: () => tomato },
    'orange': { name: 'orange', component: () => orange },
};

//----------------------------------------------------------------------------------------------------------------------
// TREE
//----------------------------------------------------------------------------------------------------------------------
const tree: TreeT = [
    'hello',
    'world',
    { id: 1, label: 'yolo', branches: [
        'carpe',
        'diem',
        { id: 2, label: 'hello again', branches: [
            'hello',
            'world',
            { id: 3, label: 'cars', branches: [
                'ford',
                'jeep',
                'chrysler',
                'ferrari',
                'gm',
                'honda',
            ]}
        ]}
    ]},
    'monkey',
    'pox',
];


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<TupleProviderProps> = (args: any) => {
    return (
        <TupleProvider {...args}>
            <Tuple tree={tree} />
        </TupleProvider>
    );
}


//----------------------------------------------------------------------------------------------------------------------
// Views
//----------------------------------------------------------------------------------------------------------------------
const HelloWorld: ViewT = {
    pageIds: ['hello', 'world'],
    activePageId: 'hello',
};

const Cars: ViewT = {
    pageIds: ['ford', 'jeep', 'chrysler', 'ferrari', 'gm', 'honda'],
    activePageId: 'jeep',
};

const Carpe: ViewT = {
    pageIds: ['carpe'],
    activePageId: 'carpe',
};

const Diem: ViewT = {
    pageIds: ['diem'],
    activePageId: 'diem',
};

const MonkeyPox: ViewT = {
    pageIds: ['monkey', 'pox'],
    activePageId: 'monkey',
};

const Apple: ViewT = {
    pageIds: ['apple'],
    activePageId: 'apple',
};

const Banana: ViewT = {
    pageIds: ['banana'],
    activePageId: 'banana',
};

const Carrot: ViewT = {
    pageIds: ['carrot'],
    activePageId: 'carrot',
};

const Brocoli: ViewT = {
    pageIds: ['brocoli'],
    activePageId: 'brocoli',
};

const Tomato: ViewT = {
    pageIds: ['tomato'],
    activePageId: 'tomato',
};

const Orange: ViewT = {
    pageIds: ['orange'],
    activePageId: 'orange',
};

//----------------------------------------------------------------------------------------------------------------------
// Single View
export const SingleView = Template.bind({});
SingleView.args = {
    pages,
    views: MonkeyPox,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// Horizontal Split View
const HorizontalSplitViews: SplitViewT = { head: HelloWorld, tail: Carpe, direction: 'horizontal' };

export const HorizontalSplitView = Template.bind({});
HorizontalSplitView.args = {
    pages,
    views: HorizontalSplitViews,
    classes,
};

//----------------------------------------------------------------------------------------------------------------------
// Vertical Split View
const VerticalSplitViews: SplitViewT = { head: HelloWorld, tail: Carpe, direction: 'vertical' };

export const VerticalSplitView = Template.bind({});
VerticalSplitView.args = {
    pages,
    views: VerticalSplitViews,
    classes,
};

//----------------------------------------------------------------------------------------------------------------------
// ThreeViews
const ThreeViewsRight: SplitViewT = { head: Diem, tail: MonkeyPox, direction: 'vertical' };
const _ThreeViews: SplitViewT = { head: Cars, tail: ThreeViewsRight, direction: 'horizontal' };

export const ThreeViews = Template.bind({});
ThreeViews.args = {
    pages,
    views: _ThreeViews,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// FourViews
const FourViewsLeft: SplitViewT = { head: Carpe, tail: MonkeyPox, direction: 'vertical' };
const FourViewsRight: SplitViewT = { head: HelloWorld, tail: Diem, direction: 'vertical' };
const _FourViews: SplitViewT = { head: FourViewsLeft, tail: FourViewsRight, direction: 'horizontal' };

export const FourViews = Template.bind({});
FourViews.args = {
    pages,
    views: _FourViews,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// Five Views
const FiveViewsTopRight: SplitViewT = { head: Cars, tail: Carpe, direction: 'vertical' };
const FiveViewsTop: SplitViewT = { head: HelloWorld, tail: FiveViewsTopRight, direction: 'horizontal' };
const FiveViewsBottom: SplitViewT = { head: Diem, tail: MonkeyPox, direction: 'horizontal' };
const _FiveViews: SplitViewT = { head: FiveViewsTop, tail: FiveViewsBottom, direction: 'vertical' };

export const FiveViews = Template.bind({});
FiveViews.args = {
    pages,
    views: _FiveViews,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// Six Views
const SixViewsTopRight: SplitViewT = { head: Cars, tail: Carpe, direction: 'vertical' };
const SixViewsTop: SplitViewT = { head: HelloWorld, tail: SixViewsTopRight, direction: 'horizontal' };
const SixViewsBottomLeft: SplitViewT = { head: Apple, tail: Banana, direction: 'horizontal' };
const SixViewsBottom: SplitViewT = { head: SixViewsBottomLeft, tail: Diem, direction: 'horizontal' };
const _SixViews: SplitViewT = { head: SixViewsTop, tail: SixViewsBottom, direction: 'vertical' };

export const SixViews = Template.bind({});
SixViews.args = {
    pages,
    views: _SixViews,
    classes,
};
