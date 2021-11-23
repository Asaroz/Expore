import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import { useContext, useEffect, useState } from 'react';
import CreatePage from './CreatePage';
import ChildrenPrompt from './ChildrenPrompt.jsx';
import getItem from '../libs/getItem.js';
import UserContext from '../contexts/UserContext';
import ChildCard from './ChildCard.jsx';

export default function UniverseCard (props) {
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showChildrenPrompt, setShowChildrenPrompt] = useState(false);
    const [ children, setChildren ] = useState(false);
    const [ itemInfo, setItemInfo ] = useState({});
    const setUser = useContext(UserContext)[1];

    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    useEffect(() => {
        let childrenRequest;
        async function fetchData () {
            childrenRequest = await getItem({ parentId: id});
            if (childrenRequest.success) {
                setChildren(childrenRequest.result);
            } else if (childrenRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log(childrenRequest.result);
            }
        };
        fetchData();
    }, [setUser, id])

    async function deleteItemHandler(id) {
        console.log('id', id);
        const deleteCheck = await deleteItemCheck(id);
        if (deleteCheck.pass === true) {
            const index = universes.map(universe => universe._id).indexOf(id);
            universes.splice(index, 1);
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
        {children ? <ul>
            {children.map(child => <ChildCard 
                child={child} children={children} setChildren={setChildren} setShowCreatePage={setShowCreatePage} showCreatePage={showCreatePage}
            />)}
        </ul> : null}
        {/* Button to add child item */}
        {showCreatePage ?
			<CreatePage 
				setShow={setShowCreatePage}
				show={showCreatePage}
                isRoot={false}
                items={children}
                setItems={setChildren}
                parentId={id}
                universeId={id}
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
                setChildren={setChildren}
            /> : null
        }
    </li>
}