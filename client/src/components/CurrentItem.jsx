import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import '../scss/UniverseNavbar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import getItems from '../libs/getItems';

export default function CurrentItem (props) {
    const [ sidebarCollapse, setSidebarCollapse ] = useState(true);
    const [ itemInfo, setItemInfo ] = useState(false);
    const location = useLocation();
    const id = location.hash.slice(1);

    useEffect(() => {
        // sidebar expand on larger screens
        if (window.screen.width >= 776) {
            setSidebarCollapse(false);
        }
    }, []);

    useEffect(() => {
        let itemRequest;
        async function fetchData () {
            itemRequest = await getItems({ _id: id });
            if (itemRequest.success) {
                console.log('result', itemRequest.result[0]);
                setItemInfo(itemRequest.result[0]);
                // data needed:
                // parent name/parentId
                // universe name
                // child names/id getItem({ parentId: id })
                // sibling names/id
            } else if (itemRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log(itemRequest.result);
            }
        };
        fetchData();
    }, []);


    // title = itemInfo.title;
    // description = itemInfo.description;
    // universeId = itemInfo.universeId;
    // isRoot = itemInfo.isRoot;
    // parentId = itemInfo.parentId;
    const setUser = useContext(UserContext)[1];




    return (itemInfo ? 
        <div id="itemWrapper">
            <nav 
                data={itemInfo.universeId} id="itemSidebar" 
                className={sidebarCollapse ? "active" : ""}
            >
                
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
            <div id='content'>
                
            </div>
        </div>
        : <div>
            <div className="spinner"></div>
            <div>Loading content...</div>
        </div>)
}