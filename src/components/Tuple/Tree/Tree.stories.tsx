import Tree from '.';
import { PagesT } from '../../../types';
import { TupleContext } from '../TupleProvider';

export default {
    title: 'Components/Tree',
    component: Tree,
    argTypes: { handleClick: { action: "handleClick" } },
}


const hello = <div>hello</div>;
const world = <div>world</div>;


const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
}


const tree = [
    'hello',
    'world',
    { label: 'hello_div', branches: [
        'hello',
        'hello',
        'hello',
        'hello',
        'world',
        { label: 'yolo_div', branches: [
            { label: 'yolo', branches: [
                'hello',
                'world',
                'world',
                { label: 'carpe', branches: [
                    { label: 'diem', branches: [
                        'hello',
                        'hello',
                    ]},
                ]},
                'hello',
                'world',
            ]},
        ]},
    ]},
    { label: 'world_div', branches: [
        'world',
        'world',
        'world',
        'world',
        'world',
    ]},
];


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
            <Tree {...args} />
        </TupleContext.Provider>
    );
}


export const Basic = Template.bind({});
Basic.args = {
    tree: tree,
};
