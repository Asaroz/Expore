import axios from 'axios';

export default function login (email, password, stay, setUserEmail, setMessage, setToken) {
    axios.post('/login', {
        email: email,
        password: password,
        stay: stay
    })
        .then(response => {
            console.log('Message:', response);
            setUserEmail(response.data.email);
            setMessage("");
            setToken(response.data.token);
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