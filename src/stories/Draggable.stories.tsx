import Draggable from '../components/Draggable';

export default {
    title: 'Components/Draggable',
    component: Draggable,
    argTypes: { handleClick: { action: "handleClick" } },
}

const Template = (args: any) => (
    <div style={{ height: '600px', width: '800px', background: 'green', padding: '20px' }}>
        <div style={{ margin: '50px', height: '500px', width: '700px', background: 'yellow' }}>
            <Draggable {...args} />
        </div>
    </div>
);

export const Basic = Template.bind({});
Basic.args = {
    text: 'Foo',
    style: { background: 'red' },
    position: {  }
};
