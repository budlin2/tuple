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
} from '../../../types';
import { TupleContext } from '../TupleProvider';

import _classes from './tree.module.css';


interface BranchesProps {
    branchOrLeafId: BranchT | ID,
    bid?: ID,
}

// Recursive tree component
const Branches = ({branchOrLeafId, bid='b'}: BranchesProps, ) => {
    const {pages}: {pages: PagesT} = useContext(TupleContext);

    if (isID(branchOrLeafId)) {
        const id: ID = branchOrLeafId as ID;
        const page: PageT = pages[id];

        if (!page)
            throw `Page ID not found within "pages": [${page}]`;
        
        return <Leaf text={page.name} pageId={id} />;
    }

    const branch: BranchT = branchOrLeafId as BranchT;
    return (
        <Branch text={branch.label}>
            { branch.branches.map((b, i) => (
                <Branches key={`${bid}${i}`} branchOrLeafId={b}/>
            ))}
        </Branch>
    );
};


interface Props {
    tree: TreeT,
    // maxDepth: number,  // TODO:?
}

const Tree = ({ tree=[] }: Props) => {
    const {pages, classes, styles }: {
        pages: PagesT,
        classes: TupleClassesT,
        styles: TupleStylesT,
    } = useContext(TupleContext);
    const treeClassName = `${_classes.tree} ${classes.tree}`;

    // TODO: Need better key than index
    // https://reactjs.org/docs/lists-and-keys.html#:~:text=We%20don%E2%80%99t%20recommend%20using%20indexes%20for%20keys%20if%20the%20order%20of%20items%20may%20change.
    return (
        <div className={treeClassName} style={styles.tree}>
            { tree.map( (bid, index) => (
                <Branches key={index} branchOrLeafId ={bid}/>
            ))}
        </div>
    );
}


export default Tree;
