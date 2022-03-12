import { auth, db, setDoc, collection } from './firebase'
import { doc } from '@firebase/firestore'
import TokenGenerator from "uuid-token-generator"

const signup = async (data) => {
    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62)
    const gnToken = tokgen.generate()

    const { email, password, role, conirmed, token } = data
    const user = doc(db, `users/${gnToken}`);
    try {
        //add the Document
        await setDoc(user, {
            email, password, role, conirmed, token
        });
    } catch (error) {
        console.log(error)
    }

};

export default signup;


