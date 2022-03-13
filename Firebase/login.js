import { db, addDoc, collection, doc, getDocs, where, query, collectionGroup } from './firebase'
import { setUserCookie } from '../auth/cookies'

const login = async (data) => {

    return new Promise(async (resolve, reject) => {

        const dbInstance = collection(db, 'users')
        const email = query(collection(db, 'users'), where('email', '==', data.email))
        const querySnapshot = await getDocs(email);
        let response = {}
        querySnapshot.forEach((doc) => {
            response = { ...doc.data() };
            if (data.email === response.email && data.password === response.password) {
                response.confirmed = true;
            }
        });
        if (response.confirmed) {
            setUserCookie(response)
            resolve(response)
        } else {
            reject(response)
        }
    })
};

export default login;
