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
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

export default function UserMenu (props) {
    const [ universes, setUniverses] = useState(false);
    console.log('Universes:', universes);
    // This state controls the modal "CreatePage":
    const [ showCreatePage, setShowCreatePage] = useState(false);
    
    const [ user, setUser ] = useContext(UserContext);

    const images = [zero, one, two, three, four, five, six, seven, eight];

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getItem({ isRoot: true });
            if (rootRequest.success) {
                setUniverses(rootRequest.result);
            } else if (rootRequest.result === 401 ) {
                // token is unauthorized => log out
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
        {universes ? <>
            <div>
            {universes.length ? <h2>My universes</h2> : null}
            {showCreatePage ?
                <CreatePage 
                    setShow={setShowCreatePage}
                    show={showCreatePage}
                    isRoot={true}
                    items={universes}
                    setItems={setUniverses}
                /> :
                <button onClick={() => setShowCreatePage(true)}>
                    New universe
                </button>
            }
            </div>
            {/* check if length is not 0 */}
            {universes.length ? 
                 <ul>
                    {universes.map(universe => <UniverseCard 
                        universe={universe} universes={universes} setUniverses={setUniverses}
                    />)} 
                </ul> :
            /* If request goes through and it's an empty array */
            <p>You don't have any universes</p>}
            </> : <div>Loading universes...</div>
        }
        <button onClick={() => {
            localStorage.clear();
            setUser(null);
        }}>Logout</button>
    </>;
}