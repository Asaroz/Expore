import { NavLink } from "react-router-dom"


export default function userSettings(){
    const user =JSON.parse( localStorage.getItem("user"));



    return <div>
        <div>
        <NavLink exact to={{ pathname:'/' }} replace>
                Back
            </NavLink>
        </div>
        <div>
            Email:{user.userEmail}
        </div>
        <div>
            {user.userName}
        </div>

    </div>
}
