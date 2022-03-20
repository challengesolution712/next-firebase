import { db, doc, deleteDoc } from '../../../Firebase/firebase'

export default (req, res) => {

    const { id } = req.body

    const docRef = doc(db, "posts", id)
    deleteDoc(docRef).then(() => {
        res.json({ success: true })
    })
}