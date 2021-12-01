import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import '../scss/UniverseNavbar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import getCurrentInfo from '../libs/getCurrentInfo';
import '../scss/LoadingRing.scss';

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
            itemRequest = await getCurrentInfo({ _id: id });
            if (itemRequest.success) {
                console.log('result', itemRequest.result);
                console.log('extraInfo', itemRequest.extraInfo);
                setItemInfo(itemRequest.result);

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
                <h1>{itemInfo.title}</h1>
            </div>
        </div>
        : /* Render spinner */ 
        <div class="loadingRing">
            Loading
            <span></span>
        </div>)
}