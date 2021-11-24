import CreatePage from './CreatePage';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import getItem from '../libs/getItem.js';

export default function ChildCard (props) { 
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ children, setChildren ] = useState(false);
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
    
    // TODO:
    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h4>{title}</h4>
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
                <ChildCard child={child} children={children} setChildren={setChildren} />)
            }
        </ul> : null}
    </li>
}