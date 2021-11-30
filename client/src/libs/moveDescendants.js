import axios from 'axios';

export default async function moveDescendants (body) {
    let message = '';
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        }
    };

    await axios.put('/moveItems', body, request)
        .then(response => { 
            if ( response.status === 200 ) {
                message = response.data.message;
                return;
            }
        })
        .catch(error => message = error);

    return message;
}