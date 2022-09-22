import TabBar from '.';
import { TupleContext } from '../../../../Tuple/TupleProvider';
import { PagesT } from '../../../../../types';

export default {
    title: 'Components/TabBar',
    component: TabBar,
    argTypes: { handleClick: { action: "handleClick" } },
}


const hello = <div>hello</div>;
const world = <div>world</div>;

const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
};

const Template = (args: any) => {
    const context = {
        pages,
        views: null,
        styles: {
            tabBar: { background: 'yellow' },
            tab: { background: 'red' },
            tabClose: { background: 'green' },
        },
        classes: {},
        events: {},
    };
    return (
        <TupleContext.Provider value={context}>
            <div style={{ width: '600px' }}>
                <TabBar {...args} />
            </div>
        </TupleContext.Provider>
    );
};


export const Basic = Template.bind({});
Basic.args = {
    tabs: [
        { id: '1', pageId: 'hello' },
        { id: '2', pageId: 'world' },
    ],
};
