import { db, onSnapshot, doc, updateDoc } from '../../../Firebase/firebase'

export default async function handler(req, res) {
    const { data } = req.body
    const { id } = req.query
    
    if (req.method == 'GET') {
            
        const docRef = doc(db, "posts", id)
        onSnapshot(docRef, post => {
            if (!post.exists()) res.json({ empty: true })
            else {
                res.json({ empty: false, post: post.data() })
            }
        })
    } else {

        const postDoc = doc(db, "posts", id)
        await updateDoc(postDoc, {
            ...data
        })
        await res.json({ updated: true, msg: "Your post updated successfuly" })
        
    }
}