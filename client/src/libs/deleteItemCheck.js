import axios from "axios";

export default async function deleteItemCheck(id, universes, setUniverses) {
    let result = {};
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
    
    await axios.get('/hasChildren', request)
        .then(async response => { 
            console.log(response.data.children);
            if (response.data.children === 0) {
                await axios.delete('/deleteItems', request)
                    .then(response => {
                        if ( response.status === 200 ) {
                            result = { pass: true, message: response.data.message };
                            return;
                        }
                    })
                    .catch(error => result = { pass: false, message: error} );
            } else {
                result = { pass: false, message: response.data.message};
                return;
            }
        })
        .catch(error => result = { pass: false, message: error});
    return result;
}