import mail from '@sendgrid/mail'
require('dotenv').config();

export default ({ to, subject, text, html }) => {
    
    mail.setApiKey(process.env.API_KEY)
    
    return new Promise((resolve, reject) => {

        mail.send({
        from: process.env.EMAIL,
        to,
        subject,
        text,
        html,
        }).then((e) => {
            resolve({success: true})
        }).catch(err => {
            console.log(err)
        })

    })
}