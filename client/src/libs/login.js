import axios from 'axios';

export default function login (email, password, stay, setUser,  setMessage) {
    axios.post('/login', {
        email: email,
        password: password,
        stay: stay
    })
        .then(response => {
            localStorage.setItem('authToken', response.data.token);
            setUser({ 
                userEmail: response.data.email,
                userName: response.data.userName,
                imageIndex: response.data.imageIndex
            });
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