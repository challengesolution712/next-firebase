import { db, collection, getDocs, where, query } from '../../../Firebase/firebase'

export default (req, res) => {
    const { email, password } = req.body

    const q = query(collection(db, 'users'), where('email', '==', email))
    getDocs(q).then(querySnapshot => {
        if (querySnapshot.empty) res.json({ empty: true, msg: "This account is not exist! Please make sure this account is correct" })
        else {
            const user = querySnapshot.docs[0].data()
            if (user.password == password) {
                if (user.confirmed) res.json({ empty: false, user, id: querySnapshot.docs[0].id })
                else res.json({ empty: true, msg: "Please confirm your email to be able to login" })
            }
            else res.json({ empty: true, msg: "Your password is incorrect please try again" })
        }
    })
}