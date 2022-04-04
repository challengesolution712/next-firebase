import { db, collection, getDocs, query, orderBy } from '../../../Firebase/firebase'

export default (req, res) => {

    const { locale } = req.body

    const descAsc = locale == 'ar' ? 'asc' : 'desc'

    const dbRef = query(collection(db, "posts"), orderBy('locale', descAsc))

    getDocs(dbRef).then(querySnapshot => {
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