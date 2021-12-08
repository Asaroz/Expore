import axios from "axios";


export default async function UpdateUser(userData, setUser) {
    let errorMessage;
    let newUser;

    const token = localStorage.getItem('authToken');
    await axios.patch('/updateUser', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status !== 200) {
                errorMessage = response.message;
            } else {
                newUser = response.data.newUser;
                setUser({
                    userEmail: newUser.email,
                    userName: newUser.username,
                    imageIndex: newUser.imageIndex
                });
            }

        })
        .catch(error => {
            errorMessage = error;
        })
    if (errorMessage) {
        alert("Error:", errorMessage);
        return {
            success: false,
            result: errorMessage
        }
    } else {
        return {
            success: true,
            result: "updated successfully",
            newUser: newUser
        }
    }
}