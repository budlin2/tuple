import {
    ReactNode,
    useContext,
} from 'react';

import Leaf from './Leaf'
import Branch from './Branch';
import {
    TreeT,
    isID,
    PagesT,
    ID,
    PageT,
    BranchT,
    TupleClassesT,
    TupleStylesT
} from '../../types';
import { TupleContext } from '../Tuple/TupleProvider';



interface Props {
    tree: TreeT,
    // maxDepth: number,
}


const Tree = ({ tree=[] }: Props) => {
    const {pages, classes, styles }: {
        pages: PagesT,
        classes: TupleClassesT,
        styles: TupleStylesT,
    } = useContext(TupleContext);

    const buildBranch = (bid: BranchT | ID): ReactNode => {
        if (isID(bid)) {
            const id: ID = bid as ID;
            const page: PageT = pages[id];

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
        <div className={classes.tree} style={styles.tree}>
            {buildTree(tree)}
        </div>
    );
}


export default Tree;
