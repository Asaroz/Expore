import zero from '../img/avaPoultryOne.jpg'; import one from '../img/avaDogOne.jpg';
import two from '../img/avaDogTwo.jpg'; import three from '../img/avaFaceOne.jpg';
import four from '../img/avaFaceTwo.jpg'; import five from '../img/avaCat.jpg';
import six from '../img/avaLion.jpg'; import seven from '../img/avaOwl.jpg';
import eight from '../img/avaYoda.jpg';
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
import Searchbar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../scss/LoadingRing.scss';
import '../scss/CurrentItem.scss';
import AvatarDropdown from './AvatarDropdown';

export default function CurrentItem (props) {
    const [ sidebarCollapse, setSidebarCollapse ] = useState(true);
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ itemInfo, setItemInfo ] = useState(false);
    const [ editDescription, setEditDescription ] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ showMoveItemsPrompt, setShowMoveItemsPrompt ] = useState(false);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ toggle, setToggle ] = useState(true);
    const [ itemChildren, setItemChildren ] = useState(false);
    const [ movDelInfo, setMovDelInfo ] = useState(false);
    const location = useLocation();
    const id = location.hash.slice(1);
    const [ user, setUser ] = useContext(UserContext);

    const images = [zero, one, two, three, four, five, six, seven, eight];

    useEffect(() => {
        // sidebar expand on larger screens
        if (window.screen.width >= 768) {
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
                <Searchbar universeId={itemInfo.universeId}/>
                <div>
                    {itemInfo.isRoot ? 
                        /* Current Item is Universe */
                        <span className="activeLink">
                            {itemInfo.isRoot ? itemInfo.title : itemInfo.parent.title}
                        </span> : <>
                        <span className="breadcrumb">
                            <NavLink exact to={{ pathname:'/item', hash: `${itemInfo.universeId}` }} replace>
                                {itemInfo.universe ? itemInfo.universe.title : itemInfo.parent.title}
                            </NavLink>
                        </span>
                        { itemInfo.universeId === itemInfo.parentId ? 
                            /* Current Item is child of Universe */
                            <span className="activeLink">
                                {itemInfo.title}
                            </span> : <>
                            <span className={`breadcrumb ${itemInfo.parent.parentId === itemInfo.universeId ?
                                null : "dotsBefore"}`
                            }>
                                <NavLink exact to={{ pathname:'/item', hash: `${itemInfo.parentId}` }} replace>
                                    {itemInfo.parent.title}
                                </NavLink>
                            </span>
                            <span className="activeLink">
                                {itemInfo.title}
                            </span> </>
                        }
                    </>}
                </div>
                <div className="listsContainer">
                    <ul className="rootUl">
                        <li key={id} className={itemChildren.length > 0 ? "rotateBefore" : ""}>{itemInfo.title}</li>
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
                        <ul>
                            {itemInfo.siblings.map(item => <li key={item._id}>
                                <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                    {item.title}
                                </NavLink>
                            </li>)}
                        </ul>
                    </>: null : null}
                </div>
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
                <div>
                    <img 
                        className={`userPageAvatar right ${sidebarCollapse ? "" : "active"}`} 
                        src={images[user.imageIndex]} alt="avatar" 
                        onClick={() => setShowDropdown(true)}
                    />
                    {showDropdown ?
                        <AvatarDropdown show={showDropdown} setShow={setShowDropdown} isRight={true}/>
                    : null}
                </div>
                <div id="itemCard" className="universeCard">
                    <h1>{itemInfo.title}</h1>
                    {editDescription ? <>
                        <div>
                            <label htmlFor="newDescription">New description:</label>
                        </div>
                        <textarea
                            rows={12} cols={35} id="newDescription" placeholder="Add a description..." 
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
                            <button className="iconButton" onClick={() => setEditDescription(true)}>
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
                    <div className="subitemsContainer">
                        {itemChildren.map(item => <div className="subitemContainer">
                            <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                <h4>
                                    {item.title}          
                                </h4>
                            </NavLink>
                            <Confirm
                                onConfirm={() => deleteItemHandler(item._id, item.universeId, item.title)}
                                confirmText="Delete Item"
                                title="Are you sure you want to delete this item?"
                                body="This action cannot be undone"
                            >
                                <button className="iconButton"><FontAwesomeIcon icon={faTrash}/></button>
                            </Confirm>
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