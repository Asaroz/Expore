import deleteDescendants from '../libs/deleteDescendants.js';

export default function ItemDescPrompt (props) {
    const handleClose = () => props.setShow(false);

    const info = props.itemInfo;
    const children = props.children;
    const setChildren = props.setChildren;

    console.log('deleteDescendants props', props)

    const handleDelete = async () => {
        const message = await deleteDescendants({ _id: info._id, universeId: info.universeId });
        console.log('index', info.index)
        children.splice(info.index, 1);
        setChildren([...children]);
        alert(message);
        handleClose();
    }

    const handleMove = async () => {
        
        // TODO

        //children.splice(info.index, 1);
        //setChildren([...children]);
        alert('under construction');
        handleClose();
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