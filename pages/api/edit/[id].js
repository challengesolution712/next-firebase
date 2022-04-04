import { db, doc, updateDoc, getDoc } from '../../../Firebase/firebase'

export default async function handler(req, res) {
    const { data } = req.body
    const { id, post } = req.query
    
    if (req.method == 'GET') {
            
        const snap = await getDoc(doc(db, 'posts', post))
        
        if (snap.exists() && snap.data().authorId == id) {

            res.json({ empty: false, post: snap.data() })
            
        } else res.json({ empty: true })

    } else {

        const docRef = doc(db, "posts", post)
        updateDoc(docRef, {
            ...data
        }).then(() => {
            res.json({ updated: true, msg: {
                ar: "تم تحديث المنشور بنجاح",
                en: "Your post updated successfuly"
            } })
        })
        
        
    }
}