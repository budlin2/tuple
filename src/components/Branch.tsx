import { ReactNode, FC, CSSProperties, MouseEvent, useState } from 'react'


export interface StyleProps {
    base?: CSSProperties,
    branches?: CSSProperties,
}


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
    styles?: StyleProps,
}


const Branch: FC<Props> = ({
    text,
    children,
    open=false,
    styles={},
}) => {
    const [expanded, setExpanded] = useState(open);
    const baseStyle = {..._styles.base, ...styles.base }
    const branchesStyle = {..._styles.branches, ...styles.branches }

    const onClick = (e: MouseEvent) => {
        setExpanded(cur => !cur);
    }
    
    return (
        <div>
            <div style={baseStyle} onClick={onClick}>
                { text }
            </div>
            { expanded && <div style={branchesStyle}>
                { children }
            </div> }
        </div>
    );
}


const _styles = {
    base: {
        borderBottom: '1px solid black',
    },
    branches: {
        marginLeft: '0.3rem',
        borderLeft: '1px dashed black',
        paddingLeft: '0.3rem',
    },
};


export default Branch;
