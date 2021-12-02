import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { NavLink, useLocation } from 'react-router-dom';
import getCurrentInfo from '../libs/getCurrentInfo';
import Confirm from 'react-confirm-bootstrap';
import deleteItemCheck from '../libs/deleteItemCheck';
import '../scss/LoadingRing.scss';
import '../scss/CurrentItem.scss';
import ItemDescPrompt from './ItemDescPrompt';
import MoveItemsPrompt from './MoveItemsPrompt';
import CreatePage from './CreatePage';

export default function CurrentItem (props) {
    const [ sidebarCollapse, setSidebarCollapse ] = useState(true);
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ showMoveItemsPrompt, setShowMoveItemsPrompt] = useState(false);
    const [ itemInfo, setItemInfo ] = useState(false);
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
            } else if (itemRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log(itemRequest.result);
            }
        };
        fetchData();
    }, [id, setUser]);
    console.log('item info', itemInfo)

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
            <nav 
                data={itemInfo.universeId} id="itemSidebar" 
                className={sidebarCollapse ? "active" : ""}
            >  
                <NavLink to="/">Main page</NavLink>
                <div>Search bar goes here</div>
                <div>
                    {itemInfo.isRoot ? 
                        /* Current Item is Universe */
                        <NavLink exact to={{ pathname:'/item', hash: `${id}` }} replace>
                            {itemInfo.isRoot ? itemInfo.title : itemInfo.parent.title}
                        </NavLink> : <>
                        <NavLink 
                            exact to={{ pathname:'/item', hash: `${itemInfo.universeId}` }} 
                            replace className="breadcrumb"
                        >
                            {itemInfo.universe ? itemInfo.universe.title : itemInfo.parent.title}
                        </NavLink>
                        { itemInfo.universeId === itemInfo.parentId ? 
                            /* Current Item is child of Universe */
                            <NavLink exact to={{ pathname:'/item', hash: `${id}` }} replace>
                                {itemInfo.title}
                            </NavLink> : <>
                            <NavLink exact to={{ pathname:'/item', hash: `${itemInfo.parentId}` }} replace
                                className={`breadcrumb ${itemInfo.parent.parentId === itemInfo.universeId ?
                                    null : "dotsBefore"}`
                                }
                            >
                                {itemInfo.parent.title}
                            </NavLink>
                            <NavLink exact to={{ pathname:'/item', hash: `${id}` }} replace>
                                {itemInfo.title}
                            </NavLink> </>
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
                { itemInfo.siblings ? <>
                    <h3>Siblings</h3>
                    <ul>
                        {itemInfo.siblings.map(item => <li key={item._id}>
                            <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                {item.title}
                            </NavLink>
                        </li>)}
                    </ul>
                </>: null}
            </nav>
            <button 
                type="button" id="sidebarCollapse"
                className={sidebarCollapse ? "active" : ""} 
                onClick={() => setSidebarCollapse(!sidebarCollapse)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div id="content">
                <div className="itemCard">
                    <h1>{itemInfo.title}</h1>
                    <p>{itemInfo.description}</p>
                </div>
                {showCreatePage ?
                    <CreatePage 
                        setShow={setShowCreatePage} 
                        show={showCreatePage}
                        isRoot={false}
                        items={itemChildren}
                        setItems={setItemChildren}
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
                                    body="This action cannot be undone."
                                    confirmText="Delete Item"
                                    title="Are you sure you want to delete this item?"
                                >
                                    <button>X</button>
                                </Confirm>
                            </h4>
                            <NavLink exact to={{ pathname:'/item', hash: `${item._id}` }} replace>
                                Go to item
                            </NavLink>
                        </div>)}
                    </div>
                : null}
            </div>
            {showDescPrompt ?
                <ItemDescPrompt
                    setShow={setShowDescPrompt}
                    show={showDescPrompt}
                    children={itemChildren}
                    setChildren={setItemChildren}
                    itemInfo={movDelInfo}
                    setShowMoveItemsPrompt={setShowMoveItemsPrompt}
                /> 
            : null }
            {showMoveItemsPrompt ?
                <MoveItemsPrompt
                    setShow={setShowMoveItemsPrompt}
                    show={showMoveItemsPrompt}
                    children={itemChildren}
                    setChildren={setItemChildren}
                    itemInfo={movDelInfo}
                /> 
            : null }
        </div>
        : /* Render spinner */ 
        <div class="loadingRing">
            Loading
            <span></span>
        </div>)
}