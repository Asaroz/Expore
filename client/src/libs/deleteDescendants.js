import axios from 'axios';

export default async function deleteDescendants (params) {
    let message = '';
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },   
        params
    };

    await axios.delete('/deleteItems', request)
        .then(response => { 
            if ( response.status === 200 ) {
                message = response.data.message;
                return;
            }
        })
        .catch(error => message = error);

    return message;
}