import { useContext, useEffect, useRef, useState } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import Root from './Root';
import { TupleContext } from '..';
import { BranchT, LeafT, PopupDetailsT, TreeT, isLeaf } from './TreeTypes';
import { ID, PageT, TupleContextT } from '../TupleTypes';
import Trashcan from './Trashcan';
import ScrollPane from '../../ScrollPane';
import Popup, { PopupClassesT, PopupStylesT } from '../../Popup';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';


interface BranchesProps {
    node: BranchT | LeafT,
    index: number,
    path: ID[],
    setPopupDetails:    (details: PopupDetailsT) => void,
    onLeafRename?:      (pageId: ID, newName: string) => void,
    onBranchRename?:    (path: ID[], newName: string) => void,
    onLeafDelete?:      (path: ID[]) => void,
    onBranchDelete?:    (path: ID[]) => void,
    onBranchAdd?:       (path: ID[], position: number, branchName: string) => void,
    onLeafAdd?:         (path: ID[], position: number, leafName: string) => void,
}

// Recursive tree component
const Branches = ({
    node,
    index,
    path,
    setPopupDetails,
    onLeafRename    =()=>{},
    onBranchRename  =()=>{},
    onLeafDelete    =()=>{},
    onBranchDelete  =()=>{},
    onBranchAdd     =()=>{},
    onLeafAdd       =()=>{},
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
            return;

        return (
            <Leaf id={leaf.id}
                index           ={ index }
                text            ={ page.name }
                pageId          ={ leaf.pageId }
                path            ={ path }
                setPopupDetails ={ setPopupDetails }
                onRename        ={ onLeafRename }
                onDelete        ={ onLeafDelete }
                onBranchAdd     ={ onBranchAdd }
                onLeafAdd       ={ onLeafAdd }
            />
        );
    }

    const branch = node as BranchT;
    // Define these here and pass as prop, since Root.tsx also uses Branch component
    const branchClassName           = classNames(_classes?.branch_base, classes?.branch_base);
    const branchHoverClassName      = classNames(_classes?.branch_hover, classes?.branch_hover);
    const branchDragOverClassName   = classNames(_classes?.branch_dragOver, classes?.branch_dragOver);
    const branchActiveClassName     = classNames(_classes.branch_active, classes.branch_active);
    const branchesClassName         = classNames(_classes?.branches, classes?.branches);

    return (
        <Branch id={ branch.id }
            text                    ={ branch.label }
            branchClassName         ={ branchClassName }
            branchHoverClassName    ={ branchHoverClassName }
            branchDragOverClassName ={ branchDragOverClassName }
            branchActiveClassName   ={ branchActiveClassName }
            branchesClassName       ={ branchesClassName }
            branchStyle             ={ styles?.branch?.base }
            branchHoverStyle        ={ styles?.branch?.hover }
            branchDragOverStyle     ={ styles?.branch?.dragOver }
            branchesStyle           ={ styles.branches }
            path                    ={ path }
            setPopupDetails         ={ setPopupDetails }
            onRename                ={ onBranchRename }
            onDelete                ={ onBranchDelete }
            onBranchAdd             ={ onBranchAdd }
            onLeafAdd               ={ onLeafAdd }
        >
            { branch.branches.map( (b, i) => (
                <Branches key={b.id}
                    index           ={ i }
                    node            ={ b }
                    path            ={ path.concat(node.id) }
                    setPopupDetails ={ setPopupDetails }
                    onLeafRename    ={ onLeafRename }
                    onBranchRename  ={ onBranchRename }
                    onLeafDelete    ={ onLeafDelete }
                    onBranchDelete  ={ onBranchDelete }
                    onBranchAdd     ={ onBranchAdd }
                    onLeafAdd       ={ onLeafAdd }
                />
            ))}
        </Branch>
    );
};


export interface TreeProps {
    tree:               TreeT,
    enableTrashcan?:    boolean,
    onLeafRename?:      (pageId: ID, newName: string) => void,
    onBranchRename?:    (path: ID[], newName: string) => void,
    onLeafDelete?:      (path: ID[]) => void,
    onBranchDelete?:    (path: ID[]) => void,
    onBranchAdd?:       (path: ID[], position: number, branchName: string) => void,
    onLeafAdd?:         (path: ID[], position: number, leafName: string) => void,
};

const Tree = ({
    tree,   // passed in as prop, because user now has access to this component directly for dynamic trees
    enableTrashcan=false,
    onLeafRename=null,
    onBranchRename = null,
    onLeafDelete=null,
    onBranchDelete=null,
    onBranchAdd=null,
    onLeafAdd=null,
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
    const treeClassName = classNames(_classes?.tree, classes?.tree);
    const scrollPaneClassName = classNames(_classes.contentContainer, classes.scrollPane);
    const popupClassNames: PopupClassesT = {
        popup:      classNames(_classes?.popup, classes?.popup),
        item:       classNames(_classes?.popupItem_base, classes?.popupItem_base),
        itemHover:  classNames(_classes?.popupItem_hover, classes?.popupItem_hover),
        itemActive: classNames(_classes?.popupItem_active, classes?.popupItem_active),
        hr:         classNames(_classes?.popupHr, classes?.popupHr),
    };

    // Styles
    const scrollPaneStyle = { ...styles?.scrollPane, height: scrollPaneHeight }
    const popupStyles: PopupStylesT = {
        popup:      styles?.popup,
        item:       styles?.popupItem?.base,
        itemHover:  styles?.popupItem?.hover,
        itemActive: styles?.popupItem?.active,
        hr:         styles?.popupHr,
    };

    return (
        <div className={_classes.treeContainer}>
            <div ref={treeRef} className={treeClassName} style={styles.tree}>
                <div ref={rootContainerRef}>
                    <Root rootName='Tuple' />
                </div>

                <ScrollPane className={scrollPaneClassName} style={scrollPaneStyle}>
                    <>
                        { tree.map( (node, i) => (
                            <Branches key={node.id}
                                index               ={ i }
                                node                ={ node }
                                path                ={ [] }
                                onLeafRename        ={ onLeafRename }
                                onBranchRename      ={ onBranchRename }
                                onLeafDelete        ={ onLeafDelete }
                                onBranchDelete      ={ onBranchDelete }
                                onBranchAdd         ={ onBranchAdd }
                                onLeafAdd           ={ onLeafAdd }
                                setPopupDetails     ={ setPopupDetails }
                            />
                        ))}
                    </>
                </ScrollPane>

                { popupDetails && (
                    <Popup
                        position    ={ popupDetails.pos }
                        classes     ={ popupClassNames }
                        styles      ={ popupStyles }
                        items       ={ popupDetails.items }
                        onClose     ={ () => setPopupDetails(null) }
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
