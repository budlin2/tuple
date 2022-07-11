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
    // maxDepth: number,
    // theme?,
}


const isReactComponent = (comp: any) => !!comp?.prototype?.isReactComponent || isValidElement(comp);


const Tree = ({
    tree={},
    styles={},
}: Props) => {
    const treeStyle = { ..._styles.tree, ...styles.tree}

    const buildTree = (tree: object): ReactNode => {
        return Object.entries(tree).map( ([k,v]) => {
            return isReactComponent(v)
                ? <Leaf text={k}> {v} </Leaf>
                : <Branch text={k}> {buildTree(v)} </Branch>;
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
