import { Meta, Story } from "@storybook/react";

import Tuple, { TupleProps } from '.';

import { TreeT } from "./Tree/TreeTypes";
import { SplitViewT, ViewT } from "./Viewport/ViewportTypes";
import { PagesT } from "./TupleTypes";
import Page from "../Page";

import classes from './tuple.stories.module.css';
import LannisterCss from './templates/lannister.module.css';
import BaratheonCss from './templates/baratheon.module.css';
import { useTree } from "./Tree/useTree";
import Tree from "./Tree/Tree";

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
    'lorem':    { id: 10, name: 'lorem'     , component: () => <Page>{lorem}</Page> },
    'world':    { id: 11, name: 'world'     , component: () => <Page>{world}</Page> },
    'ford':     { id: 12, name: 'ford'      , component: () => <Page>{ford}</Page> },
    'jeep':     { id: 13, name: 'jeep'      , component: () => <Page>{jeep}</Page> },
    'chrysler': { id: 14, name: 'chrysler'  , component: () => <Page>{chrysler}</Page> },
    'ferrari':  { id: 15, name: 'ferrari'   , component: () => <Page>{ferrari}</Page> },
    'gm':       { id: 16, name: 'gm'        , component: () => <Page>{gm}</Page> },
    'honda':    { id: 17, name: 'honda'     , component: () => <Page>{honda}</Page> },
    'carpe':    { id: 18, name: 'carpe'     , component: () => <Page>{carpe}</Page> },
    'diem':     { id: 19, name: 'diem'      , component: () => <Page>{diem}</Page> },
    'monkey':   { id: 20, name: 'monkey'    , component: () => <Page>{monkey}</Page> },
    'pox':      { id: 21, name: 'pox'       , component: () => <Page>{pox}</Page> },
    'apple':    { id: 22, name: 'apple'     , component: () => <Page>{apple}</Page> },
    'banana':   { id: 23, name: 'banana'    , component: () => <Page>{banana}</Page> },
    'carrot':   { id: 24, name: 'carrot'    , component: () => <Page>{carrot}</Page> },
    'brocoli':  { id: 25, name: 'brocoli'   , component: () => <Page>{brocoli}</Page> },
    'tomato':   { id: 26, name: 'tomato'    , component: () => <Page>{tomato}</Page> },
    'orange':   { id: 27, name: 'orange'    , component: () => <Page>{orange}</Page> },
};

//----------------------------------------------------------------------------------------------------------------------
// TREE
//----------------------------------------------------------------------------------------------------------------------
const tree: TreeT = [
    { id: 10, pageId: 'lorem' },
    { id: 11, pageId: 'world' },
    { id: 1, label: 'yolo', branches: [
        { id: 12, pageId: 'carpe' },
        { id: 13, pageId: 'diem' },
        { id: 2, label: 'hello again', branches: [
            { id: 14, pageId: 'world' },
            { id: 3, label: 'cars', branches: [
                { id: 15, pageId: 'ford' },
                { id: 16, pageId: 'jeep' },
                { id: 17, pageId: 'chrysler' },
                { id: 18, pageId: 'ferrari' } ,
                { id: 19, pageId: 'gm' },
                { id: 20, pageId: 'honda' },
                { id: 4, label: 'cars', branches: [
                    { id: 21, pageId: 'ford' },
                    { id: 22, pageId: 'jeep' },
                    { id: 23, pageId: 'chrysler' },
                    { id: 24, pageId: 'ferrari' },
                    { id: 25, pageId: 'gm' },
                    { id: 26, pageId: 'honda' },
                    { id: 5, label: 'cars', branches: [
                        { id: 27, pageId: 'ford' },
                        { id: 28, pageId: 'jeep' },
                        { id: 29, pageId: 'chrysler' },
                        { id: 30, pageId: 'ferrari' },
                        { id: 31, pageId: 'gm' },
                        { id: 32, pageId: 'honda' },
                        { id: 5, label: 'cars', branches: [
                            { id: 33, pageId: 'ford' },
                            { id: 34, pageId: 'jeep' },
                            { id: 35, pageId: 'chrysler' },
                            { id: 36, pageId: 'ferrari' },
                            { id: 37, pageId: 'gm' },
                            { id: 38, pageId: 'honda' },
                        ]},
                    ]}
                ]}
            ]}
        ]}
    ]},
    { id: 39, pageId: 'monkey' },
    { id: 40, pageId: 'pox' },
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
// No Views
export const NoViews = Template.bind({});
NoViews.args = {
    pages,
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
    enableDynamicTree: true,
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Lannister
export const Lannister = Template.bind({});
Lannister.args = {
    pages,
    views: __SixViews,
    tree,
    classes: LannisterCss,
};

//----------------------------------------------------------------------------------------------------------------------
// Six Views - Baratheon
export const Baratheon = Template.bind({});
Baratheon.args = {
    pages,
    views: __SixViews,
    tree,
    classes: BaratheonCss,
};


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const DynamicTreeTemplate: Story<TupleProps> = (args: any) => {
    const {
        tree: _tree,
        pages: _pages,
        renameBranch,
        renameLeaf,
    } = useTree(tree, pages);

    return (
        <div style={{
            height: 600,
            width: 800,
            border: '1px solid lightgrey',
        }}>
            <Tuple {...args} pages={_pages}>
                <Tree tree={_tree}
                    onBranchRename={ renameBranch }
                    onLeafRename={ renameLeaf }
                />
            </Tuple>
        </div>
    );
}
export const dynamicTree = DynamicTreeTemplate.bind({});
dynamicTree.args = {
    views: __SixViews,
};