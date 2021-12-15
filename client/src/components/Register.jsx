import { useContext, useEffect, useState } from 'react';
import register from '../libs/register.js';
import avaPoultryOne from '../img/avaPoultryOne.jpg';
import avaDogOne from '../img/avaDogOne.jpg';
import avaDogTwo from '../img/avaDogTwo.jpg';
import avaFaceOne from '../img/avaFaceOne.jpg';
import avaFaceTwo from '../img/avaFaceTwo.jpg';
import avaCat from '../img/avaCat.jpg';
import avaLion from '../img/avaLion.jpg';
import avaOwl from '../img/avaOwl.jpg';
import avaYoda from '../img/avaYoda.jpg';
import UserContext from '../contexts/UserContext';
import '../scss/Register.scss';

export default function Register(props) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [imageIndex, setImageIndex] = useState("");

    const setUser = useContext(UserContext)[1];

    function submitHandler(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage("Passwords must match");
        } else if (!imageIndex) {
            setMessage("Must select an avatar");
        } else {
            setMessage("");
            register(email, name, imageIndex, password, setUser, setMessage);
        }
    };

    // Scroll down when message is set:
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [message]);

    return <div>
        <form onSubmit={submitHandler}>
            <div className="registerContainer">
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
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text" id="name" placeholder="type your name..." required minLength={3} maxLength={30}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>
            <p>Please select your avatar:</p>
            <div className="avatarContainer">
                <div>
                    <input
                        type="radio" name="action" id="avaPoultryOne" value={0}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaPoultryOne"><img className="avatar" src={avaPoultryOne} alt="avatar" /></label>
                </div>
                <div>                
                    <input
                    type="radio" name="action" id="avaDogOne" value={1}
                    onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaDogOne"><img className="avatar" src={avaDogOne} alt="avatar" /></label></div>
                <div>
                    <input
                        type="radio" name="action" id="avaDogTwo" value={2}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaDogTwo"><img className="avatar" src={avaDogTwo} alt="avatar" /></label>
                </div>
                <div>
                    <input
                        type="radio" name="action" id="avaFaceOne" value={3}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaFaceOne"><img className="avatar" src={avaFaceOne} alt="avatar" /></label>
                </div>
                <div>
                    <input
                        type="radio" name="action" id="avaFaceTwo" value={4}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaFaceTwo"><img className="avatar" src={avaFaceTwo} alt="avatar" /></label>
                </div>
                <div>
                    <input
                        type="radio" name="action" id="avaCat" value={5}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaCat"><img className="avatar" src={avaCat} alt="avatar" /></label>
                </div>
                <div>
                    <input
                        type="radio" name="action" id="avaLion" value={6}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaLion"><img className="avatar" src={avaLion} alt="avatar" /></label>
                </div>
                <div>
                    <input
                        type="radio" name="action" id="avaOwl" value={7}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaOwl"><img className="avatar" src={avaOwl} alt="avatar" /></label>
                </div>
                <div>

                    <input
                        type="radio" name="action" id="avaYoda" value={8}
                        onChange={e => setImageIndex(e.target.value)}
                    />
                    <label htmlFor="avaYoda"><img className="avatar" src={avaYoda} alt="avatar" /></label>
                </div>

            </div>
            <button type="submit" className="regSubmit">
                Register
            </button>
            <div className="warning">{`${message}`}</div>
        </form>
    </div>
}