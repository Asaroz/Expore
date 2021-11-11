export default function UniverseCard (props) {
    const title = props.universe.title;
    const description = props.universe.description;
    const id = props.universe._id;

    return <li key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
    </li>
}