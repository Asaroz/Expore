import zero from '../img/avaPoultryOne.jpg';
import one from '../img/avaDogOne.jpg';
import two from '../img/avaDogTwo.jpg';
import three from '../img/avaFaceOne.jpg';
import four from '../img/avaFaceTwo.jpg';
import five from '../img/avaCat.jpg';
import six from '../img/avaLion.jpg';
import seven from '../img/avaOwl.jpg';
import eight from '../img/avaYoda.jpg';
import { useEffect, useState } from 'react';
import getItem from '../libs/getItem.js';
import CreatePage from './CreatePage';
import UniverseCard from './UniverseCard';

export default function UserMenu (props) {
    const [showCreatePage, setShowCreatePage] = useState(false);
    const [universes, setUniverses] = useState(false);
    
    const user = props.user;
    const setUser = props.setUser;

    const images = [zero, one, two, three, four, five, six, seven, eight];

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getItem(true);
            console.log('rootRequest', rootRequest)
            if (rootRequest.success) {
                setUniverses(rootRequest.result);
            } else if (rootRequest.result === 401 ){
                // token is unauthorized
                localStorage.clear();
                setUser(null);
            } else {
                console.log(rootRequest.result);
            }
        };
        fetchData();
    }, [setUser]);

    return <>
        <header>
            <div><img className="avatar" src={images[user.imageIndex]} alt="avatar"/></div>
            <h1>Welcome {user.userName}</h1>
        </header>
        {showCreatePage ?
			<CreatePage 
				setShow={setShowCreatePage}
				show={showCreatePage}
                isRoot={true}
                setUniverses={setUniverses}
			/> :
			<button onClick={() => setShowCreatePage(true)}>
                New universe
            </button>
		}
        {universes ?
            universes.map(universe => <UniverseCard universe={universe} />) :
            <p>You haven't made any universes yet</p>
        }
        <button onClick={() => {
            localStorage.clear();
            setUser(null);
        }}>Logout</button>
    </>;
}