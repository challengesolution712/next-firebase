import emailTemplate from '../sendgrid/emailTemplate';
// import sendgrid from '../sendgrid/sendgrid';
import { db, addDoc, collection, doc, getDocs, where, query, collectionGroup } from './firebase'


const signup = (data) => {

    const text = `Please click the link below or copy and paste the url in your browser to confirm your email \n ${url}/confirm-email/${token}`
    const subject = 'Confirm your subscription'

    return new Promise(async (resolve, reject) => {

        const dbInstance = collection(db, 'users')
        const email = query(collection(db, 'users'), where('email', '==', data.email))
        getDocs(email).then(querySnapshot => {
            if (querySnapshot.empty) {
                //add the Document
                addDoc(dbInstance, data)
                    .then(() => {

                        // sendGrid({to: data.email, subject, text, html: emailTemplate(`${url}/confirm-email/${token}`)}).then(success => {
                        // })

                        if (success) resolve({ success: true })
                    })

            } else {
                reject({ msg: "This email is already exist" })
            }
        })


    })
};

export default signup;

