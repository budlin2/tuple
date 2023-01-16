import { Meta, Story } from "@storybook/react";

import Tuple, { TupleProps } from '.';

import classes from './tuple.stories.module.css';
import { TreeT } from "./Tree/TreeTypes";
import { SplitViewT, ViewT } from "./Viewport/ViewportTypes";
import { PagesT } from "./TupleTypes";
import Page from "../Page";


export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// PAGES
//----------------------------------------------------------------------------------------------------------------------

const lorem = <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus viverra accumsan in nisl nisi. Egestas dui id ornare arcu odio ut sem nulla pharetra. Duis tristique sollicitudin nibh sit amet. Adipiscing at in tellus integer feugiat. Ultrices eros in cursus turpis massa tincidunt dui ut. Massa tincidunt dui ut ornare. Enim neque volutpat ac tincidunt vitae semper quis. Rhoncus dolor purus non enim. Aenean et tortor at risus viverra adipiscing at in. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Felis bibendum ut tristique et egestas. At volutpat diam ut venenatis tellus. Scelerisque varius morbi enim nunc faucibus a pellentesque. Tristique senectus et netus et malesuada fames.

Et netus et malesuada fames ac turpis egestas integer eget. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac turpis egestas sed tempus urna et pharetra. Bibendum enim facilisis gravida neque convallis a cras. Tempus egestas sed sed risus pretium. Diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc sed. Eget arcu dictum varius duis at consectetur lorem. Morbi tristique senectus et netus et malesuada. Gravida cum sociis natoque penatibus. In hac habitasse platea dictumst quisque sagittis purus sit amet. Cursus sit amet dictum sit amet justo donec enim.

Blandit libero volutpat sed cras ornare arcu dui vivamus. Adipiscing bibendum est ultricies integer quis auctor elit sed. Est placerat in egestas erat imperdiet sed euismod nisi. Tincidunt praesent semper feugiat nibh sed pulvinar. Nunc sed id semper risus in hendrerit gravida. Non arcu risus quis varius quam quisque id diam. Morbi tincidunt ornare massa eget egestas purus. Eget nunc scelerisque viverra mauris in aliquam sem. At consectetur lorem donec massa sapien. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Sit amet tellus cras adipiscing enim eu turpis egestas. Pellentesque habitant morbi tristique senectus. Ac turpis egestas sed tempus urna et pharetra. Augue neque gravida in fermentum et sollicitudin ac.

Integer enim neque volutpat ac tincidunt vitae semper quis. Nisl purus in mollis nunc sed. Sit amet venenatis urna cursus. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Nunc mattis enim ut tellus elementum sagittis vitae et. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Faucibus scelerisque eleifend donec pretium. At auctor urna nunc id cursus metus aliquam eleifend. Id aliquet risus feugiat in ante metus dictum at. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Semper feugiat nibh sed pulvinar proin gravida. Mauris sit amet massa vitae tortor. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.

Posuere ac ut consequat semper viverra. Nullam vehicula ipsum a arcu cursus vitae congue. Curabitur gravida arcu ac tortor dignissim convallis. Amet dictum sit amet justo. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Elementum eu facilisis sed odio morbi quis. Lacus laoreet non curabitur gravida arcu ac tortor. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Maecenas pharetra convallis posuere morbi. Vitae nunc sed velit dignissim sodales ut eu sem. Sit amet purus gravida quis blandit turpis. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Diam sollicitudin tempor id eu nisl nunc mi. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Suspendisse ultrices gravida dictum fusce ut placerat orci. Praesent elementum facilisis leo vel fringilla.</div>;
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
    'hello':    { name: 'lorem'     , component: () => <Page>{lorem}</Page> },
    'world':    { name: 'HELLO'     , component: () => <Page>{world}</Page> },
    'ford':     { name: 'ford'      , component: () => <Page>{ford}</Page> },
    'jeep':     { name: 'jeep'      , component: () => <Page>{jeep}</Page> },
    'chrysler': { name: 'chrysler'  , component: () => <Page>{chrysler}</Page> },
    'ferrari':  { name: 'ferrari'   , component: () => <Page>{ferrari}</Page> },
    'gm':       { name: 'gm'        , component: () => <Page>{gm}</Page> },
    'honda':    { name: 'honda'     , component: () => <Page>{honda}</Page> },
    'carpe':    { name: 'carpe'     , component: () => <Page>{carpe}</Page> },
    'diem':     { name: 'diem'      , component: () => <Page>{diem}</Page> },
    'monkey':   { name: 'monkey'    , component: () => <Page>{monkey}</Page> },
    'pox':      { name: 'pox'       , component: () => <Page>{pox}</Page> },
    'apple':    { name: 'apple'     , component: () => <Page>{apple}</Page> },
    'banana':   { name: 'banana'    , component: () => <Page>{banana}</Page> },
    'carrot':   { name: 'carrot'    , component: () => <Page>{carrot}</Page> },
    'brocoli':  { name: 'brocoli'   , component: () => <Page>{brocoli}</Page> },
    'tomato':   { name: 'tomato'    , component: () => <Page>{tomato}</Page> },
    'orange':   { name: 'orange'    , component: () => <Page>{orange}</Page> },
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
const Template: Story<TupleProps> = (args: any) => {
    return (
        <div style={{
            height: 900,
            width: 1500,
            border: '1px solid lightgrey',
        }}>
            <Tuple {...args} />
        </div>
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
    tree,
    classes,
};


//----------------------------------------------------------------------------------------------------------------------
// Six Views - No Template
const _SixViewsTopRight: SplitViewT = { head: Cars, tail: Carpe, direction: 'vertical' };
const _SixViewsTop: SplitViewT = { head: HelloWorld, tail: _SixViewsTopRight, direction: 'horizontal' };
const _SixViewsBottomLeft: SplitViewT = { head: Apple, tail: Banana, direction: 'horizontal' };
const _SixViewsBottom: SplitViewT = { head: _SixViewsBottomLeft, tail: Diem, direction: 'horizontal' };
const __SixViews: SplitViewT = { head: _SixViewsTop, tail: _SixViewsBottom, direction: 'vertical' };

export const SixViewsNoStyles = Template.bind({});
SixViewsNoStyles.args = {
    pages,
    views: __SixViews,
    tree,
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Lannister
export const Lannister = Template.bind({});
Lannister.args = {
    pages,
    views: __SixViews,
    tree,
    template: 'lannister',
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Baratheon
export const Baratheon = Template.bind({});
Baratheon.args = {
    pages,
    views: __SixViews,
    tree,
    template: 'baratheon',
};
