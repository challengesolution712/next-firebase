import { db, collection, getDocs } from '../../../Firebase/firebase'

export default (req, res) => {

    getDocs(collection(db, "posts")).then(querySnapshot => {
        if (querySnapshot.empty) res.json({ posts: [] })
        else {
            
            const posts = []
            querySnapshot.forEach(docs => {
                posts.push({
                    id: docs.id,
                    ...docs.data()
                })
            })
            res.json({ posts })
        }
    })
}