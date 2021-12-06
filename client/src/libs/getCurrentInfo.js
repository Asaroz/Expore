import axios from "axios";

export default async function getItems (params) {
    let currentItem;
    let errorMessage;
    const extraInfo = {};
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    await axios.get('/getItem', { headers: headers, params: params })
        .then(response => {
            currentItem = response.data.items[0];
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
    if (!currentItem) {
        return { success: false, result: errorMessage }
    }
    if (currentItem.parentId) {
        // get parent parentId and name:
        await axios.get('/getItem', { headers: headers, params: { _id: currentItem.parentId }})
            .then(response => {
                extraInfo.parent = response.data.items[0];
            })
            .catch(error => {
                if (error.response) { // If token is unauthorized
                    if (error.response.status === 401) {
                        errorMessage = 401;
                        return;
                    }
                }
                errorMessage = error;
            });
        // get Array with siblings names and ids:
        await axios.get('/getItem', { 
            headers: headers, 
            params: { parentId: extraInfo.parent._id }
        })
            .then(response => {
                extraInfo.siblings = response.data.items;
            })
            .catch(error => {
                if (error.response) { // If token is unauthorized
                    if (error.response.status === 401) {
                        errorMessage = 401;
                        return;
                    }
                }
                errorMessage = error;
            });
        // if parent is not Root => get universe name: 
        if (!extraInfo.parent.isRoot) {
            await axios.get('/getItem', { headers: headers, params: { _id: currentItem.universeId}})
            .then(response => {
                extraInfo.universe = response.data.items[0];
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
        }
    }
    // get Children names and ids:
    await axios.get('/getItem', { headers: headers, params: { parentId: currentItem._id }})
        .then(response => {
            extraInfo.children = response.data.items;
        })
        .catch(error => {
            if (error.response) { // If token is unauthorized
                if (error.response.status === 401) {
                    errorMessage = 401;
                    return;
                }
            }
            errorMessage = error;
        });
    // remove current item from siblings array:
    if (extraInfo.siblings) {
        const index = extraInfo.siblings.map(item => item._id).indexOf(currentItem._id);
        extraInfo.siblings.splice(index, 1);
    }
    return { success: true, result: currentItem, extraInfo: extraInfo }
}