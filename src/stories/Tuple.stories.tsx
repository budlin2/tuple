import Tuple from '../components/Tuple';
import { TreeType } from '../components/Tree';


export default {
    title: 'Components/Tuple',
    component: Tuple,
    argTypes: { handleClick: { action: "handleClick" } },
}


const hello = <div>hello</div>;
const world = <div>world</div>;


const tree: TreeType = {
    hello: hello,
    world: world,
    hello_div: {
        '1': hello,
        '2': hello,
        '3': hello,
        '4': hello,
        '5': world,
        yolo_div: {
            yolo: {
                '1': hello,
                '2': world,
                '3': world,
                carpe: {
                    diem: {
                        'a': hello,
                        'b': hello
                    }
                },
                diem: hello,
                diem2: world
            }
        }
    },
    world_div: {
        '1': hello,
        '2': world,
        '3': world,
        '4': world,
        '5': world,
    }
};


const Template = (args: any) => <Tuple {...args} />


export const Basic = Template.bind({});
Basic.args = {
    tree: tree,
};