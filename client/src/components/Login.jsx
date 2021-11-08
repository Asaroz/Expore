import { useState } from 'react';
import login from '../libs/login.js';

export default function Login(props){
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ stay, setStay ] = useState(false);
    const [ message, setMessage ] = useState("");
    const setUserEmail = props.setUserEmail;
    const setToken = props.setToken;

    // axios request should contain the login data from the form{ email/username: "test",password:"test",stayLogedIn:true/false} and setUser if login/register is succesfull
    return <div>
        <form>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" placeholder="type your email..." required maxLength={60}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" id="password" required minLength={6} onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="stay">Stay logged-in:</label>
                <input type="checkbox" id="stay" onChange={e => setStay(e.target.checked)}/>
            </div>
            <button onClick={e => {
                e.preventDefault();
                login(email, password, stay, setUserEmail, setMessage, setToken);
            }}>
                Login
            </button>
            <div>{`${message}`}</div>
        </form>
    
    </div>
}