import { any } from 'prop-types';
import SplitPane from '../components/SplitPane';

export default {
    title: 'Components/SplitPane',
    component: SplitPane,
}

const Template = (args: any) => <SplitPane {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    dir: 'horizontal',
    size: '50%',
    resizable: true,
};

