import { ReactNode, FC, CSSProperties, isValidElement } from 'react'

import Leaf from './Leaf'
import Branch from './Branch';


interface StyleProps {
    tree?: CSSProperties,
    branch?: CSSProperties,
    leaf?: CSSProperties,
}


interface Props {
    tree: object,
    styles?: StyleProps,
}


const Tree: FC<Props> = ({
    tree={},
    styles={},
}) => {
    const treeStyle = { ..._styles.tree, ...styles.tree}
    
    const isReactComponent = (comp: any) => !!comp?.prototype?.isReactComponent || isValidElement(comp);

    const buildTree = (tree: object): ReactNode => {
        return Object.entries(tree).map( ([key, value]) => {
            if (isReactComponent(value)) {
                return (
                    <Leaf text={key}>
                        {value}
                    </Leaf>
                );
            } else {
                return (
                    <Branch text={key}>
                        { buildTree(value) }
                    </Branch>
                );
            }
        })
    };

    return (
        <div style={treeStyle}>
            { buildTree(tree) }
        </div>
    );
}


const _styles = {
    tree: {
    }
};


export default Tree;
