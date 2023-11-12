import { useContext } from 'react';

import Leaf from './Leaf';
import Branch from './Branch';
import { TupleContext } from '..';
import { BranchT, LeafT, PopupDetailsT, isLeaf } from './TreeTypes';
import { ID, PageT, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';
import { classNames } from '../../../utils';

interface BranchesProps {
    node:               BranchT | LeafT,
    index:              number,
    path:               ID[],
    setPopupDetails:    (details: PopupDetailsT) => void,
    onLeafRename?:      (pageId: ID, newName: string) => void,
    onBranchRename?:    (path: ID[], newName: string) => void,
    onLeafDelete?:      (path: ID[]) => void,
    onBranchDelete?:    (path: ID[]) => void,
    onLeafAdd?:         (path: ID[], position: number, leafName: string) => void,
    onBranchAdd?:       (path: ID[], position: number, branchName: string) => void,
    onLeafDrop?:        () => void,
    onBranchDrop?:      () => void,
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
    onLeafAdd       =()=>{},
    onBranchAdd     =()=>{},
    onLeafDrop      =()=>{},
    onBranchDrop    =()=>{},
}: BranchesProps) => {
    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { state: {
        pages,
        classes,
        styles,
    }}: TupleContextT = useContext(TupleContext);

    //------------------------------------------------------------------------------------------------------------------
    // Leaf
    //------------------------------------------------------------------------------------------------------------------
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
                onLeafAdd       ={ onLeafAdd }
                onBranchAdd     ={ onBranchAdd }
                onDrop          ={ onLeafDrop }
            />
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // Branch 
    //------------------------------------------------------------------------------------------------------------------
    const branch = node as BranchT;

    //------------------------------------------------------------------------------------------------------------------
    // Branch Styling
    //------------------------------------------------------------------------------------------------------------------

    // Define these here and pass as prop, since Root.tsx also uses Branch component
    const branchClassName           = classNames(_classes?.branch_base, classes?.branch_base);
    const branchHoverClassName      = classNames(_classes?.branch_hover, classes?.branch_hover);
    const branchDragOverClassName   = classNames(_classes?.branch_dragOver, classes?.branch_dragOver);
    const branchActiveClassName     = classNames(_classes.branch_renaming, classes.branch_renaming);
    
    const branchesClassName         = classNames(_classes?.branches_base, classes?.branches_base);
    const branchesHoverClassName    = classNames(_classes?.branches_hover, classes?.branches_hover);

    return (
        <Branch id={ branch.id }
            text                    ={ branch.label }
            path                    ={ path }

            branchClassName         ={ branchClassName }
            branchHoverClassName    ={ branchHoverClassName }
            branchDragOverClassName ={ branchDragOverClassName }
            branchActiveClassName   ={ branchActiveClassName }
            
            branchesClassName       ={ branchesClassName }
            branchesHoverClassName  ={ branchesHoverClassName }
            
            branchStyle             ={ styles?.branch?.base }
            branchHoverStyle        ={ styles?.branch?.hover }
            branchDragOverStyle     ={ styles?.branch?.dragOver }
            
            branchesStyle           ={ styles?.branches?.base }
            branchesHoverStyle      ={ styles?.branches?.hover}

            setPopupDetails         ={ setPopupDetails }
            onRename                ={ onBranchRename }
            onDelete                ={ onBranchDelete }
            onLeafAdd               ={ onLeafAdd }
            onBranchAdd             ={ onBranchAdd }
            onDrop                  ={ onBranchDrop }
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
                    onLeafAdd       ={ onLeafAdd }
                    onBranchAdd     ={ onBranchAdd }
                    onLeafDrop      ={ onLeafDrop }
                    onBranchDrop    ={ onBranchDrop }
                />
            ))}
        </Branch>
    );
};


export default Branches;