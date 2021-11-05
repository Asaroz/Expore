import { useState } from 'react';
import login from '../libs/login.js';

export default function Login(props){
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ stay, setStay ] = useState(false);
    const setUser = props.setUser;

    function runLogin (email, password, stay) {
        const response = login(email, password, stay);
        if (!response) {
            alert(`Login failed!`);
        }
        if (!response.success) {
            alert(`Login failed: ${response.message}`);
        } else {
            setUser(response.user);
        }
    }
    // axios request should contain the login data from the form{ email/username: "test",password:"test",stayLogedIn:true/false} and setUser if login/register is succesfull
    return <div>
        <form>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" id="email" placeholder="type your email..." required maxLength={60}
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" id="password" required minLength={6} onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="stay">Stay logged-in:</label>
            <input type="checkbox" id="stay" onChange={e => setStay(e.target.checked)}/>
            <button onClick={e => {
                e.preventDefault();
                runLogin(email, password, stay)
            }}>
                Login
            </button>
        </form>
    
    </div>
}