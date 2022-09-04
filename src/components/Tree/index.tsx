import {
    ReactNode,
    CSSProperties,
    useContext,
} from 'react';

import Leaf from './Leaf'
import Branch from './Branch';
import { TreeT, isID, PagesT, ID, PageT, BranchT } from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';


interface StyleProps {
    tree?: CSSProperties,
    branch?: CSSProperties,
    leaf?: CSSProperties,
}


interface Props {
    tree: TreeT,
    styles?: StyleProps,
    // maxDepth: number,
    // theme?,
}


const Tree = ({
    tree=[],
    styles={},
}: Props) => {
    const treeStyle = { ..._styles.tree, ...styles.tree};

    const {pages}: {
        pages: PagesT,
    } = useContext(TupleContext);

    const buildBranch = (bid: BranchT | ID): ReactNode => {
        if (isID(bid)) {
            const id: ID = bid as ID;
            const page: PageT = pages[id];

            console.log(page);

            if (!page) throw `Page ID not found within "pages": [${page}]`;
            
            return <Leaf text={page.name} pageId={id} />;
        }

        const branch: BranchT = bid as BranchT;
        return (
            <Branch text={branch.label}>
                { branch.branches.map( b => buildBranch(b)) }
            </Branch>
        );
    }
    
    const buildTree = (_tree: TreeT): ReactNode => _tree.map( bid => buildBranch(bid));


    return (
        <div style={treeStyle}>
            {buildTree(tree)}
        </div>
    );
}


const _styles = {
    tree: {
    }
};


export default Tree;
