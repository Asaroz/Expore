import axios from "axios";

export default async function updatePassword(oldPw,newPw){
    let errorMessage;
    let pwData = {
        oldPw:oldPw,
        newPw:newPw
    }
    const token = localStorage.getItem('authToken');
    await axios.patch('/updatePassword', pwData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status !== 200) {
                errorMessage = response.message;
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
            result: "Password changed successfully"
        }
    }
}