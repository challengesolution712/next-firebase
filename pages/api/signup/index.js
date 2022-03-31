import emailTemplate from '../../../sendMail/emailTemplate';
import sendMail from '../../../sendMail/sendMail';
import { db, addDoc, collection, getDocs, where, query } from '../../../Firebase/firebase'


export default function handler(req, res) {

    const { data, url, locale } = req.body

    const text = locale == 'ar' ? 
    `رجاء النقر على الرابط  أدناه أو انسخ وألصق عنوان  url في متصفحك لتأكيد بريدك الإلكتروني  \n ${url}/${locale}/confirmation/${data.token}` :
    `Please click the link below or copy and paste the url in your browser to confirm your email \n ${url}/${locale}/confirmation/${data.token}`
    
    const subject = locale == 'ar' ? 'تأكيد البريد اﻹلكتروني' : 'Confirm your email'

    const dbInstance = collection(db, 'users')
    const email = query(collection(db, 'users'), where('email', '==', data.email))

    getDocs(email).then(querySnapshot => {
        if (querySnapshot.empty) {
            //add the Document
            addDoc(dbInstance, data)
            .then(() => {

                sendMail({to: data.email, subject, text, html: emailTemplate(`${url}/${locale}/confirmation/${data.token}`, locale)}).then(success => {
                    if (success) res.json({success: true, msg: {
                        ar: "رجاء تحقق من بريدك الإلكتروني لتفعيل حسابك",
                        en: "Please check out your email for confirmation"
                    }})
                })

            })

        } else res.json({success: false, msg: {
            ar: "تم استخدام هذا البريد الالكتروني مسبقا",
            en: "This email is already exist"
        }})
    })
}