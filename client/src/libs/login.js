import axios from 'axios';
export default function login (email, password, stay) {
    axios.post('/login', {
        email: email,
        password: password,
        stay: stay
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}