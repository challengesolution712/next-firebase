import { db, addDoc, collection, } from '../../../Firebase/firebase'

export default (req, res) => {

    const dbInstance = collection(db, 'posts')
    const data = {
        ...req.body.data,
        postedAt: Date.now()
    }

    addDoc(dbInstance, data)
    .then(() => {
        res.json({ success: true })
    })
}