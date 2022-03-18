import { db, doc, updateDoc, query, getDocs, collection, where } from '../../../Firebase/firebase'

export default async function handler(req, res) {
    const { data } = req.body
    const { id, post } = req.query
    
    if (req.method == 'GET') {
            
        const posts = query(collection(db, 'posts'), where('authorId', '==', id), where('id', '==', post))
        
        getDocs(posts).then(post => {
            if (post.empty) {
                res.json({ empty: true })
            }
            else {
                res.json({ empty: false, post: post.docs[0].data() })
            }
        })

    } else {

        const postDoc = doc(db, "posts", post)
        await updateDoc(postDoc, {
            ...data
        })
        await res.json({ updated: true, msg: "Your post updated successfuly" })
        
    }
}