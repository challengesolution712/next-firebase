import { db, collection, getDocs, query, where } from '../../../Firebase/firebase'
import sendMail from '../../../sendMail/sendMail'

export default (req, res) => {
    const { email, url } = req.body

    const q = query(collection(db, 'users'), where('email', '==', email))
    
    getDocs(q).then(querySnapshot => {
        if (querySnapshot.empty) res.json({success: false, msg: "This account does not exist"})
        else {

            const text = `Hello, \n Please click the link below or copy and paste the url in your browser to reset your password \n ${url}/reset/${querySnapshot.docs[0].data().token}/?id=${querySnapshot.docs[0].id} \n If you didn’t ask to reset your password, you can ignore this email.
            `
            
            sendMail({
                to: email,
                subject: "Reset password",
                text
            }).then(() => {
                res.json({success: true, msg: "Please check your email to reset your password"})
            })
        }
    })
}