import { useState } from "react";

export default function MoveItemsPrompt (props) {
    const handleClose = () => props.setShow(false);
    const [ newParentId, setNewParentId ] = useState("");

    const info = props.itemInfo;
    
    const handleMove = async (newParentId) => {
        
        console.log('info', info)
        // TODO

        alert('under construction');
        // Not required because the parent that rendered the component is deleted
        // handleClose();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        handleMove(newParentId);
    }

    return <div className="modal">
        <h3>Where would you like to move {info.descendants.length === 1 ? "this item" : "those items"}?</h3>
        <form onSubmit={submitHandler}>
            <select name="validParents" id="validParents" required>
                {info.validParents.map(parent => {
                    return <option value={parent._id} onChange={e => setNewParentId(e.target.value)}>
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