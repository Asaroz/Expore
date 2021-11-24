import axios from 'axios';

export default async function createItem (title, description, isRoot, parentId, universeId, imgPath, referenceId) {
    let errorMessage;
    let item;
    const token = localStorage.getItem('authToken');

    await axios.post('/createItem', {
        title: title,
        description: description,
        isRoot: isRoot,
        parentId: parentId,
        universeId: universeId
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status !== 201 ) {
                errorMessage = response.message;
            }
            item = response.data._id;
            alert("Created successfully");
        })
        .catch(error => {
            errorMessage = error;
        });
    if (errorMessage) {
        return { success: false, result: errorMessage }
    } else {
        return { success: true, id: item }
    }
}