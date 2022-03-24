import { db, collection, getDocs, where, query } from '../../../Firebase/firebase'

export default (req, res) => {
    const { country, city, aid } = req.query

    const posts = query(collection(db, 'posts'),
        where('country', 'in', [country || '']),
        where('city', 'in', [city || '']),
        where('aid', 'in', [aid || '']),
    )

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