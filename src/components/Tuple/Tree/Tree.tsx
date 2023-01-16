import { useContext } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import Root from './Root';
import { TupleContext } from '..';
import { BranchT } from './TreeTypes';
import { ID, isID, PageT, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import Trashcan from './Trashcan';


interface BranchesProps {
    branchOrLeafId: BranchT | ID,
    path: string[],
    bid?: ID,
}

// Recursive tree component
const Branches = ({branchOrLeafId, path, bid='b'}: BranchesProps, ) => {
    const { state: {
        pages,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    if (isID(branchOrLeafId)) {
        const id: ID = branchOrLeafId as ID;
        const page: PageT = pages[id];

        if (!page)
            throw `Page ID not found within "pages": [${page}]`;

        return <Leaf text={page.name} pageId={id} path={path} />;
    }

    const branch: BranchT = branchOrLeafId as BranchT;
    // Define these here, because root uses branch component with different styles
    const branchClassName = `
        ${_classes?.branch || ''}
        ${classes?.branch || ''}`

    const branchesClassName = `
        ${_classes?.branches || ''}
        ${classes?.branches  || ''}`;

    return (
        <Branch text={branch.label}
            branchClassName={branchClassName}
            branchesClassName={branchesClassName}
            branchStyle={styles.branch}
            branchesStyle={styles.branches}
        >
            { branch.branches.map((b, i) => (
                <Branches key={`${bid}${i}`} branchOrLeafId={b} path={path.concat(branch.label)}/>
            ))}

        </Branch>
    );
};


interface TreeProps { enableTrashcan: boolean };

const Tree = ({ enableTrashcan }: TreeProps) => {
    const { state: {
        tree,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const treeClassName = `
        ${_classes?.tree || ''}
        ${classes?.tree  || ''}`;

    // TODO: Need better key than index
    // https://reactjs.org/docs/lists-and-keys.html#:~:text=We%20don%E2%80%99t%20recommend%20using%20indexes%20for%20keys%20if%20the%20order%20of%20items%20may%20change.
    return (
        <div className={treeClassName} style={styles.tree}>
            <Root rootName='Tuple' />
            { tree.map( (bid, index) => (
                <Branches key={index} branchOrLeafId={bid} path={[]}/>
            ))}
            { enableTrashcan && (
                <Trashcan symbol='' dragOverSymbol=''/> 
            )}
        </div>
    );
}


export default Tree;
