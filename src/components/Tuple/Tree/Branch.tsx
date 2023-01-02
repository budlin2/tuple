import {
    ReactNode,
    useState,
    CSSProperties,
} from 'react';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
    branchClassName?: string,
    branchesClassName?: string,
    branchStyle?: CSSProperties,
    branchesStyle?: CSSProperties,
}


const Branch = ({
    text,
    children,
    open=false,
    branchClassName,
    branchesClassName,
    branchStyle={},
    branchesStyle={},
}: Props) => {
    const onClick = () => setExpanded(cur => !cur);

    const [expanded, setExpanded] = useState(open);

    const _branchClassName = `
        ${_global_classes.noHighlight}
        ${branchClassName || ''}`;
    
    return (
        <div>
            <div
                className={_branchClassName}
                style={branchStyle}
                onClick={onClick}>
                { text }
            </div>
            { expanded && (
                <div className={branchesClassName} style={branchesStyle}>
                    { children }
                </div>
            )}
        </div>
    );
}


export default Branch;
