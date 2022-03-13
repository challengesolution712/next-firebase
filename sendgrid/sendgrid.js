import mail from '@sendgrid/mail'

export default ({ to, subject, text, html }) => {
    
    mail.setApiKey("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")
    // mail.setApiKey(process.env.SENDGRID_API_KEY)
    
    return new Promise((resolve, reject) => {

        mail.send({
        from: 'challengesolution712@gmail.com',
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