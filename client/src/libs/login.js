import axios from 'axios';

export default function login (email, password, stay, setUser) {
    axios.post('/login', {
        email: email,
        password: password,
        stay: stay
    })
        .then(response => {
            console.log(response);
            setUser(response.body.user);
        })
        .catch(error => {
            console.log(error);
        });
}