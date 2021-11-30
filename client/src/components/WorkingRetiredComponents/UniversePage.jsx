import { useContext, useEffect, useState } from 'react';
import CreatePage from '../CreatePage';
import getItem from '../../libs/getItem.js';
import UserContext from '../../contexts/UserContext';
import ChildCard from './ChildCard.jsx';
import { NavLink, useLocation } from 'react-router-dom';

export default function UniversePage (props) {
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ universe, setUniverse ] = useState(false);
    const [ children, setChildren ] = useState(false);
    const setUser = useContext(UserContext)[1];
    const location = useLocation();

    useEffect(() => {
        if (!universe) {
            if (location.state) { // page is loaded from UniverseCard:
                localStorage.setItem('universe', JSON.stringify(location.state.universe));
                setUniverse(location.state.universe);
            } else { // page is refreshed
                setUniverse(JSON.parse(localStorage.getItem('universe')));
            }
        }

        let childrenRequest;
        async function fetchData () {
            childrenRequest = await getItem({ parentId: universe._id });
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
        if (universe._id) {
            fetchData();
        }
    }, [setUser, universe, location])

    return <div data={universe._id}>
        <NavLink to="/" onClick={() => localStorage.removeItem('universe')}>
            Back to main page
        </NavLink>
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
            {children.map(child => <ChildCard key={child._id}
                child={child} siblings={children} setSiblings={setChildren}
            />)}
        </ul> : null}
    </div>
}