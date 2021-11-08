export default function Menu (props) {
    const userEmail = props.userEmail;

    console.log(userEmail);

    return <h1>Welcome {userEmail}</h1>;
}