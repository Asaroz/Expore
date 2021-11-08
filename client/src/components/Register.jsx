import { useState } from 'react';
import register from '../libs/register.js';

export default function Register(props) {
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ message, setMessage ] = useState("");
    const setUserName = props.setUserName;
    const setToken = props.setToken;

    function submitHandler(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage("Passwords must match");
        } else {
            setMessage("");
            register(email, name, password, setUserName, setToken, setMessage);
        }
    };

    return <div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" placeholder="type your email..." required maxLength={60}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" id="name" placeholder="type your name..." required minLength={3} maxLength={30}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" id="password" required minLength={6} 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm your Password:</label>
                <input 
                    type="password" id="passwordConfirm" required minLength={6} 
                    onChange={e => setPasswordConfirm(e.target.value)}
                />
            </div>
            <button type="submit">
                Register
            </button>
            <div>{`${message}`}</div>
        </form>
    
    </div>
}