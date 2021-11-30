import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import getItem from '../libs/getItem.js';


export default function NavCard (props) {
    const [ children, setChildren ] = useState([]);
    const [ siblings, setSiblings ] = [ props.siblings, props.setSiblings ];
    const title = props.child.title;
    const id = props.child._id;
    const description = props.child.description;
    const universeId = props.child.universeId;
    const setUser = useContext(UserContext)[1];
    const setInfo = props.setInfo;

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
    }, [setUser, id]);

    function setItem () {
        setInfo({ 
            title: title, 
            _id: id, 
            description: description,
            universeId: universeId, 
            siblings: siblings, 
            setSiblings: setSiblings
        });
    }
    
    return <li key={id} data={id}>
        <div className="itemLink" onClick={setItem}>{title}</div>             
        {children ? <ul>
            {children.map(child => 
                <NavCard 
                    key={child._id} child={child} setInfo={setInfo}
                    siblings={children} setSiblings={setChildren}
                />)
            }
        </ul> : null}
    </li>
}