import { db, collection, getDocs, where, query } from '../../../Firebase/firebase'

export default function handler(req, res) {
    const { id } = req.query

    if (id) {
        const posts = query(collection(db, 'posts'), where('authorId', '==', id))

        getDocs(posts).then(querySnapshot => {
            if (querySnapshot.empty) res.json({ empty: true }) 
            else {
                const data = []
                querySnapshot.docs.forEach(items => {
                    data.push({
                        ...items.data(),
                        id: items.id
                    })
                })
                res.json({ empty: false, posts: data })
            }
        })
    }
}