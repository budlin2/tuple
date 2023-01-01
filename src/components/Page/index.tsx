import { memo, PropsWithChildren } from 'react';

const Page = (props: PropsWithChildren) => {
    return (
        <div {...props}>
            {props.children}
        </div>
    );
}


export default memo(Page);