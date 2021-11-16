import React, { useEffect, useState } from 'react';


function getSavedValue(key){
    const savedValue = JSON.parse(localStorage.getItem('user'));
    if(savedValue) return savedValue;

};

function useUserContext (key) { 
    const [user, setUser] = useState(()=>{
        return getSavedValue(key);
    });

    if (user === "null") {
        setUser(null);
    };

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(user));
    },[user]);

    return [user,setUser]
};

export default useUserContext;