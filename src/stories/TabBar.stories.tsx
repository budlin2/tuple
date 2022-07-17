import TabBar from '../components/TabBar';

export default {
    title: 'Components/TabBar',
    component: TabBar,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => (
    <div style={{ width: '600px' }}>
        <TabBar {...args} />
    </div>
);

const hello = <div>hello</div>;
const world = <div>world</div>;

export const Basic = Template.bind({});
Basic.args = {
    tabs: [
        { label: 'hello', view: hello },
        { label: 'world', view: world },
    ],
    styles: {
        tabBar: { background: 'yellow' },
        tab: { background: 'red' },
        tabClose: { background: 'green' },
    }
};
