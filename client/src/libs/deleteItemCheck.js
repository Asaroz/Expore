import axios from "axios";

export default async function deleteItemCheck(id) {
    let result = {};
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },   
        params: {
            _id: id
        }
    };
    
    await axios.get('/hasChildren', request)
        .then(async response => {
            console.log(response.data.children);
            if (response.data.children === 0) {
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
                        children: response.data.children,
                        id: id
                    }
                };
                return;
            }
        })
        .catch(error => result = { pass: false, message: error});
    return result;
}