import zero from '../img/avaPoultryOne.jpg';
import one from '../img/avaDogOne.jpg';
import two from '../img/avaDogTwo.jpg';
import three from '../img/avaFaceOne.jpg';
import four from '../img/avaFaceTwo.jpg';
import five from '../img/avaCat.jpg';
import six from '../img/avaLion.jpg';
import seven from '../img/avaOwl.jpg';
import eight from '../img/avaYoda.jpg';

export default function UserMenu (props) {
    
    const setToken = props.setToken;
    const user = props.user;
    const setUser = props.setUser;

    const images = [zero, one, two, three, four, five, six, seven, eight];

    return <>
        <header>
            <div><img className="avatar" src={images[user.imageIndex]} alt="avatar"/></div>
            <h1>Welcome {user.userName}</h1>
        </header>
        <button onClick={() => {
            setToken(null);
            setUser(null);
        }}>Logout</button>
    </>;
}