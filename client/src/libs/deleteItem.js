import axios from "axios";

export default function deleteItem(id, universes, setUniverses) {
    const token = localStorage.getItem('authToken');
    
    axios.delete('/deleteItem', {
        id: _id
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
}