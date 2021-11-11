import axios from "axios";

export default async function getItem (isRoot) {
    let universes;
    let errorMessage;
    const token = localStorage.getItem('authToken');

    await axios.get('/getItem',
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: {
            "isRoot": true
        }
    })
        .then(response => {
            universes = response.data.Items;
        })
        .catch(error => {
            if (error.response) {
                // If token is unauthorized
                if (error.response.status === 401) {
                    errorMessage = 401;
                }
            }
            errorMessage = error;
        });
    if (universes) {
        return { success: true, result: universes }
    } else {
        return { success: false, result: errorMessage }
    }
}