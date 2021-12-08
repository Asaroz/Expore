import { useState } from 'react';

// Validation
function getSavedValue(key){

    let savedValue = localStorage.getItem(key);

    if (savedValue === "null" || savedValue === "undefined" ) {
        return null;
    }

    try {
        return JSON.parse(savedValue);
    } catch {
        return savedValue;
    }
};

function useUserContext (key) { 
    const [ value, setValue ] = useState(()=>{
        return getSavedValue(key);
    });

    //Set localStorage when user is set
    // useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    //  }, [value]);
    
    return [ value, setValue ];
};

export default useUserContext;