import axios from 'axios';

export default async function updateDescription (description, id) {
    let errorMessage;
    const token = localStorage.getItem('authToken');
    await axios.patch('/updateDescription', {
        _id: id,
        description: description
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status !== 200 ) {
                errorMessage = response.message;
            }
        })
        .catch(error => {
            errorMessage = error;
        })
    if (errorMessage) {
        alert("Error:", errorMessage);
        return { success: false, result: errorMessage }
    } else {
        return { success: true, result: "updated successfully" }
    }
}