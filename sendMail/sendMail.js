import mail from '@sendgrid/mail'

export default ({ to, subject, text, html }) => {
    
    mail.setApiKey("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")
    
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