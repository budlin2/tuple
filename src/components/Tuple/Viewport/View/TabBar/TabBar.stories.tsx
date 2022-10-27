import { Meta, Story } from "@storybook/react";

import TabBar from './TabBar';
import TupleProvider, { TupleProviderProps } from '../../../TupleProvider';
import { PagesT } from "../../../TupleTypes";


export default {
    title: 'Components/TabBar',
    component: TabBar,
    argTypes: { handleClick: { action: "handleClick" } },
} as Meta;


const hello = <div>hello</div>;
const world = <div>world</div>;

const pages: PagesT = {
    'hello': { name: 'hello', component: () => hello },
    'world': { name: 'world', component: () => world },
};


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<TupleProviderProps> = (args: any) => {
    const pids = ['hello', 'world'];
    
    return (
        <TupleProvider {...args}>
            <div style={{ width: '600px' }}>
                <TabBar pids={pids} />
            </div>
        </TupleProvider>
    );
};


export const Basic = Template.bind({});
Basic.args = {
    pages,
    styles: {
        tabBar: { background: 'yellow' },
        tab: { background: 'red' },
        tabClose: { background: 'green' },
    },
    classes: {},
    events: {},
};
