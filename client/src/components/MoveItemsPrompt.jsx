import { useState } from 'react';
import deleteItem from '../libs/deleteItem';
import moveDescendants from '../libs/moveDescendants';

export default function MoveItemsPrompt (props) {
    const handleClose = () => props.setShow(false);
    const [ newParentId, setNewParentId ] = useState(false);
    const [ toggle, setToggle ] = [ props.toggle, props.setToggle ];
    const [ children, setChildren ] = [ props.children, props.setChildren ];
    const info = props.itemInfo;
    
    const handleMove = async (newParentId) => {

        const message = await moveDescendants({ parentId: info._id, newParentId: newParentId });
        // delete old parent
        children.splice(info.index, 1);
        setChildren([...children]);
        // re-render page
        setToggle(!toggle);
        handleClose();
        // delete item
        await deleteItem({ _id: info._id, universeId: info.universeId });
        alert(message);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (newParentId) {
            handleMove(newParentId);
        } else {
            alert("You must select a new parent");
        }
    }

    return <div className="modal">
        <h3>Where would you like to move the {info.descendants.length === 1 ? "subitem" : "subitems"} of {info.title}?</h3>
        <form onSubmit={submitHandler}>
            <select name="validParents" id="validParents" required onChange={e => setNewParentId(e.target.value)}>
                <option selected="true" disabled>select new parent</option>
                <option disabled>_________________</option>
                {info.validParents.map(parent => {
                    return <option value={parent._id} key={parent._id}>
                        {parent.title}
                    </option>
                })}
            </select>
            <button type="submit">
                Move
            </button>
            <button onClick={handleClose}>
                Cancel
            </button>
        </form>
    </div>
}