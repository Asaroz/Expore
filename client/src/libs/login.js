import axios from 'axios';

export default function login (email, password, stay, setUser, setToken, setMessage) {
    axios.post('/login', {
        email: email,
        password: password,
        stay: stay
    })
        .then(response => {
            console.log('Message:', response);
            setUser({ 
                userEmail: response.data.email,
                userName: response.data.userName,
                userImage: response.data.imageName
            });
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