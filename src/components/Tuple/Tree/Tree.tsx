import { useContext } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import Root from './Root';
import { TupleContext } from '..';
import { BranchT } from './TreeTypes';
import { ID, isID, PageT, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface BranchesProps {
    branchOrLeafId: BranchT | ID,
    bid?: ID,
}

// Recursive tree component
const Branches = ({branchOrLeafId, bid='b'}: BranchesProps, ) => {
    const { state: {
        pages,
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    if (isID(branchOrLeafId)) {
        const id: ID = branchOrLeafId as ID;
        const page: PageT = pages[id];

        if (!page)
            throw `Page ID not found within "pages": [${page}]`;

        return <Leaf text={page.name} pageId={id} />;
    }

    const branch: BranchT = branchOrLeafId as BranchT;
    // Define this here, because root uses branch component with different styles
    const branchClassName = `
        ${_classes?.branch || ''}
        ${template?.branch || ''}
        ${classes?.branch || ''}`

    return (
        <Branch text={branch.label}
            className={branchClassName}
            style={styles.branch}
        >
            { branch.branches.map((b, i) => (
                <Branches key={`${bid}${i}`} branchOrLeafId={b}/>
            ))}

        </Branch>
    );
};


const Tree = () => {
    const { state: {
        tree,
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const treeClassName = `
        ${_classes?.tree || ''}
        ${template?.tree || ''}
        ${classes?.tree  || ''}`;

    // TODO: Need better key than index
    // https://reactjs.org/docs/lists-and-keys.html#:~:text=We%20don%E2%80%99t%20recommend%20using%20indexes%20for%20keys%20if%20the%20order%20of%20items%20may%20change.
    return (
        <div className={treeClassName} style={styles.tree}>
            <Root rootName='Tuple' />
            { tree.map( (bid, index) => (
                <Branches key={index} branchOrLeafId ={bid}/>
            ))}
        </div>
    );
}


export default Tree;
