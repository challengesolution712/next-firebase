import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, addDoc, collection } from './firebase'

const signup = (email, password, role) => {
    return new Promise(async (resolve, reject) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
            role
        });

        resolve({ success: true })


    })
};

export default signup;