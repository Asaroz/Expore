import deleteItem from '../libs/deleteItem.js';
import Confirm from 'react-confirm-bootstrap';

export default function UniverseCard (props) {
    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            {title}
            <Confirm
                onConfirm={() => deleteItem(id, universes, setUniverses)}
                body="This action cannot be undone."
                confirmText="Delete Universe"
                title="Are you sure you want to delete this?">
                <button>X</button>
            </Confirm>
        </h3>
        <p>{description}</p>
    </li>
}