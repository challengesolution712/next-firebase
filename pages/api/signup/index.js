import emailTemplate from '../../../sendgrid/emailTemplate';
import sendgrid from '../../../sendgrid/sendgrid';
import { db, addDoc, collection, getDocs, where, query } from '../../../Firebase/firebase'


export default function handler(req, res) {

    const { data, url } = req.body  

    const text = `Please click the link below or copy and paste the url in your browser to confirm your email \n ${url}/confirmation/${data.token}`
    const subject = 'Confirm your email'

    const dbInstance = collection(db, 'users')
    const email = query(collection(db, 'users'), where('email', '==', data.email))

    getDocs(email).then(querySnapshot => {
        if (querySnapshot.empty) {
            //add the Document
            addDoc(dbInstance, data)
            .then(() => {

                sendgrid({to: data.email, subject, text, html: emailTemplate(`${url}/confirmation/${data.token}`)}).then(success => {
                    if (success) res.json({success: true, msg: "Please check out your email for confirmation"})
                })

            })

        } else res.json({success: false, msg: "This email is already exist"})
    })
}