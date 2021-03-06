import zero from '../img/avaPoultryOne.jpg'; import one from '../img/avaDogOne.jpg';
import two from '../img/avaDogTwo.jpg'; import three from '../img/avaFaceOne.jpg';
import four from '../img/avaFaceTwo.jpg'; import five from '../img/avaCat.jpg';
import six from '../img/avaLion.jpg'; import seven from '../img/avaOwl.jpg';
import eight from '../img/avaYoda.jpg';
import { useEffect, useState } from 'react';
import getItems from '../libs/getItems.js';
import CreatePage from './CreatePage';
import UniverseCard from './UniverseCard';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import '../scss/UserMenu.scss';
import AvatarDropdown from './AvatarDropdown';

export default function UserMenu (props) {
    const [ universes, setUniverses] = useState(false);
    console.log('Universes:', universes);
    // This state controls the modal "CreatePage":
    const [ showCreatePage, setShowCreatePage] = useState(false);
    const [ showDropdown, setShowDropdown ] = useState(false);
    
    const [ user, setUser ] = useContext(UserContext);

    const images = [zero, one, two, three, four, five, six, seven, eight];

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getItems({ isRoot: true });
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

    return <div className="universePageContainer">
        <header>
            <div>
                <img 
                    className="userPageAvatar" src={images[user.imageIndex]} 
                    alt="avatar" onClick={() => setShowDropdown(true)}
                />
                {showDropdown ? 
                    <AvatarDropdown show={showDropdown} setShow={setShowDropdown}/>
                : null}
            </div>
            <h1>Welcome {user.userName}</h1>
        </header>
        {universes ? <>
            <div className="universesContainer">
            {universes.length ? <h2>My universes</h2> : null}
            {showCreatePage ?
                <CreatePage 
                    setShow={setShowCreatePage}
                    show={showCreatePage}
                    isRoot={true}
                    items={universes}
                    setItems={setUniverses}
                /> :
                <button className="universePageButton" onClick={() => setShowCreatePage(true)}>
                    New universe
                </button>
            }
            </div>
            {/* check if length is not 0 */}
            {universes.length ? 
                    universes.map(universe => <UniverseCard key={universe._id}
                        universe={universe} universes={universes} setUniverses={setUniverses}
                    />)
                 :
            /* If request goes through and it's an empty array */
            <p>You don't have any universes</p>}
            </> : <div>Loading universes...</div>
        }
    </div>;
}