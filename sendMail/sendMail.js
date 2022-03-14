// import mail from '@sendgrid/mail'
import mailgun from 'mailgun-js'

const newMailgun = mailgun({
  apiKey: 'd11c483b86ab3a0d7c749cf984e1e8f9-1b237f8b-bf657cfe',
  domain: "https://api.mailgun.net/v3/sandbox7db7a2f660d14c0eaf495d05aecb68ae.mailgun.org"
})

// export default ({ to, subject, text, html }) => {
    
//     mail.setApiKey("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")
//     // mail.setApiKey(process.env.SENDGRID_API_KEY)
    
//     return new Promise((resolve, reject) => {

//         mail.send({
//         from: 'challengesolution712@gmail.com',
//         to,
//         subject,
//         text,
//         html,
//         }).then((e) => {
//             resolve({success: true})
//         }).catch(err => {
//             console.log(err)
//         })

//     })
// }

export default ({ to, subject, text, html }) => {
    
    // mail.setApiKey(process.env.SENDGRID_API_KEY)

    return new Promise((resolve, reject) => {

        const data = {
            from: "shebabalmoustaqbal@gmail.com",
            to,
            subject,
            text,
            html
          };
           
          newMailgun.messages().send(data, (error, body) => {
            console.log(body);
            if(error) console.log(error)
            else console.log(body);
          });

    })
}