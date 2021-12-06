import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { NavLink, useLocation } from 'react-router-dom';
import getCurrentInfo from '../libs/getCurrentInfo';
import Confirm from 'react-confirm-bootstrap';
import deleteItemCheck from '../libs/deleteItemCheck';
import updateDescription from '../libs/updateDescription';
import ItemDescPrompt from './ItemDescPrompt';
import MoveItemsPrompt from './MoveItemsPrompt';
import CreatePage from './CreatePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../scss/LoadingRing.scss';
import '../scss/CurrentItem.scss';

export default function CurrentItem (props) {
    const [ sidebarCollapse, setSidebarCollapse ] = useState(true);
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ itemInfo, setItemInfo ] = useState(false);
    const [ editDescription, setEditDescription ] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ showMoveItemsPrompt, setShowMoveItemsPrompt] = useState(false);
    const [ toggle, setToggle ] = useState(true);
    const [ itemChildren, setItemChildren ] = useState(false);
    const [ movDelInfo, setMovDelInfo ] = useState(false);
    const location = useLocation();
    const id = location.hash.slice(1);
    const setUser = useContext(UserContext)[1];

    useEffect(() => {
        // sidebar expand on larger screens
        if (window.screen.width >= 776) {
            setSidebarCollapse(false);
        }
    }, []);

    useEffect(() => {
        let itemRequest;
        // Option to have a spinner while switching items:
        //setItemInfo(false);
        async function fetchData () {
            itemRequest = await getCurrentInfo({ _id: id });
            if (itemRequest.success) {
                setItemInfo({
                    ...itemRequest.result, 
                    ...itemRequest.extraInfo
                });
                if (itemRequest.extraInfo.children) {
                    setItemChildren(itemRequest.extraInfo.children);
                }
                if (itemRequest.result.description) {
                    setDescription(itemRequest.result.description);
                } else {
                    setDescription("");
                }
            } else if (itemRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log(itemRequest.result);
            }
        };
        fetchData();
    }, [id, setUser, toggle]);

    // Update description:
    function updateHandler () {
        updateDescription(description, id);
        setEditDescription(false);
    }
    // Discard changes to the description:
    function discardHandler () {
        setDescription(itemInfo.description);
        setEditDescription(false);
    }
    // Delete items: (child items can be deleted)
    async function deleteItemHandler (id, universeId, title) {
        const deleteCheck = await deleteItemCheck({ _id: id, universeId: universeId });
        if (deleteCheck.pass === true) {
            const index = itemChildren.map(item => item._id).indexOf(id);
            itemChildren.splice(index, 1);
            // Cloning by value and not by reference (same pointer)
            setItemChildren([...itemChildren]);
            alert(deleteCheck.message);
        } else if (deleteCheck.pass === "continue") {
            // logic to delete item with children
            const index = itemChildren.map(item => item._id).indexOf(id);
            setMovDelInfo({...deleteCheck.message, index: index, title: title});
            setShowDescPrompt(true);
        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }

    return (itemInfo ? 
        <div id="itemWrapper">
            {/* Sidebar */}
            <nav 
                data={itemInfo.universeId} id="itemSidebar" 
                className={sidebarCollapse ? "active" : ""}
            >  
                <NavLink to="/">Main page</NavLink>
                <div>Search bar goes here</div>
                <div>
                    {itemInfo.isRoot ? 
                        /* Current Item is Universe */
                        <span className="activeLink">
                            {itemInfo.isRoot ? itemInfo.title : itemInfo.parent.title}
                        </span> : <>
                        <NavLink 
                            exact to={{ pathname:'/item', hash: `${itemInfo.universeId}` }} 
                            replace className="breadcrumb"
                        >
                            {itemInfo.universe ? itemInfo.universe.title : itemInfo.parent.title}
                        </NavLink>
                        { itemInfo.universeId === itemInfo.parentId ? 
                            /* Current Item is child of Universe */
                            <span className="activeLink">
                                {itemInfo.title}
                            </span> : <>
                            <NavLink exact to={{ pathname:'/item', hash: `${itemInfo.parentId}` }} replace
                                className={`breadcrumb ${itemInfo.parent.parentId === itemInfo.universeId ?
                                    null : "dotsBefore"}`
                                }
                            >
                                {itemInfo.parent.title}
                            </NavLink>
                            <span className="activeLink">
                                {itemInfo.title}
                            </span> </>
                        }
                    </>}
                </div>
                <ul>
                    <li key={id}>{itemInfo.title}</li>
                    { itemChildren ? 
                        <ul>
                            {itemChildren.map(item => <li key={item._id}>
                                <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                    {item.title}
                                </NavLink>
                            </li>)}
                        </ul>
                    : null}
                </ul>
                { itemInfo.siblings ? 
                    itemInfo.siblings.length > 0 ? <>
                    <h3>Siblings</h3>
                    <ul>
                        {itemInfo.siblings.map(item => <li key={item._id}>
                            <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                {item.title}
                            </NavLink>
                        </li>)}
                    </ul>
                </>: null : null}
            </nav>
            {/* Button to collapse sidebar */}
            <button 
                type="button" id="sidebarCollapse"
                className={sidebarCollapse ? "active" : ""} 
                onClick={() => setSidebarCollapse(!sidebarCollapse)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            {/* Main area with cards */}
            <div id="content">
                <div className="buttonContainer">
                    <button id="itemPageLogout" onClick={() => {
                        localStorage.clear();
                        setUser(null);
                    }}>
                        Logout
                    </button>
                </div>
                <div id="itemCard">
                    <h1>{itemInfo.title}</h1>
                    {editDescription ? <> 
                        <div>
                            <label htmlFor="newDescription">New description:</label>
                        </div>
                        <textarea
                            rows={10} cols={60} id="newDescription" placeholder="Add a description..." 
                            maxLength={9000} value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <div>
                            <Confirm
                                onConfirm={() => discardHandler()}
                                confirmText="Discard"
                                title="Discard changes?"
                            >
                                <button>Discard Changes</button>
                            </Confirm>
                            <Confirm
                                onConfirm={() => updateHandler()}
                                confirmText="Update"
                                title="Are you sure you want to update?"
                                body="The existing description will be overwritten"
                            >
                                <button>Save</button>
                            </Confirm>
                        </div>
                    </> : <>
                        <p>
                            {description}
                            <button onClick={() => setEditDescription(true)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        </p>
                    </>}
                </div>
                {showCreatePage ?
                    <CreatePage 
                        setShow={setShowCreatePage} 
                        show={showCreatePage}
                        isRoot={false}
                        items={itemChildren} setItems={setItemChildren}
                        parentId={id}
                        universeId={itemInfo.universeId}
                    /> :
                    <button onClick={() => setShowCreatePage(true)}>
                        New item
                    </button>
                }
                { itemChildren ? 
                    <div>
                        {itemChildren.map(item => <div>
                            <h4>
                                {item.title}             
                                <Confirm
                                    onConfirm={() => deleteItemHandler(item._id, item.universeId, item.title)}
                                    confirmText="Delete Item"
                                    title="Are you sure you want to delete this item?"
                                    body="This action cannot be undone"
                                >
                                    <button><FontAwesomeIcon icon={faTrash}/></button>
                                </Confirm>
                            </h4>
                            <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                Go to item
                            </NavLink>
                        </div>)}
                    </div>
                : null}
            </div>
            {/* Prompts when deleting items with children */}
            {showDescPrompt ?
                <ItemDescPrompt
                    setShow={setShowDescPrompt}
                    show={showDescPrompt}
                    children={itemChildren} setChildren={setItemChildren}
                    itemInfo={movDelInfo}
                    setShowMoveItemsPrompt={setShowMoveItemsPrompt}
                /> 
            : null }
            {showMoveItemsPrompt ?
                <MoveItemsPrompt
                    setShow={setShowMoveItemsPrompt}
                    show={showMoveItemsPrompt}
                    children={itemChildren} setChildren={setItemChildren}
                    itemInfo={movDelInfo}
                    toggle={toggle} setToggle={setToggle}
                /> 
            : null }
        </div>
        : /* Render spinner while loading */ 
        <div class="loadingRing">
            Loading
            <span></span>
        </div>)
}