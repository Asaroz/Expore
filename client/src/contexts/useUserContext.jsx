import { useEffect, useState } from 'react';

// Validation
function getSavedValue(key){
    let savedValue = JSON.parse(localStorage.getItem(key));
    
    if (savedValue === "null") {
        savedValue = null;
    };

    if(savedValue) return savedValue;
    // check if 'else' is really necessary
    else return null;

};

function useUserContext (key) { 
    const [user, setUser] = useState(()=>{
        return getSavedValue(key);
    });

    // Set localStorage when user is set
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(user));
    },[user]);

    return [user,setUser]
};

export default useUserContext;