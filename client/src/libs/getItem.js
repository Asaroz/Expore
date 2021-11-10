import axios from "axios";

export default function getItem (token, isRoot) {
    let universes;

    axios.get('/register', 
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            response.data = universes;
        })
        .catch(error => console.log());
    if
    return universes;
}