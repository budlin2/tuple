import { ReactNode, CSSProperties, isValidElement } from 'react';

import Leaf from './Leaf'
import Branch from './Branch';


export type TreeType = { [key: string]: ReactNode | TreeType };


interface StyleProps {
    tree?: CSSProperties,
    branch?: CSSProperties,
    leaf?: CSSProperties,
}


interface Props {
    tree: TreeType,
    styles?: StyleProps,
    // maxDepth: number,
    // theme?,
}


const isReactComponent = (comp: any) => !!comp?.prototype?.isReactComponent || isValidElement(comp);


const Tree = ({
    tree={},
    styles={},
}: Props) => {
    const treeStyle = { ..._styles.tree, ...styles.tree}

    const buildTree = (tree: TreeType): ReactNode => {
        return Object.entries(tree).map( ([k,v]) => {
            return isReactComponent(v)
                ? <Leaf text={k}> {v as ReactNode} </Leaf>
                : <Branch text={k}> {buildTree(v as TreeType)} </Branch>;
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
