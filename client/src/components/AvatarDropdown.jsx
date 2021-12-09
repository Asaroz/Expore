import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import '../scss/AvatarDropdown.scss';

export default function AvatarDropdown (props) {
    const handleClose = () => props.setShow(false);
    const addClass = props.isRight ? "right" : ""; 
    const setUser = useContext(UserContext)[1];

    useEffect(() => {
        // smooth dropdown effect:
        const dropdown = document.getElementById("dropdown");
        dropdown.classList.remove("dropdownTransition");
    }, []);

    return <><div id="dropdown" className={`${addClass} dropdownTransition`}>
        { addClass ? 
            <div>
                <NavLink to="/">Main page</NavLink>
            </div>
        : null}
        <div>
            <NavLink to="/userSettings">Account Settings</NavLink>
        </div>
        <div id="itemPageLogout" onClick={() => {
            localStorage.clear();
            setUser(null);
        }}>
            Logout
        </div>
    </div>
    <div id="wrapper" onClick={handleClose}></div>
    </>
}
