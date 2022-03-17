import mail from '@sendgrid/mail'

export default ({ to, subject, text, html }) => {
    
    mail.setApiKey(SENDGRID_API_KEY)
    
    return new Promise((resolve, reject) => {

        mail.send({
        from: 'sidicoder@gmail.com',
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