import deleteItemCheck from '../libs/deleteItemCheck.js';
import Confirm from 'react-confirm-bootstrap';

export default function UniverseCard (props) {
    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    async function deleteItemHandler (id) {
        const deleteCheck = await deleteItemCheck(id, universes, setUniverses);
        if (deleteCheck.pass) {
            const index = universes.map(universe => universe._id).indexOf(id);
            console.log('uniOld', universes.length);
            universes.splice(index, 1);
            console.log('uniNew', universes.length);
            
            // Cloning by value and not by reference (same pointer)
            setUniverses([...universes]);
 
            alert (deleteCheck.message);
        } else {
            // logic to move or delete
        }
    }

    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            {title}
            <Confirm
                onConfirm={() => deleteItemHandler(id)}
                body="This action cannot be undone."
                confirmText="Delete Universe"
                title="Are you sure you want to delete this?">
                <button>X</button>
            </Confirm>
        </h3>
        <p>{description}</p>
    </li>
}