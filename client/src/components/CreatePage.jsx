import { useState } from "react";
import createItem from "../libs/createItem";

import '../scss/CreatePage.scss'

export default function CreatePage(props) {
    const handleClose = () => props.setShow(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const isRoot = props.isRoot;
    const parentId = props.parentId ? props.parentId : null;
    const items = props.items;
    const setItems = props.setItems;
    const universeId = isRoot ? null : props.universeId;

    async function submitHandler(e) {
        e.preventDefault();
        const request = await createItem(title, description, isRoot, parentId, universeId);
        if (request.success) {
            // add universe to current state
            if (items) {
                items.push({ title: title, description: description, _id: request.id, universeId: universeId });
                // add values and not pointers:
                setItems([...items]);
            }
            handleClose();
        } else {
            setMessage(request.result);
        }
    }

    return <div className="createPageModal">
        <div className="createPageContainer">
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
                        <label  htmlFor="description">Description:</label>
                    </div>
                    <textarea 
                        rows={10} cols={60} id="description" placeholder="Add a description..." maxLength={9000}
                        onChange={e => setDescription(e.target.value)} className="description"
                    />
                </div>
                <button type="submit">
                    Create {isRoot ? "Universe" : "Item"}
                </button>
                <div>{`${message}`}</div>
            </form>
        </div>
    </div>
}