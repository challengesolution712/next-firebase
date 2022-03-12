import { auth, db, setDoc, addDoc, collection } from './firebase'
const signup = async (data) => {

    return new Promise( (resolve, reject) => {

        const { email, password, role, confirmed, token } = data
        const dbInstance = collection(db, 'users')
        const userData = JSON.stringify(data)
        //add the Document
        addDoc(dbInstance, data)
        .then(data => {
            resolve({ success: true })
        })
    })
};

export default signup;