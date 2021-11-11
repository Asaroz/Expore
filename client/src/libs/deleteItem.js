import axios from "axios";

export default function deleteItem(id, universes, setUniverses) {
    const token = localStorage.getItem('authToken');
    
    axios.delete('/deleteItem', {
        id: id
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}