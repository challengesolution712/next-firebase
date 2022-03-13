import mail from '@sendgrid/mail'

export default ({ to, subject, text, html }) => {
    
    mail.setApiKey("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")
    // mail.setApiKey(process.env.SENDGRID_API_KEY)
    
    return new Promise((resolve, reject) => {

        mail.send({
        from: 'sidicoder@gmail.com',
        to,
        subject,
        text,
        html,
        }).then(() => {
            resolve({success: true})
        }).catch(err => {
            console.log(err)
        })

    })
}