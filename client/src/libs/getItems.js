import axios from "axios";

export default async function getItems (params) {
    let universes;
    let errorMessage;
    const token = localStorage.getItem('authToken');

    await axios.get('/getItem',
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params
    })
        .then(response => {
            universes = response.data.items;
        })
        .catch(error => {
            if (error.response) {
                // If token is unauthorized
                if (error.response.status === 401) {
                    errorMessage = 401;
                    return;
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