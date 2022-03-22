import { db, doc, getDoc } from '../../../Firebase/firebase'

export default async function handler(req, res) {

    const { id } = req.query
    
    const snap = await getDoc(doc(db, 'posts', id))
    
    if (snap.exists()) res.json({ empty: false, post: snap.data() })
    else res.json({ empty: true,  post: null})

}