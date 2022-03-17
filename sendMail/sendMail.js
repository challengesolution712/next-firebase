import mail from '@sendgrid/mail'

mail.setApiKey(SENDGRID_API_KEY)

export default ({ to, subject, text, html }) => {
    
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