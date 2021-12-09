import CreatePage from '../CreatePage';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import getItems from '../../libs/getItems.js';
import deleteItemCheck from '../../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';
import ItemDescPrompt from '../ItemDescPrompt';
import MoveItemsPrompt from '../MoveItemsPrompt';


export default function ItemCard (props) { 
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ showMoveItemsPrompt, setShowMoveItemsPrompt] = useState(false);
    const [ children, setChildren ] = useState([]);
    const [ siblings, setSiblings ] = [ props.info.siblings, props.info.setSiblings ];
    const [ itemInfo, setItemInfo ] = useState({});
    const title = props.info.title;
    const description = props.info.description;
    const id = props.info._id;
    const universeId = props.info.universeId;
    const isRoot = props.info.isRoot;
    const setUser = useContext(UserContext)[1];

    useEffect(() => {
        let childrenRequest;
        async function fetchData () {
            childrenRequest = await getItems({ parentId: id});
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
            props.setInfo(false);
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
    
    return <div key={id} data={id}>
        <h4>
            {title}
            {isRoot ? null :             
            <Confirm
                onConfirm={() => deleteItemHandler(id, universeId)}
                body="This action cannot be undone."
                confirmText="Delete Item"
                title="Are you sure you want to delete this item?"
            >
                <button>X</button>
            </Confirm>
            }
        </h4>
        <p>{description}</p>
        {showCreatePage ?
			<CreatePage 
                setShow={setShowCreatePage} 
                show={showCreatePage}
                isRoot={isRoot ? true : false}
                items={children}
                setItems={setChildren}
                parentId={id}
                universeId={universeId}
			/> :
			<button onClick={() => setShowCreatePage(true)}>
                New item
            </button>
		}
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
    </div>
}