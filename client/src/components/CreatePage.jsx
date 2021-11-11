import { useState } from "react";
import createItem from "../libs/createItem";

export default function CreatePage (props) {
    const handleClose = () => props.setShow(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const isRoot = props.isRoot;
    const parentId = props.parentId ? props.parentId : null;
    const universes = props.universes;
    const setUniverses = props.setUniverses;
    
    async function submitHandler (e) {
        e.preventDefault();
        const request = await createItem(title, description, isRoot, parentId);
        if (request.success) {
            console.log("req:", request.id);
            // add universe to current state
            if (universes) {
                universes.push({ title: title, description: description, _id: request.id });
                setUniverses(universes);
            }
            handleClose();
        } else {
            setMessage(request.result);
        }
    }

    return <div>
        <h2>
            New {isRoot ? "Universe" : "Item"}
            <button onClick={handleClose}>
                X
            </button>
        </h2>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" id="title" placeholder="Title" required maxLength={60}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="description">Description:</label>
                </div>
                <textarea 
                    rows={10} cols={60} id="description" placeholder="Add a description..." maxLength={9000} 
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">
                Create {isRoot ? "Universe" : "Item"}
            </button>
            <div>{`${message}`}</div>
        </form>
    </div>
}