import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export default login;