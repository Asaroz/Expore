import axios from "axios";

export default function deleteItemCheck(id, universes, setUniverses) {
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },   
        params: {
            id: id
        }
    };
    
    axios.get('/hasChildren', request)
        .then(response => { 
            console.log(response.data.children);
            if (response.data.children === 0) {
                axios.delete('/deleteItems', request)
                    .then(response => {
                        if ( response.status === 200 ) {
                            alert(response.data.message);
                            
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                return  
            }
        })
        .catch(error => console.log(error));
}