import { Meta, Story } from "@storybook/react";

import View from './View';
import TupleProvider, { TupleProviderProps } from '../../TupleProvider';

import classes from '../viewport.stories.module.css';
import { PagesT } from "../../TupleTypes";


export default {
    title: 'Components/View',
    component: View,
    argTypes: { handleClick: { action: "handleClick" } }
} as Meta;


const hello = <div>hello</div>;
const world = <div>world</div>;
const monkey = <div>monkey</div>;
const pox = <div>pox</div>;


const pages: PagesT = {
    'a': { name: 'hello', component: () => hello },
    'b': { name: 'world', component: () => world },
    'c': { name: 'monkey', component: () => monkey },
    'd': { name: 'pox', component: () => pox },
};


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<TupleProviderProps> = (args: any) => {

    return (
        <TupleProvider {...args}>
            <div>
                <div style={{ height: '500px' }}>
                    <View
                        pageIds={['a', 'b', 'c']}
                        activePageId={'b'}
                        dispatch={ ()=>{} }/>
                </div>
                <div style={{ height: '500px' }}>
                    <View
                        pageIds={['a', 'b', 'c']}
                        activePageId={'b'}
                        dispatch={ ()=>{} }/>
                </div>
            </div>
        </TupleProvider>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    pages,
    styles: {},
    classes,
    events: {}
};
