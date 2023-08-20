import { useContext, useEffect, useRef, useState } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import Root from './Root';
import { TupleContext } from '..';
import { BranchT, LeafT, isLeaf } from './TreeTypes';
import { ID, PageT, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import Trashcan from './Trashcan';
import ScrollPane from '../../ScrollPane';


interface BranchesProps {
    node: BranchT | LeafT,
    path: string[],
    isDynamicTree: boolean,
}

// Recursive tree component
const Branches = ({ node, path, isDynamicTree }: BranchesProps, ) => {
    const { state: {
        pages,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    if (isLeaf(node)) {
        const leaf = node as LeafT;
        const page: PageT = pages[leaf.pageId];

        if (!page)
            throw `Page ID not found within "pages": [${ leaf.pageId }]`;

        return <Leaf text={page.name} pageId={leaf.pageId} path={path} isDynamicTree={isDynamicTree} />;
    }

    const branch = node as BranchT;

    const branchClassName = `${_classes?.branch || ''} ${classes?.branch || ''}`
    const branchDragOverClassName = `${_classes?.branchDragOver || ''} ${classes?.branchDragOver || ''}`
    const branchesClassName = `${_classes?.branches || ''} ${classes?.branches  || ''}`;

    return (
        <Branch
            text                    ={ branch.label }
            branchClassName         ={ branchClassName }
            branchDragOverClassName ={ branchDragOverClassName }
            branchesClassName       ={ branchesClassName }
            branchStyle             ={ styles.branch }
            branchDragOverStyle     ={ styles.branchDragOver }
            branchesStyle           ={ styles.branches }
            isDynamicTree           ={ isDynamicTree }
        >
            { branch.branches.map( _node => (
                <Branches
                    key             ={ _node.id }
                    node            ={ _node }
                    path            ={ path.concat(`/${branch.label}`) }
                    isDynamicTree   ={ isDynamicTree }
                />
            ))}
        </Branch>
    );
};


interface TreeProps {
    enableTrashcan: boolean,
    isDynamicTree: boolean
};

const Tree = ({ enableTrashcan, isDynamicTree }: TreeProps) => {
    const treeRef = useRef<HTMLDivElement>();
    const rootContainerRef = useRef<HTMLDivElement>();

    const { state: {
        tree,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const [scrollPaneHeight, setScrollPaneHeight] = useState<number>(0);

    // TODO: What's going on here?
    useEffect( () => {
        const treeHeight = treeRef.current.clientHeight;
        const rootHeight = rootContainerRef.current.clientHeight;

        setScrollPaneHeight(treeHeight - rootHeight);
    }, [ treeRef, rootContainerRef, setScrollPaneHeight ]);


    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------

    // CSSModules
    const treeClassName = `${ _classes?.tree || '' } ${ classes?.tree  || '' }`;
    const scrollPaneClassName = `${_classes.contentContainer} ${classes.scrollPane}`;

    // Styles
    const scrollPaneStyle = { ...styles?.scrollPane, height: scrollPaneHeight }
    //------------------------------------------------------------------------------------------------------------------

    return (
        <div className={_classes.treeContainer}>
            <div ref={treeRef} className={treeClassName} style={styles.tree}>
                <div ref={rootContainerRef}>
                    <Root rootName='Tuple' />
                </div>

                <ScrollPane className={scrollPaneClassName} style={scrollPaneStyle}>
                    <>
                        { tree.map( node => (
                            <Branches
                                key         ={ node.id }
                                node        ={ node }
                                path        ={ [] }
                                isDynamicTree ={ isDynamicTree }/>
                        ))}
                    </>
                </ScrollPane>

                { enableTrashcan && (
                    <Trashcan symbol='' dragOverSymbol=''/>
                )}
            </div>
        </div>
    );
}


export default Tree;
