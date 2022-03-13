import { db, collection, getDocs, where, query, updateDoc, doc } from '../../../Firebase/firebase'

export default function handler(req, res) {
    const { token } = req.query

    const q = query(collection(db, 'users'), where('token', '==', token))

    getDocs(q).then(async querySnapshot => {
        if (querySnapshot.empty) res.json({ exist: false })
        else {
            const user = querySnapshot.docs[0]
            const id = user.id
            const userDoc = doc(db, "users", id)
            await updateDoc(userDoc, {
                confirmed: true
            })

            await res.json({ exist: true, id, user })
        }
    })

}