import { useState, useContext } from "react";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Confirm from 'react-confirm-bootstrap';
import updateUser from '../libs/updateUser';
import UserContext from "../contexts/UserContext";
import updatePasswordF from '../libs/updatePassword';


export default function UserSettings() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [newUser, setNewUser] = useState(user);
    const [editUserName, setEditUserName] = useState(false);
    const [userName, setUserName] = useState(user.userName);
    const [editUserEmail, setEditUserEmail] = useState(false);
    const setUser = useContext(UserContext)[1];
    const [userEmail, setUserEmail] = useState(user.userEmail);

    const [editPassword, setEditPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("")

    function discardHandler(setInfo, info, setEdit) {
        setInfo(info);
        setEdit(false);
    }

    function updateHandler(updateData, setEdit) {
        const newUser = updateUser(updateData, setUser);
        setNewUser(newUser)
        setEdit(false);
    }

    function updatePassword() {
        if (newPassword !== repeatNewPassword) {
            alert("Passwords dont match");
            return;
        }
        updatePasswordF(oldPassword, newPassword)
        setEditPassword(false)
    }

    function emailValidation(enteredEmail) {
        var mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if (enteredEmail.match(mail_format)) {
            return true;
        } else {
            return false;
        }

    }


    return <div>
        <div>
            <NavLink exact to={{ pathname: '/' }} replace>
                Home
            </NavLink>
        </div>


        <div>
            {editUserEmail ? <>
                <div>
                    <label htmlFor="newEmail">New Email:</label>
                </div>
                <input
                    rows={1} cols={40} id="newEmail" placeholder="Add a new Email"
                    maxLength={50} value={newUser.email} type="email"
                    onChange={e => setUserEmail(e.target.value)}
                />
                <div>
                    <Confirm
                        onConfirm={() => discardHandler(setUserEmail, newUser.userEmail, setEditUserEmail)}
                        confirmText="Discard"
                        title="Discard changes?"
                    >
                        <button>Discard Changes</button>
                    </Confirm>
                    <Confirm
                        onConfirm={() => {
                            if (emailValidation(userEmail)) {
                                updateHandler({ email: userEmail }, setEditUserEmail)
                            } else {
                                alert("invalid email")
                            }
                        }
                        }
                        confirmText="Update"
                        title="Are you sure you want to update your Email?"
                    >
                        <button>Save</button>
                    </Confirm>
                </div>
            </>
                :
                <p>
                    Email: {user.userEmail}
                    <button onClick={() => setEditUserEmail(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </p>
            }

        </div>



        <div>
            {editUserName ? <>
                <div>
                    <label htmlFor="newUserName">New Username:</label>
                </div>
                <textarea
                    rows={1} cols={40} id="newUserName" placeholder="Add a new Username"
                    maxLength={50} value={newUser.username}
                    onChange={e => setUserName(e.target.value)}
                />
                <div>

                    <Confirm
                        onConfirm={() => discardHandler(setUserName, newUser.username, setEditUserName)}
                        confirmText="Discard"
                        title="Discard changes?"
                    >
                        <button>Discard Changes</button>
                    </Confirm>
                    <Confirm
                        onConfirm={() => updateHandler({ username: userName }, setEditUserName)}
                        confirmText="Update"
                        title="Are you sure you want to update your Username?"
                    >
                        <button>Save</button>
                    </Confirm>
                </div>
            </>
                :
                <p>
                    Username: {user.userName}
                    <button onClick={() => setEditUserName(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </p>
            }
        </div>
        <div>
            {editPassword ? <>
                <div>
                    <div>
                        <label htmlFor="oldPassword">Old Password:</label>
                    </div>
                    <input
                        rows={1} cols={40} id="oldPassword" placeholder=""
                        maxLength={50} type="password"
                        onChange={e => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                    </div>
                    <input
                        rows={1} cols={40} id="newPassword" placeholder=""
                        maxLength={50} type="password"
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="repeatNewPassword">Repeat New Password:</label>
                    </div>
                    <input
                        rows={1} cols={40} id="repeatNewPassword" placeholder=""
                        maxLength={50} type="password"
                        onChange={e => setRepeatNewPassword(e.target.value)}
                    />
                </div>
                <Confirm
                    onConfirm={() => discardHandler((x) => null, null, setEditPassword)}
                    confirmText="Discard"
                    title="Discard changes?"
                >
                    <button>Discard Changes</button>
                </Confirm>
                <Confirm
                    onConfirm={() => updatePassword()}
                    confirmText="Update"
                    title="Are you sure you want to update?"
                    body="The existing description will be overwritten"
                >
                    <button>Save</button>
                </Confirm>
            </>
                :
                <p>
                    <button onClick={() => setEditPassword(true)}>
                        Change Password <FontAwesomeIcon icon={faEdit} />
                    </button>
                </p>
            }
        </div>

    </div>
}
