import {
    ReactNode,
    useState,
    useContext,
    CSSProperties
} from 'react'
import { TupleContext } from '..';
import { TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import _global_classes from '../../styles.module.css';


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
    className?: string,
    style?: CSSProperties,
}


const Branch = ({
    text,
    children,
    open=false,
    className,
    style={},
}: Props) => {
    const onClick = () => setExpanded(cur => !cur);

    const [expanded, setExpanded] = useState(open);
    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const branchClassName = `
        ${_global_classes.noHighlight}
        ${className || ''}`;

    const branchesClassName = `
        ${_classes?.branches || ''}
        ${template?.branches || ''}
        ${classes?.branches  || ''}`;
    
    return (
        <div>
            <div
                className={branchClassName}
                style={style}
                onClick={onClick}>
                { text }
            </div>
            { expanded && <div
                className={branchesClassName}
                style={styles.branches}>
                { children }
            </div> }
        </div>
    );
}


export default Branch;
