import _classes from './tree.module.css';

import { useContext, useEffect, useRef, useState } from 'react';

import Root from './Root';
import { TupleContext } from '..';
import { PopupDetailsT, TreeT } from './TreeTypes';
import { ID, TupleContextT } from '../TupleTypes';
import Trashcan from './Trashcan';
import ScrollPane from '../../ScrollPane';
import Branches from './Branches';

import { classNames } from '../../../utils';

import Popup, { PopupClassesT, PopupStylesT } from '../../Popup';


export interface TreeProps {
    tree:               TreeT,
    enableTrashcan?:    boolean,
    onLeafRename?:      (pageId: ID, newName: string) => void,
    onBranchRename?:    (path: ID[], newName: string) => void,
    onLeafDelete?:      (path: ID[]) => void,
    onBranchDelete?:    (path: ID[]) => void,
    onLeafAdd?:         (path: ID[], position: number, leafName: string) => void,
    onBranchAdd?:       (path: ID[], position: number, branchName: string) => void,
    onLeafDrop?:        () => void,
    onBranchDrop?:      () => void,
};


const Tree = ({
    tree,   // passed in as prop, because user now has access to this component directly for dynamic trees
    enableTrashcan=false,
    onLeafRename=null,
    onBranchRename = null,
    onLeafDelete=null,
    onBranchDelete=null,
    onLeafAdd=null,
    onBranchAdd=null,
    onLeafDrop=null,
    onBranchDrop=null,
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
    const scrollPaneClassName = classNames(_classes.scrollPane, classes.scrollPane);
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
                                onLeafAdd           ={ onLeafAdd }
                                onBranchAdd         ={ onBranchAdd }
                                onLeafDrop          ={ onLeafDrop }
                                onBranchDrop        ={ onBranchDrop }
                                setPopupDetails     ={ setPopupDetails }
                            />
                        ))}
                    </>
                </ScrollPane>

                {/* TODO: classes don't seem to be passed properly... at least hover class isnt working... */}
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
