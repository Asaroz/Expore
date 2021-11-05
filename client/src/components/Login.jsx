import { useState } from 'react';
import login from '../libs/login.js';

export default function Login(props){
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ stay, setStay ] = useState(false);
    const setUser = props.setUser;

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
                login(email, password, stay, setUser);
            }}>
                Login
            </button>
        </form>
    
    </div>
}