import deleteItem from '../libs/deleteItem.js';

export default function UniverseCard (props) {
    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            {title}
            <button onClick={deleteItem(id, universes, setUniverses)}>X</button>
        </h3>
        <p>{description}</p>
    </li>
}