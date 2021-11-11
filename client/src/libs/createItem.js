import axios from 'axios';

export default async function createItem (title, description, isRoot, parentId, imgPath, referenceId) {
    let errorMessage;
    let item;
    const token = localStorage.getItem('authToken');

    await axios.post('/createItem', {
        title: title,
        description: description,
        isRoot: isRoot,
        parentId: parentId
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
            item = response;
            alert("Created successfully");
        })
        .catch(error => {
            errorMessage = error;
        });

    console.log("errorMessage:", errorMessage);
    if (errorMessage) {
        return { success: false, result: errorMessage }
    } else {
        return { success: true, item:  item }
    }
}