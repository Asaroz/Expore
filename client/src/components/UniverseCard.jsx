import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import { useState } from 'react';
import CreatePage from './CreatePage';
import ChildrenPrompt from './ChildrenPrompt.jsx';

export default function UniverseCard (props) {
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showChildrenPrompt, setShowChildrenPrompt] = useState(false);
    const [ itemInfo, setItemInfo ] = useState({});

    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    async function deleteItemHandler (id) {
        console.log('id', id);
        const deleteCheck = await deleteItemCheck(id);
        if (deleteCheck.pass === true) {
            const index = universes.map(universe => universe._id).indexOf(id);
            console.log('uniOld', universes.length);
            universes.splice(index, 1);
            console.log('uniNew', universes.length);
            
            // Cloning by value and not by reference (same pointer)
            setUniverses([...universes]);
 
            alert (deleteCheck.message);
        } else if (deleteCheck.pass === "continue") {
            // logic to move or delete items with children
            setItemInfo(deleteCheck.message);
            setShowChildrenPrompt(true);
        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }

    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            {title}
            <Confirm
                onConfirm={() => deleteItemHandler(id)}
                body="This action cannot be undone."
                confirmText="Delete Universe"
                title="Are you sure you want to delete this?">
                <button>X</button>
            </Confirm>
        </h3>
        <p>{description}</p>
        {/* Button to add child item */}
        {showCreatePage ?
			<CreatePage 
				setShow={setShowCreatePage}
				show={showCreatePage}
                isRoot={false}
                universes={universes}
                setUniverses={setUniverses}
                parentId={id}
			/> :
			<button onClick={() => setShowCreatePage(true)}>
                New item
            </button>
		}
        {showChildrenPrompt ?
            <ChildrenPrompt
                setShow={setShowChildrenPrompt}
                show={showChildrenPrompt}
                itemInfo={itemInfo}
            /> : null
        }
    </li>
}