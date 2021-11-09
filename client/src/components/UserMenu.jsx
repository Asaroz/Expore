import avaCat from '../img/avaCat.jpg';
import avaDogOne from '../img/avaDogOne.jpg';
import avaDogTwo from '../img/avaDogTwo.jpg';
import avaFaceOne from '../img/avaFaceOne.jpg';
import avaFaceTwo from '../img/avaFaceTwo.jpg';
import avaLion from '../img/avaLion.jpg';
import avaOwl from '../img/avaOwl.jpg';
import avaYoda from '../img/avaYoda.jpg';

export default function UserMenu (props) {
    
    const setToken = props.setToken;
    const user = props.user;
    const setUser = props.setUser;

    const images = [avaCat, avaDogOne, avaDogTwo, avaDogTwo, avaFaceOne, avaFaceTwo, avaLion, avaOwl, avaYoda];
    const randomIndex = Math.floor(Math.random() * images.length);

    return <>
        <header>
            <div><img className="avatar" src={user.imageName || images[randomIndex]} alt="avatar"/></div>
            <h1>Welcome {user.userName}</h1>
        </header>
        <button onClick={() => {
            setToken(null);
            setUser(null);
        }}>Logout</button>
    </>;
}