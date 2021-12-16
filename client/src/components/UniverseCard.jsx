import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import { useContext, useEffect, useState } from 'react';
import getDescendants from '../libs/getDescendants.js';
import UserContext from '../contexts/UserContext';
import { NavLink } from 'react-router-dom';
import UniverseDescPrompt from './UniverseDescPrompt.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../scss/UniverseCard.scss'

export default function UniverseCard (props) {
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ descendantsLength, setDescendantsLength ] = useState(false);
    const [ itemInfo, setItemInfo ] = useState({});
    const setUser = useContext(UserContext)[1];

    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universeId = props.universe.universeId;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    useEffect(() => {
        let descendantsRequest;
        async function fetchData () {
            descendantsRequest = await getDescendants({ _id: id});
            if (descendantsRequest.success) {
                setDescendantsLength(descendantsRequest.result);
            } else if (descendantsRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log("result",descendantsRequest.result);
            }
        };
        fetchData();
    }, [setUser, id])

    async function deleteItemHandler(id, universeId) {
        const deleteCheck = await deleteItemCheck({ _id: id, universeId: universeId });
        if (deleteCheck.pass === true) {
            const index = universes.map(universe => universe._id).indexOf(id);
            universes.splice(index, 1);
            // Cloning by value and not by reference (same pointer)
            setUniverses([...universes]);
            alert (deleteCheck.message);

        } else if (deleteCheck.pass === "continue") {
            // logic to delete universe with children
            const index = universes.map(universe => universe._id).indexOf(id);
            setItemInfo({...deleteCheck.message, index: index});
            setShowDescPrompt(true);

        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }

    return <div className="universeCard" key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            <NavLink exact to={{ pathname:'/item', hash: `${id}` }} replace style={{ textDecoration: 'none' , color: "white"}}  testId="universeLink">
                {title}
            </NavLink>
            <Confirm
                onConfirm={() => deleteItemHandler(id, universeId)}
                body="This action cannot be undone."
                confirmText="Delete Universe"
                title="Are you sure you want to delete this universe?">
                <button className="universeCardButton" testId="deleteUniverseButton">
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </Confirm>
        </h3>
        <p>{
                description.length < 90 ? description: description.substring(0,90) + "..."
            }</p>
        { 
            console.log(descendantsLength)}
        {
            descendantsLength ?
                <div> {descendantsLength} {descendantsLength > 1 ? "items" : "item"} </div> 
                : descendantsLength === 0 ?
                    <div> no items yet</div>
                    :<div>loading descendants</div>
        }
        {showDescPrompt ?
            <UniverseDescPrompt         
                setShow={setShowDescPrompt}
                show={showDescPrompt}
                universes={universes}
                setUniverses={setUniverses}
                itemInfo={itemInfo}
            /> : null
        }
    </div>
}