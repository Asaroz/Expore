import CreatePage from './CreatePage';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import getItem from '../libs/getItem.js';
import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import ItemDescPrompt from './ItemDescPrompt';
import MoveItemsPrompt from './MoveItemsPrompt';


export default function ChildCard (props) { 
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ showMoveItemsPrompt, setShowMoveItemsPrompt] = useState(false);
    const [ children, setChildren ] = useState([]);
    const [ siblings, setSiblings ] = [ props.siblings, props.setSiblings ];
    const [ itemInfo, setItemInfo ] = useState({});
    const title = props.child.title;
    const description = props.child.description;
    const id = props.child._id;
    const setUser = useContext(UserContext)[1];

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

    async function deleteItemHandler(id, universeId) {
        const deleteCheck = await deleteItemCheck({ _id: id, universeId: universeId });
        if (deleteCheck.pass === true) {
            const index = siblings.map(item => item._id).indexOf(id);
            siblings.splice(index, 1);
            // Cloning by value and not by reference (same pointer)
            setSiblings([...siblings]);
            alert(deleteCheck.message);

        } else if (deleteCheck.pass === "continue") {
            // logic to delete item with children
            const index = siblings.map(item => item._id).indexOf(id);
            setItemInfo({...deleteCheck.message, index: index, title: title});
            setShowDescPrompt(true);
        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }
    
    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h4>
            {title}             
            <Confirm
                onConfirm={() => deleteItemHandler(id, props.child.universeId)}
                body="This action cannot be undone."
                confirmText="Delete Item"
                title="Are you sure you want to delete this item?">
                <button>X</button>
            </Confirm>
        </h4>
        <p>{description}</p>
        {showCreatePage ?
			<CreatePage 
                setShow={setShowCreatePage} 
                show={showCreatePage}
                isRoot={false}
                items={children}
                setItems={setChildren}
                parentId={id}
                universeId={props.child.universeId}
			/> :
			<button onClick={() => setShowCreatePage(true)}>
                New item
            </button>
		}
        {children ? <ul>
            {children.map(child => 
                <ChildCard key={child._id}
                    child={child} siblings={children} setSiblings={setChildren}
                />)
            }
        </ul> : null}
        {showDescPrompt ?
            <ItemDescPrompt
                setShow={setShowDescPrompt}
                show={showDescPrompt}
                children={siblings}
                setChildren={setSiblings}
                itemInfo={itemInfo}
                setShowMoveItemsPrompt={setShowMoveItemsPrompt}
            /> : null
        }
        {showMoveItemsPrompt ?
            <MoveItemsPrompt
                setShow={setShowMoveItemsPrompt}
                show={showMoveItemsPrompt}
                children={siblings}
                setChildren={setSiblings}
                itemInfo={itemInfo}
            /> : null
        }
    </li>
}