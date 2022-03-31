import { db, collection, getDocs, query, where } from '../../../Firebase/firebase'
import sendMail from '../../../sendMail/sendMail'

export default (req, res) => {
    const { email, url, locale } = req.body

    const q = query(collection(db, 'users'), where('email', '==', email))
    
    getDocs(q).then(querySnapshot => {
        if (querySnapshot.empty) res.json({success: false, msg: {
            ar: "لا يوجد حساب بهذا البريد اﻹلكتروني",
            en: "This account does not exist"
        }})

        else {
            const text = locale == 'ar' ? 
            `مرحبا, \n رجاء إضغط على على الرابط في اﻷسفل أو قم بنسخه ولصقه في المتصفح لتغيير كلم السر \n ${url}/${locale}/reset/${querySnapshot.docs[0].data().token}/?id=${querySnapshot.docs[0].id} \n إذا لم تطلب تغيير كلمة السر يمكنك تجاهل هذا الايميل.` 
            :
            `Hello, \n Please click the link below or copy and paste the url in your browser to reset your password \n ${url}/${locale}/reset/${querySnapshot.docs[0].data().token}/?id=${querySnapshot.docs[0].id} \n If you didn’t ask to reset your password, you can ignore this email.`
            
            sendMail({
                to: email,
                subject: "Reset password",
                text
            }).then(() => {
                res.json({success: true, msg: {
                    ar: "رجاء تحقق من بريدك الالكتروني لتغيير كلمة السر",
                    en: "Please check your email to reset your password"
                }})
            })
        }
    })
}