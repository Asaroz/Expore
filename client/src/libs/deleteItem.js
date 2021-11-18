import axios from "axios";

export default function deleteItemCheck(id, universes, setUniverses) {
    const token = localStorage.getItem('authToken');
    
    axios.get('/hasChildren',
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    },
    {
        _id: id
    })
        .then(response => { 
            if (response.data.children === 0) {
                axios.delete('/deleteItem',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                },
                {
                    _id: id
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
            } else {
                const message = `This item has ${response.data.children} children`;
                return message;
            }
        })
        .catch(error => console.log(error));
}