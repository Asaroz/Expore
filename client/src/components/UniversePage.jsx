import { useContext, useEffect, useState } from 'react';
import CreatePage from './CreatePage';
import ChildrenPrompt from './ChildrenPrompt.jsx';
import getItem from '../libs/getItem.js';
import UserContext from '../contexts/UserContext';
import ChildCard from './ChildCard.jsx';
import { useLocation } from 'react-router-dom';

export default function UniversePage (props) {
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showChildrenPrompt, setShowChildrenPrompt] = useState(false);
    const [ universe, setUniverse ] = useState(false);
    const [ children, setChildren ] = useState(false);
    const [ itemInfo, setItemInfo ] = useState({});
    const setUser = useContext(UserContext)[1];
    const location = useLocation();

    // add on redirect
    //localStorage.removeItem('universe')

    useEffect(() => {
        if (location.state) {
            localStorage.setItem('universe', location.state.universe);
            setUniverse(location.state.universe);
        }

        let childrenRequest;
        async function fetchData () {
            childrenRequest = await getItem({ parentId: universe._id});
            if (childrenRequest.success) {
                console.log('result from request', childrenRequest.result)
                console.log('id on request', universe._id)
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
    }, [setUser, universe, location])

    return <div key={Math.floor(Math.random() * 10000)} data={universe._id}>
        <h3>
            {universe.title}
        </h3>
        <p>{universe.description}</p>
        {/* Button to add child item */}
        {showCreatePage ?
			<CreatePage 
				setShow={setShowCreatePage}
				show={showCreatePage}
                isRoot={false}
                items={children}
                setItems={setChildren}
                parentId={universe._id}
                universeId={universe._id}
			/> :
			<button onClick={() => setShowCreatePage(true)}>
                New item
            </button>
		}
        {/* List of children */}
        {children ? <ul>
            {children.map(child => <ChildCard 
                child={child} children={children} setChildren={setChildren}
            />)}
        </ul> : null}
        {showChildrenPrompt ?
            <ChildrenPrompt
                setShow={setShowChildrenPrompt}
                show={showChildrenPrompt}
                itemInfo={itemInfo}
                setChildren={setChildren}
            /> : null
        }
    </div>
}