import axios from "axios";

export default async function deleteItemCheck(params) {
    let result = {};
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },   
        params
    };
    
    await axios.get('/getDescendants', request)
        .then(async response => {
            if (response.data.children.length === 0) {
                await axios.delete('/deleteItems', request)
                    .then(response => {
                        if ( response.status === 200 ) {
                            result = { pass: true, message: response.data.message };
                            return;
                        }
                    })
                    .catch(error => result = { pass: false, message: error} );
            } else {
                result = { pass: "continue", message: {
                        childrenLength: response.data.children.length,
                        descendants: response.data.descendants,
                        validParents: response.data.validParents,
                        ...params
                    }
                };
                return;
            }
        })
        .catch(error => result = { pass: false, message: error});
    return result;
}