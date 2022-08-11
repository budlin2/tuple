import View from '../components/View';
import { TupleContext } from '../components/Tuple';
import { PagesT } from '../types';

export default {
    title: 'Components/View',
    component: View,
    argTypes: { handleClick: { action: "handleClick" } }
};


const hello = <div>hello</div>;
const world = <div>world</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;


const pages: PagesT = {
    'a': { name: 'hello', component: hello },
    'b': { name: 'world', component: world },
    'c': { name: 'monkey', component: monkey },
    'd': { name: 'pox', component: pox },
};


const context = {
    pages: pages,
    // styles: style,
    // events:
};

// TODO : SStyles need to be added to Context
const styles={
    tabBar: { background: 'yellow' },
    tab: { background: 'blue', color: 'white' },
    tabClose: { background: 'green' },
}
    

const Template = (args: any) => (
    <TupleContext.Provider value={context}>
        <div style={{ height: '500px', background: 'pink' }}>
            <View {...args} />
        </div>
    </TupleContext.Provider>
);

export const Basic = Template.bind({});
Basic.args = {
    id: 1,
    pageIds: ['a', 'b', 'c', 'd'],
    activePageId: 'b',
    styles,
};
