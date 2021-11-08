export default function Menu (props) {
    const userName = props.userName;
    const setUserName = props.setUserName;
    const setToken = props.setToken;

    return <>
        <h1>Welcome {userName}</h1>
        <button onClick={() => {
            setToken(null);
            setUserName(null);
        }}>Logout</button>
    </>;
}