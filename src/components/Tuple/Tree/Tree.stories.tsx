import { Meta, Story } from "@storybook/react";

import Tree from './Tree';
import TupleProvider, { TupleProviderProps } from '../TupleProvider';
import { PagesT } from "../TupleTypes";


export default {
    title: 'Components/Tree',
    component: Tree,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


const hello = <div>hello</div>;
const world = <div>world</div>;


const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
}


// TODO: generate IDs for branches for user
const tree = [
    'hello',
    'world',
    { id: 1, label: 'hello_div', branches: [
        'hello',
        'hello',
        'hello',
        'hello',
        'world',
        { id: 2, label: 'yolo_div', branches: [
            { id: 3, label: 'yolo', branches: [
                'hello',
                'world',
                'world',
                { id: 4, label: 'carpe', branches: [
                    { id: 5, label: 'diem', branches: [
                        'hello',
                        'hello',
                    ]},
                ]},
                'hello',
                'world',
            ]},
        ]},
    ]},
    { id: 6, label: 'world_div', branches: [
        'world',
        'world',
        'world',
        'world',
        'world',
    ]},
];


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<TupleProviderProps> = (args: any) => {
    return (
        <TupleProvider {...args}>
            <Tree tree={tree} />
        </TupleProvider>
    );
}


export const Basic = Template.bind({});
Basic.args = {
    pages,
    styles: {},
    classes: {},
    events: {},
};
