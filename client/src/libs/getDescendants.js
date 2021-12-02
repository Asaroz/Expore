import axios from "axios";

export default async function getDescendants (params) {
    let descendantsLength;
    let errorMessage;
    const token = localStorage.getItem('authToken');

    await axios.get('/getDescendants',
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        params: params
    })
        .then(response => {
            descendantsLength = response.data.descendants.length;
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
    if (descendantsLength >= 0) {
        return { success: true, result: descendantsLength }
    } else {
        return { success: false, result: errorMessage }
    }
}