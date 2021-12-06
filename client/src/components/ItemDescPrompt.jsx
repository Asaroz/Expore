import deleteDescendants from '../libs/deleteDescendants.js';

export default function ItemDescPrompt (props) {
    const handleClose = () => props.setShow(false);

    const info = props.itemInfo;
    const children = props.children;
    const setChildren = props.setChildren;
 
    const handleDelete = async () => {
        const message = await deleteDescendants({ _id: info._id, universeId: info.universeId });
        children.splice(info.index, 1);
        setChildren([...children]);
        alert(message);
        handleClose();
    }
    
    const handleMove = async () => {
        handleClose();
        props.setShowMoveItemsPrompt(true);
    }

    return <div className="modal">
        {info.descendants.length === 1 ? 
            <h3>This item has {info.descendants.length} subitem are you sure you wanna delete it?</h3> :
            <h3>This item has {info.descendants.length} subitems are you sure you wanna delete them all?</h3>
        }
        <button onClick={handleDelete}>
            Yes, delete this item and the {info.descendants.length === 1 ? "subitem" : "subitems" }
        </button>
        <button onClick={handleMove}>
            Yes, but I wanna move the {info.descendants.length === 1 ? "subitem" : "subitems" } first
        </button>
        <button onClick={handleClose}>
            Cancel
        </button>
    </div>
}