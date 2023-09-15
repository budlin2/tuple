import { useContext, useEffect, useRef, useState } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import Root from './Root';
import { TupleContext } from '..';
import { BranchT, LeafT, PopupDetailsT, TreeT, isLeaf } from './TreeTypes';
import { ID, PageT, TupleContextT } from '../TupleTypes';
import Trashcan from './Trashcan';
import ScrollPane from '../../ScrollPane';
import Popup from '../../Popup';

import _classes from './tree.module.css';


interface BranchesProps {
    node: BranchT | LeafT,
    path: ID[],
    setPopupDetails: (details: PopupDetailsT) => void,
    onNodeRename?: (nodeId: ID, path: ID[], newName: string) => void,   // TODO: Remove
    onBranchRename?: (path: ID[], newName: string) => void,
}

// Recursive tree component
const Branches = ({
    node,
    path,
    setPopupDetails,
    onNodeRename=()=>{},    // TODO: Remove
    onBranchRename=()=>{},
}: BranchesProps) => {
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

        return (
            <Leaf id={leaf.id}
                text            ={ page.name }
                pageId          ={ leaf.pageId }
                path            ={ path }
                setPopupDetails ={ setPopupDetails }
                onRename        ={ onNodeRename }
            />
        );
    }

    const branch = node as BranchT;
    const branchClassName = `${_classes?.branch || ''} ${classes?.branch || ''}`
    const branchDragOverClassName = `${_classes?.branchDragOver || ''} ${classes?.branchDragOver || ''}`
    const branchesClassName = `${_classes?.branches || ''} ${classes?.branches  || ''}`;

    return (
        <Branch id={ branch.id }
            text                    ={ branch.label }
            branchClassName         ={ branchClassName }
            branchDragOverClassName ={ branchDragOverClassName }
            branchesClassName       ={ branchesClassName }
            branchStyle             ={ styles.branch }
            branchDragOverStyle     ={ styles.branchDragOver }
            branchesStyle           ={ styles.branches }
            path                    ={ path }
            setPopupDetails         ={ setPopupDetails }
            onRename                ={ onBranchRename }
        >
            { branch.branches.map( b => (
                <Branches
                    key             ={ b.id }
                    node            ={ b }
                    path            ={ path.concat(node.id) }
                    setPopupDetails ={ setPopupDetails }
                    onNodeRename    ={ onNodeRename }
                    onBranchRename  ={ onBranchRename }
                />
            ))}
        </Branch>
    );
};


export interface TreeProps {
    tree: TreeT,
    enableTrashcan?: boolean,
    onNodeRename?: (nodeId: ID, path: ID[], newName: string) => void,
    onBranchRename?: (path: ID[], newName: string) => void,
};

const Tree = ({
    tree,   // passed in as prop, because user now has access to this component directly for dynamic trees
    enableTrashcan=false,
    onNodeRename=null, // TODO: remove this when implementing onLeagRename
    onBranchRename = null,
}: TreeProps) => {
    const treeRef = useRef<HTMLDivElement>();
    const rootContainerRef = useRef<HTMLDivElement>();

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    const [popupDetails, setPopupDetails] = useState<PopupDetailsT | null>(null);
    const [scrollPaneHeight, setScrollPaneHeight] = useState<number>(0);

    // TODO: What's going on here?
    useEffect( () => {
        const treeHeight = treeRef.current.clientHeight;
        const rootHeight = rootContainerRef.current.clientHeight;

        setScrollPaneHeight(treeHeight - rootHeight);
    }, [ treeRef, rootContainerRef, setScrollPaneHeight ]);

    useEffect(() => {
        const handleDocumentClick = () => setPopupDetails(null);
        document.addEventListener('click', handleDocumentClick);

        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    // CSSModules
    const treeClassName = `${ _classes?.tree || '' } ${ classes?.tree  || '' }`;
    const scrollPaneClassName = `${_classes.contentContainer} ${classes.scrollPane}`;

    // Styles
    const scrollPaneStyle = { ...styles?.scrollPane, height: scrollPaneHeight }

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
                                key                 ={ node.id }
                                node                ={ node }
                                path                ={ [] }
                                onNodeRename        ={ onNodeRename }
                                onBranchRename      ={ onBranchRename }
                                setPopupDetails     ={ setPopupDetails }
                            />
                        ))}
                    </>
                </ScrollPane>

                { popupDetails && (
                    <Popup position={popupDetails.pos}
                        items={ popupDetails.items }
                        onClose={ () => setPopupDetails(null) }
                    />
                )}

                { enableTrashcan && (
                    <Trashcan symbol='' dragOverSymbol=''/>
                )}
            </div>
        </div>
    );
}


export default Tree;
