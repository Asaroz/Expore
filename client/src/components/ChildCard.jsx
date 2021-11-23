export default function ChildCard (props) {
    const title = props.child.title;
    const description = props.child.description;
    const id = props.child._id;
    
    return <li key={Math.floor(Math.random() * 10000)} data={id}>
        <h4>{title}</h4>
        <p>{description}</p>
    </li>
}