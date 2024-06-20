import { Children, ReactNode, useEffect } from 'react';

import _classes from './mobileView.module.css';

export interface Props {
    children: ReactNode,
}

const MobileView = ({
    children,
}: Props) => {
    const childrenArr = Children.toArray(children);

    useEffect(() => {
        if (childrenArr.length !== 2) {
            throw new Error('MobileView needs exactly two children');
        }
    }, [children]);

    return (
        <div className="container">
            <div className="view">{ childrenArr && childrenArr[0] }</div>
            <div className="view">{ childrenArr && childrenArr[1] }</div>
        </div>
    );
}


export default MobileView;