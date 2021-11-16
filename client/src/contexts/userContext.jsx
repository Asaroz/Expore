import React, { useState } from 'react';

const UserContext = React.createContext();

function UserContextProvider (props) { 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    if (user === "null") {
        setUser(null);
    }

	localStorage.setItem('user', JSON.stringify(user));

    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;