import axios from 'axios';
import login from './login.js';

export default function register (email, name, imageIndex, password, setUser, setToken, setMessage) {
    axios.post('/register', {
        email: email,
        username: name,
        imageIndex: imageIndex,
        password: password
    })
        .then(response => {
            if (response.data.status === 201) {
                // login if user is successfully created
                login(email, password, false, setUser, setToken, setMessage);
            }
        })
        .catch(error => {
            console.log('Error:', error);
            if (error.response) {
                if (error.response.data) {
                    setMessage(error.response.data.message);
                }
            }
        });
}