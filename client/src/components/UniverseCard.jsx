export default function UniverseCard (props) {
    const title = props.universe.title;
    const description = props.universe.description;

    return <li key={Math.floor(Math.random() * 100000)}>
        <h3>{title}</h3>
        <p>{description}</p>
    </li>
}