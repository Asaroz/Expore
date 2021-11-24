import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import { useContext, useEffect, useState } from 'react';
import ChildrenPrompt from './ChildrenPrompt.jsx';
import getItem from '../libs/getItem.js';
import UserContext from '../contexts/UserContext';
import { NavLink } from 'react-router-dom';

export default function UniverseCard (props) {
    const [ showChildrenPrompt, setShowChildrenPrompt] = useState(false);
    const [ childrenLength, setChildrenLength ] = useState(false);
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
                setChildrenLength(childrenRequest.result);
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
            <NavLink to='universe'>{title}</NavLink>
            <Confirm
                onConfirm={() => deleteItemHandler(id)}
                body="This action cannot be undone."
                confirmText="Delete Universe"
                title="Are you sure you want to delete this?">
                <button>X</button>
            </Confirm>
        </h3>
        <p>{description}</p>
        {showChildrenPrompt ?
            <ChildrenPrompt
                setShow={setShowChildrenPrompt}
                show={showChildrenPrompt}
                itemInfo={itemInfo}
                setChildrenLength={setChildrenLength}
            /> : null
        }
    </li>
}