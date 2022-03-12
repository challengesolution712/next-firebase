import {sendPasswordResetEmail} from 'firebase/auth'
import { auth } from './firebase'

const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export default resetPassword