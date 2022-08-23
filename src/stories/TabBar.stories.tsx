import TabBar from '../components/Viewport/TabBar';
import { TupleContext } from '../components/Tuple';

export default {
    title: 'Components/TabBar',
    component: TabBar,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => {

    const context = {
        styles: {
            tabBar: { background: 'yellow' },
            tab: { background: 'red' },
            tabClose: { background: 'green' },
        }
    };
    return (
        <TupleContext.Provider value={context}>
            <div style={{ width: '600px' }}>
                <TabBar {...args} />
            </div>
        </TupleContext.Provider>
    );
};

const hello = <div>hello</div>;
const world = <div>world</div>;

export const Basic = Template.bind({});
Basic.args = {
    tabs: [
        { id: '1', label: 'hello', view: hello },
        { id: '2', label: 'world', view: world },
    ],
};
